import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import LyricLine from "../components/LyricLine";
import ScriptureReference from "../components/ScriptureReference";
import Bible from "../bible";
import SongAPI from "../backend_apis/song_api";

/**
 * Pages that views the lyrics of a song/hymn.
 */
export default function ViewSongPage() {
    const { id } = useParams();

    const [currentRefId, setCurrentRefId] = useState(-1);
    const [selectedLineNumber, setSelectedLineNumber] = useState(-1);
    const [selectedPassage, setSelectedPassage] = useState(null);
    const [bibleText, setBibleText] = useState("");
    const [songData, setSongData] = useState(null);

    const [title, setTitle] = useState(null);
    const [artists, setArtists] = useState(null);

    useEffect(() => {
        fetch(`/songs/getfile?id=${id}`).then((response) => {
            if (response.ok) {
                response.text().then((text) => {
                    setSongData(JSON.parse(text));
                });
            }
        });

        SongAPI.getBasicSongData(id).then((data) => {
            setTitle(data.title);

            let names = data.artists.names;
            setArtists(names.join(", "));
        });
    }, [id]);

    useEffect(() => {
        // get selected Bible passage from backend
        if (selectedPassage !== null) {
            Bible.getBiblePassageWithSelection(selectedPassage).then((passage) => {
                setBibleText(passage);
            });
        }
    }, [selectedPassage]);

    /**
     * The first element is the type:
     *  "l" = line: the second elment will then be the line number
     *  "lr" = line range: the second element will be the line range
     *
     * The second element is a number or range: so for example: 7 or [0, 5]
     *
     * The thrid element (which is optional) is the particular verse(s)
     */

    let linesArray = [];
    let references = [];
    let referencesByLine = [];
    if (songData) {
        linesArray = songData.lyrics;
        references = songData.mainReferences;
        referencesByLine = songData.referencesByLine;
    } else {
        linesArray = ["No Lyrics"];
    }

    let mainReferencesDisplay = [];

    let index = 0;
    for (let ref of references) {
        mainReferencesDisplay.push(
            <ScriptureReference
                onClick={(ref) => {
                    setSelectedPassage(Bible.parseBibleReference(ref));
                }}
                onHover={(event, id) => {
                    if (event === 0) {
                        setCurrentRefId(id);
                    }
                }}
                id={index}
            >
                {ref[0]}
            </ScriptureReference>
        );
        index++;
    }

    let lyricsDisplay = [];

    let spans = [];
    if (currentRefId !== -1) spans = references[currentRefId][1];

    let lineNumber = -1;
    for (let i = 0; i < linesArray.length; i++) {
        const line = linesArray[i];

        if (line !== "" && line !== "Refrain:") {
            lineNumber++;
        } else {
            if (line === "") {
                lyricsDisplay.push(
                    <p>
                        <br />
                    </p>
                );
            } else if (line === "Refrain:") {
                lyricsDisplay.push(<LyricLine nonLyric={true}>{line}</LyricLine>);
            }

            continue;
        }

        let highlight = false;
        for (let span of spans) {
            let type = span[0];
            let sp = span[1];

            if (type === "l" && lineNumber === sp) {
                highlight = true;
            } else if (type === "lr" && lineNumber >= sp[0] && lineNumber <= sp[1]) {
                highlight = true;
            }
        }

        let s = [];
        if (highlight) {
            s.push(0);
        }

        lyricsDisplay.push(
            <LyricLine
                lineNumber={lineNumber}
                isHighlighted={selectedLineNumber == lineNumber}
                spans={s}
                onClick={(lineNum) => {
                    setSelectedLineNumber(lineNum);
                }}
            >
                {line}
            </LyricLine>
        );
    }

    let versesByLine = <></>;
    if (selectedLineNumber !== -1) {
        let otherReferencesDisplay = [];

        let index = 0;
        for (let ref of referencesByLine[selectedLineNumber]) {
            otherReferencesDisplay.push(
                <ScriptureReference
                    onClick={(ref) => {
                        setSelectedPassage(Bible.parseBibleReference(ref));
                    }}
                    onHover={() => {}}
                    id={index}
                >
                    {ref}
                </ScriptureReference>
            );
            index++;
        }

        versesByLine = <>{otherReferencesDisplay}</>;
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header></Header>

                <div className="m-5">
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <h2 className="text-md">{artists}</h2>
                </div>

                <div className="flex-1 flex flex-col items-center overflow-y-hidden">
                    <div className="lg:w-10/12 w-full grid grid-cols-2 mx-5 h-full content-start">
                        <div className="flex flex-wrap pb-5 p-4 border-r-2 content-start">{mainReferencesDisplay}</div>

                        <div className="flex flex-wrap pb-5 p-4 content-start">{versesByLine}</div>

                        <div className="flex flex-col p-4 border-r-2 overflow-y-scroll">{lyricsDisplay}</div>

                        <div className="flex flex-col p-4 overflow-y-scroll">{bibleText}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
