import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function ViewSongPage() {
    const { id } = useParams();

    const [currentRefId, setCurrentRefId] = useState(-1);
    const [selectedLineNumber, setSelectedLineNumber] = useState(-1);
    const [selectedPassage, setSelectedPassage] = useState({
        book: 1,
        chapter: 1,
        verse: 1,
    });
    const [bibleText, setBibleText] = useState("");

    // gets selected bible passage from backend
    fetch(
        `/bible/getverse?b=${selectedPassage.book}&c=${selectedPassage.chapter}&v=${selectedPassage.verse}`
    ).then((response) => {
        response.text().then((text) => {
            console.log(text);
            setBibleText(text);
        });
    });

    let songString = "";
    if (id == 0) {
        songString = `Great is Thy faithfulness, O God my Father
There is no shadow of turning with Thee
Thou changest not, Thy compassions, they fail not
As Thou hast been, Thou forever wilt be

Refrain:
Great is Thy faithfulness!
Great is Thy faithfulness!
Morning by morning new mercies I see
All I have needed Thy hand hath provided:
Great is Thy faithfulness, Lord, unto me!

Summer and winter, and springtime and harvest
Sun, moon, and stars in their courses above
Join with all nature in manifold witness
To Thy great faithfulness, mercy, and love.

Pardon for sin and a peace that endureth
Thine own dear presence to cheer and to guide
Strength for today and bright hope for tomorrow:
Blessings all mine with ten thousand beside!`;
    } else {
        songString = "nothing";
    }

    const linesArray = songString.split("\n");

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

        [
            "Ps. 19:1",
            "Ps. 89:5",
            "Rom. 1:19-20",
            "[Ps. 50:6]",
            "[Ps. 7:6]",
            "[Gen. 8:22]",
        ],
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
        ["Ps. 29:11", "Ps. 65:35"],
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
                            <div className="flex flex-row pb-5">
                                {mainReferencesDisplay}
                            </div>
                            <div className="flex flex-col">{lyricsDisplay}</div>
                        </div>
                        <div className="w-1/2 border-l-2 ml-4 pl-4">
                            <div className="flex flex-wrap pb-5">
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

    let className = "flex flex-row ";

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
            className += "bg-yellow-200";
        }
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
            className="mx-1 font-semibold hover:text-blue-500"
        >
            {children}
        </p>
    );
}

const bookLookup = {
    Genesis: 1,
    "Gen.": 1,
    "Ex.": 2,
    "Lev.": 3,
    "Num.": 4,
    "Deut.": 5,
    "Josh.": 6,
    Judges: 7,
    "Judg.": 7,
    Ruth: 8,
    "1 Sam.": 9,
    "2 Sam.": 10,
    "1 Kings": 11,
    "2 Kings": 12,
    "1 Chr.": 13,
    "2 Chr.": 14,
    Ezra: 15,
    "Neh.": 16,
    Esther: 17,
    Job: 18,
    "Ps.": 19,
    "Pro.": 20,
    "Ecc.": 21,
    Song: 22,
    "Isa.": 23,
    "Jer.": 24,
    "Lam.": 25,
    "Ezek.": 26,
    "Dan.": 27,
    Hosea: 28,
    Joel: 29,
    Amos: 30,
    Obadiah: 31,
    Jonah: 32,
    "Mic.": 33,
    Nahum: 34,
    "Hab.": 35,
    "Zeph.": 36,
    "Hag.": 37,
    "Zech.": 38,
    "Mal.": 39,
    "Matt.": 40,
    Mark: 41,
    Luke: 42,
    John: 43,
    Acts: 44,
    "Rom.": 45,
    "1 Cor.": 46,
    "2 Cor.": 47,
    "Gal.": 48,
    "Eph.": 49,
    Philippians: 50,
    "Phil.": 50,
    "Col.": 51,
    "1 Thes.": 52,
    "2 Thes.": 53,
    "1 Tim.": 54,
    "2 Tim.": 55,
    Titus: 56,
    Philemon: 57,
    Hebrews: 58,
    "Heb.": 58,
    James: 59,
    "Jam.": 59,
    "1 Pet.": 60,
    "2 Pet.": 61,
    "1 John": 62,
    "2 John": 63,
    "3 John": 64,
    Jude: 65,
    "Rev.": 66,
};

// TODO: will need updated
function stringRefToNumRef(stringRef) {
    let numRef = { book: 1, chapter: 1, verse: 1 };
    let parts = stringRef.split(" ");

    numRef.book = bookLookup[parts[0]];

    let p = parts[1].split(":");
    let o = p[1].split("-");
    let chapter = p[0];
    let verse = o[0];
    numRef.chapter = chapter;
    numRef.verse = verse;

    return numRef;
}
