import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SongAPI from "../backend_apis/song_api";

/**
 * A page that shows a list of songs.
 */
export default function SongListPage() {
    const [songList, setSongList] = useState({ songs: [] });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/songs/getallsongs`).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    setSongList(json);
                });
            }
        });
    }, []);

    let songElementList = [];
    for (let song of songList.songs) {
        songElementList.push(
            <SongListItem
                title={song.title}
                creators={song.creators}
                onClick={() => {
                    navigate(`/viewsong/${song.id}`);
                }}
            />
        );
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header></Header>

                <div className="flex flex-col m-6">{songElementList}</div>
            </div>
        </>
    );
}

function SongListItem({ title, creators, onClick = () => {} }) {
    let newCreators = SongAPI.parseArtistsList(creators).names;

    // add commas for seperators
    newCreators.forEach((_, index, array) => {
        if (index != newCreators.length - 1) {
            array[index] += ", ";
        }
    });

    return (
        <div className="m-2 p-4 rounded-md cursor-pointer bg-slate-200 hover:bg-blue-200" onClick={onClick}>
            <p className="font-semibold">{title}</p>
            <p className="text-gray-800">{newCreators}</p>
        </div>
    );
}
