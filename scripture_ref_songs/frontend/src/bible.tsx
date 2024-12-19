import React from "react";
import BibleAPI from "./backend_apis/bible_api";
import { bookLookup } from "./data";
import ReactHTMLParser from "html-react-parser";

class BibleReference {
    // Note: 1 indexed
    book: number = 1;
    chapter: number = 1;
    verse: Array<Array<number>> = [];
}

export default class Bible {
    static parseBibleReference(reference: string): BibleReference | null {
        let newReference = new BibleReference();
        var regex = /^([A-Za-z]+)\.?\s(\d+):((?:\d+[,-])*\d+)$/;
        var matches = regex.exec(reference);

        if (matches === null || matches.length !== 4) {
            console.error("Not a valid Bible reference.");
            return null;
        }

        newReference.book = bookLookup[matches[1]];
        newReference.chapter = parseInt(matches[2]);

        let verseSection = matches[3];
        let verses = verseSection.split(",");
        for (let verse of verses) {
            let verseRange = verse.split("-");
            newReference.verse.push(verseRange.map((value) => parseInt(value)));
        }

        return newReference;
    }

    static parseBibleText(text: string): React.ReactElement {
        let newText = "";

        let words = text.split(" ");
        for (let word of words) {
            if (word == "Psalm") {
                break;
            }

            newText += word + " ";
        }

        newText = newText.replaceAll("[", '<sup class="font-bold">').replaceAll("]", "</sup>");

        // Add italics:
        let elements: Array<React.ReactElement> = [];
        let previous = 0;
        let start = -1;
        let i = 0;
        for (let c of newText) {
            if (c == "`") {
                start = i;
            } else if (c == "'" && start != -1) {
                elements.push(<p className="inline">{ReactHTMLParser(newText.slice(previous, start))}</p>);
                elements.push(<i className="inline">{ReactHTMLParser(newText.slice(start + 1, i))}</i>);

                previous = i + 1;
                start = -1;
            }

            i++;
        }

        if (previous < newText.length) {
            elements.push(<p className="inline">{ReactHTMLParser(newText.slice(previous, newText.length))}</p>);
        }

        return <>{elements}</>;
    }

    static parseBibleTextWithSelection(verses: Array<string>, selectionStart: number, selectionEnd: number): React.ReactElement {
        let elements: Array<React.ReactElement> = [];

        let i = 1;
        for (let verse of verses) {
            let verseElements = this.parseBibleText(verse);

            if (i >= selectionStart && i <= selectionEnd) {
                elements.push(<div className="bg-blue-200 inline">{verseElements}</div>);
            } else {
                elements = elements.concat(verseElements);
            }

            i++;
        }

        return <div className="inline-block">{elements}</div>;
    }

    static getBiblePassage(selectedPassage: BibleReference): Promise<React.ReactElement> {
        return new Promise<React.ReactElement>((resolve, reject) => {
            for (let verseRange of selectedPassage.verse) {
                if (verseRange.length === 1) {
                    BibleAPI.getVerse(selectedPassage.book, selectedPassage.chapter, verseRange[0]).then((text) => {
                        resolve(<div className="inline-block">{this.parseBibleText(text)}</div>);
                    });
                } else if (verseRange.length === 2) {
                    BibleAPI.getVerseRange(selectedPassage.book, selectedPassage.chapter, verseRange[0], verseRange[1]).then((text) => {
                        resolve(<div className="inline-block">{this.parseBibleText(text)}</div>);
                    });
                }

                break;
            }
        });
    }

    static getBiblePassageWithSelection(selectedPassage: BibleReference): Promise<React.ReactElement> {
        return new Promise<React.ReactElement>((resolve, reject) => {
            for (let verseRange of selectedPassage.verse) {
                if (verseRange.length === 1) {
                    BibleAPI.getChapter(selectedPassage.book, selectedPassage.chapter).then((text) => {
                        resolve(this.parseBibleTextWithSelection(text.verses, verseRange[0], verseRange[0]));
                    });
                } else if (verseRange.length === 2) {
                    BibleAPI.getChapter(selectedPassage.book, selectedPassage.chapter).then((text) => {
                        resolve(this.parseBibleTextWithSelection(text.verses, verseRange[0], verseRange[1]));
                    });
                }

                break;
            }
        });
    }
}
