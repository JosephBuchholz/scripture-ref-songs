import { bibleAPI_URL } from "./urls";

export default class BibleAPI {
    static getVerse(book: number, chapter: number, verse: number): Promise<string> {
        return new Promise((resolve) => {
            fetch(`${bibleAPI_URL}/getverse?b=${book}&c=${chapter}&v=${verse}`).then((response) => {
                response.text().then((text) => {
                    resolve(text);
                });
            });
        });
    }

    static getVerseRange(book: number, chapter: number, verseBegin: number, verseEnd: number): Promise<string> {
        return new Promise((resolve) => {
            fetch(`${bibleAPI_URL}/getverserange?b=${book}&c=${chapter}&v1=${verseBegin}&v2=${verseEnd}&verseNumbers=true`).then(
                (response) => {
                    response.text().then((text) => {
                        resolve(text);
                    });
                }
            );
        });
    }

    static getChapterText(book: number, chapter: number): Promise<string> {
        return new Promise((resolve) => {
            fetch(`${bibleAPI_URL}/getchapter?b=${book}&c=${chapter}&verseNumbers=true&concatenate=true`).then((response) => {
                if (response.ok) {
                    response.text().then((text) => {
                        resolve(text);
                    });
                }
            });
        });
    }

    static getChapter(book: number, chapter: number): Promise<{ verses: Array<string> }> {
        return new Promise((resolve) => {
            fetch(`${bibleAPI_URL}/getchapter?b=${book}&c=${chapter}&verseNumbers=true&concatenate=false`).then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        console.log(json);
                        resolve({ verses: json.verses });
                    });
                }
            });
        });
    }
}
