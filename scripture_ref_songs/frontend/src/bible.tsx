import React from "react";
import BibleAPI from "./backend_apis/bible_api";

class BiblePassage {
    book: number;
    chapter: number;
    verse: Array<number>;
}

export default class Bible {
    static parseBibleText(text: string): React.ReactElement {
        let newText = "";

        let words = text.split(" ");
        for (let word of words) {
            if (word == "Psalm") {
                break;
            }

            newText += word + " ";
        }

        let elements: Array<React.ReactElement> = [];
        let previous = 0;
        let start = -1;
        let i = 0;
        for (let c of newText) {
            if (c == "`") {
                start = i;
            } else if (c == "'" && start != -1) {
                elements.push(<p className="inline">{newText.slice(previous, start)}</p>);
                elements.push(<i className="inline">{newText.slice(start + 1, i)}</i>);

                previous = i + 1;
                start = -1;
            }

            i++;
        }

        if (previous < newText.length) {
            elements.push(<p className="inline">{newText.slice(previous, newText.length)}</p>);
        }

        return <div className="inline-block">{elements}</div>;
    }

    static getBiblePassage(selectedPassage: BiblePassage): Promise<React.ReactElement> {
        console.log("getting a passage");
        return new Promise<React.ReactElement>((resolve, reject) => {
            if (selectedPassage.verse.length === 1) {
                let verse = selectedPassage.verse[0];
                BibleAPI.getVerse(selectedPassage.book, selectedPassage.chapter, verse).then((text) => {
                    resolve(this.parseBibleText(text));
                });
            } else if (selectedPassage.verse.length === 2) {
                let verse1 = selectedPassage.verse[0];
                let verse2 = selectedPassage.verse[1];
                BibleAPI.getVerseRange(selectedPassage.book, selectedPassage.chapter, verse1, verse2).then((text) => {
                    resolve(this.parseBibleText(text));
                });
            }
        });
    }
}
