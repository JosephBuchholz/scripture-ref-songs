import Header from "../components/Header";
import { useEffect, useState } from "react";

/**
 * A page that shows a list of songs.
 */
export default function SongListPage() {
    const [songList, setSongList] = useState({ songs: [] });

    useEffect(() => {
        fetch(`/songs/getallsongs`).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    console.log(json);
                    setSongList(json);
                });
            }
        });
    }, []);

    let songElementList = [];
    for (let song of songList.songs) {
        songElementList.push(<div className="bg-gray-100">{song.title}</div>);
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header></Header>

                <div className="flex flex-col">{songElementList}</div>
            </div>
        </>
    );
}
