import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { bookLookup } from "../data";

export default function ViewSongPage() {
    const { id } = useParams();

    const [currentRefId, setCurrentRefId] = useState(-1);
    const [selectedLineNumber, setSelectedLineNumber] = useState(-1);
    const [selectedPassage, setSelectedPassage] = useState(null);
    const [bibleText, setBibleText] = useState("");
    const [songData, setSongData] = useState(null);

    useEffect(() => {
        fetch(`/songs/getfile?id=${id}`).then((response) => {
            response.text().then((text) => {
                setSongData(JSON.parse(text));
            });
        });
    }, []);

    // get selected Bible passage from backend
    if (selectedPassage !== null) {
        if (selectedPassage.verse.length === 1) {
            let verse = selectedPassage.verse[0];
            fetch(
                `/bible/getverse?b=${selectedPassage.book}&c=${selectedPassage.chapter}&v=${verse}`
            ).then((response) => {
                response.text().then((text) => {
                    setBibleText(text);
                });
            });
        } else if (selectedPassage.verse.length === 2) {
            let verse1 = selectedPassage.verse[0];
            let verse2 = selectedPassage.verse[1];
            fetch(
                `/bible/getverserange?b=${selectedPassage.book}&c=${selectedPassage.chapter}&v1=${verse1}&v2=${verse2}`
            ).then((response) => {
                response.text().then((text) => {
                    setBibleText(text);
                });
            });
        }
    }

    let linesArray = [];
    if (songData) {
        linesArray = songData.lyrics;
    } else {
        linesArray = ["none"];
    }

    /**
     * The first element is the type:
     *  "l" = line: the second elment will then be the line number
     *  "lr" = line range: the second element will be the line range
     *
     * The second element is a number or range: so for example: 7 or [0, 5]
     *
     * The thrid element (which is optional) is the particular verse(s)
     */

    let references = [
        [
            "Lam. 3:21-24",
            [
                ["l", 0, 23],
                ["lr", [2, 3], 22],
                ["lr", [4, 5], 23],
                ["l", 6],
                ["l", 8, 23],
                ["lr", [9, 12]],
                ["lr", [14, 15], 24],
            ],
        ],
        [
            "Ps. 36:5",
            [
                ["l", 0],
                ["lr", [4, 5]],
                ["l", 8],
                ["l", 12],
            ],
        ],
        [
            "James 1:17",
            [
                ["lr", [1, 3]],
                ["lr", [6, 7]],
                ["l", 16],
            ],
        ],
        ["Ps. 89:5", [["lr", [9, 12]]]],
        ["Ps. 29:11", [["lr", [13, 16]]]],
    ];

    let referencesByLine = [
        [],
        [
            "James 1:17",
            "Mal. 3:6",
            "Ps. 102:27",
            "Num. 23:19",
            "Isa. 41:4",
            "Isa. 48:12",
            "Heb. 13:8",
        ],
        [],
        [],

        ["Lam. 3:23"],
        [],
        ["Lam. 3:22-23"],
        [],
        [],

        ["Ps. 19:1", "Ps. 89:5", "Rom. 1:19-20"],
        [],
        [],
        [],

        [
            "Lam. 3:21,24",
            "Ps. 29:11",
            "Ps. 73:23-26",
            "Acts 3:19-20",
            "Col. 2:13-14",
            "Phil. 4:7",
        ],
        ["Ps. 94:18-19", "Ps. 73:23-26", "Ps. 25:8-10"],
        ["Ps. 29:11"],
        [],
    ];

    let mainReferencesDisplay = [];

    let index = 0;
    for (let ref of references) {
        mainReferencesDisplay.push(
            <ScriptRef
                onClick={(ref) => {
                    let numRef = stringRefToNumRef(ref);
                    console.log(numRef);
                    setSelectedPassage(numRef);
                }}
                onHover={(event, id) => {
                    if (event === 0) {
                        setCurrentRefId(id);
                    }
                }}
                id={index}
            >
                {ref[0]}
            </ScriptRef>
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
                lyricsDisplay.push(
                    <LyricLine nonLyric={true}>{line}</LyricLine>
                );
            }

            continue;
        }

        let highlight = false;
        for (let span of spans) {
            let type = span[0];
            let sp = span[1];

            if (type === "l" && lineNumber === sp) {
                highlight = true;
            } else if (
                type === "lr" &&
                lineNumber >= sp[0] &&
                lineNumber <= sp[1]
            ) {
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
                <ScriptRef
                    onClick={(ref) => {
                        let numRef = stringRefToNumRef(ref);
                        console.log(numRef);
                        setSelectedPassage(numRef);
                    }}
                    onHover={(event, id) => {}}
                    id={index}
                >
                    {ref}
                </ScriptRef>
            );
            index++;
        }

        versesByLine = <>{otherReferencesDisplay}</>;
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header></Header>

                <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="w-10/12 flex flex-row">
                        <div className="w-1/2">
                            <div className="flex flex-row pb-5 h-12">
                                {mainReferencesDisplay}
                            </div>
                            <div className="flex flex-col">{lyricsDisplay}</div>
                        </div>
                        <div className="w-1/2 border-l-2 ml-4 pl-4">
                            <div className="flex flex-wrap pb-5 h-12">
                                {versesByLine}
                            </div>
                            <div className="flex flex-col">{bibleText}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function LyricLine({
    children,
    lineNumber = -1,
    isHighlighted = false,
    spans = [],
    nonLyric = false,
    onClick = () => {},
}) {
    const [lineIsHighlighted, setLineIsHighlighted] = useState(false);

    const words = children.split();

    let newChildren = <>{children}</>;

    let className = "flex flex-row";

    if (!nonLyric) {
        if (spans[0] === 0) {
            newChildren = (
                <HighlightSpan
                    lineIsHighlighted={lineIsHighlighted || isHighlighted}
                >
                    {children}
                </HighlightSpan>
            );
        }

        if (lineIsHighlighted || isHighlighted) {
            className += " bg-yellow-200";
        }

        className += " cursor-pointer";
    }

    return (
        <div
            className={className}
            onMouseEnter={() => {
                setLineIsHighlighted(true);
            }}
            onMouseLeave={() => {
                setLineIsHighlighted(false);
            }}
            onClick={(e) => {
                if (!nonLyric) onClick(lineNumber);
            }}
        >
            {newChildren}
        </div>
    );
}

function HighlightSpan({ children, lineIsHighlighted = false }) {
    let className = "bg-blue-100 text-blue-700 shadow-md shadow-gray-300";
    if (lineIsHighlighted)
        className = "bg-yellow-300 text-yellow-950 shadow-md shadow-gray-300";

    return <span className={className}>{children}</span>;
}

function ScriptRef({ children, onClick, onHover, id }) {
    return (
        <p
            onClick={() => {
                onClick(children);
            }}
            onMouseEnter={() => {
                onHover(0, id);
            }}
            onMouseLeave={() => {
                onHover(1, id);
            }}
            className="mx-1 font-semibold hover:text-blue-500 cursor-pointer"
        >
            {children}
        </p>
    );
}

// TODO: will need updated
function stringRefToNumRef(stringRef) {
    let numRef = { book: 1, chapter: 1, verse: 1 };
    let parts = stringRef.split(" ");

    let bookPart = parts[0];
    let numberPart = parts[1];

    // slices off period if it is an abbrivation
    if (bookPart.charAt(bookPart.length - 1) === ".") {
        bookPart = bookPart.slice(0, -1);
    }

    numRef.book = bookLookup[bookPart];

    // handel number part
    let numberParts = numberPart.split(":");

    numRef.chapter = numberParts[0];

    let verseRange = numberParts[1];
    let verses = verseRange.split("-");
    if (verses.length === 1) {
        // there was no verse range
        numRef.verse = [verses[0]];
    } else {
        // there was a verse range
        numRef.verse = verses;
    }

    return numRef;
}
