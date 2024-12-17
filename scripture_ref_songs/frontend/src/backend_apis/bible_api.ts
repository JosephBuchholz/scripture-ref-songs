import { bibleAPI_URL } from "./urls";

export default class BibleAPI {
    static parseBibleText(text: string): string {
        let newText = "";

        let words = text.split(" ");
        for (let word of words) {
            if (word == "Psalm") {
                break;
            }

            newText += word + " ";
        }

        return newText;
    }

    static getVerse(book: number, chapter: number, verse: number): Promise<string> {
        return new Promise((resolve) => {
            fetch(`${bibleAPI_URL}/getverse?b=${book}&c=${chapter}&v=${verse}`).then((response) => {
                response.text().then((text) => {
                    resolve(this.parseBibleText(text));
                });
            });
        });
    }

    static getVerseRange(book: number, chapter: number, verseBegin: number, verseEnd: number): Promise<string> {
        return new Promise((resolve) => {
            fetch(`${bibleAPI_URL}/getverserange?b=${book}&c=${chapter}&v1=${verseBegin}&v2=${verseEnd}`).then((response) => {
                response.text().then((text) => {
                    resolve(this.parseBibleText(text));
                });
            });
        });
    }
}
