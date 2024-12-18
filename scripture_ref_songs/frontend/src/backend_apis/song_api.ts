import { songAPI_URL } from "./urls";

export default class SongAPI {
    static parseArtistsList(artists: string): { names: Array<string>; roles: Array<string> } {
        // split by ',' and ':';
        let list = artists.split(/:|,/);

        // Then get only the odd indexes (thus only getting the names and not their roles)
        let names = list.filter((_, index) => {
            return index % 2 != 0; // is odd
        });

        // Similar: get only the even indexes
        let roles = list.filter((_, index) => {
            return index % 2 == 0; // is even
        });

        return { names: names, roles: roles };
    }

    static getBasicSongData(id: number): Promise<{ title: string; artists: { names: Array<string>; roles: Array<string> } }> {
        return new Promise((resolve) => {
            fetch(`${songAPI_URL}/getsong?id=${id}`).then((response) => {
                if (response.ok) {
                    response.text().then((text) => {
                        let data = JSON.parse(text);
                        resolve({ title: data.title, artists: this.parseArtistsList(data.creators) });
                    });
                }
            });
        });
    }
}
