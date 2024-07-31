import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export default function ViewSongPage() {
    const { id } = useParams();

    const [currentRefId, setCurrentRefId] = useState(-1);

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

    let mainReferencesDisplay = [];

    let index = 0;
    for (let ref of references) {
        mainReferencesDisplay.push(
            <ScriptRef
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
                lyricsDisplay.push(<br></br>);
            } else if (line === "Refrain:") {
                lyricsDisplay.push(<LyricLine>{line}</LyricLine>);
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

        lyricsDisplay.push(<LyricLine spans={s}>{line}</LyricLine>);
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header></Header>

                <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="flex flex-row">{mainReferencesDisplay}</div>
                    <div className="flex flex-col">{lyricsDisplay}</div>
                </div>
            </div>
        </>
    );
}

function LyricLine({ children, spans = [] }) {
    const words = children.split();

    let newChildren = <>{children}</>;

    if (spans[0] === 0) {
        newChildren = <HighlightSpan>{children}</HighlightSpan>;
    }

    return <div className="flex flex-row">{newChildren}</div>;
}

function HighlightSpan({ children }) {
    return (
        <span className="bg-blue-100 text-blue-700 shadow-md shadow-gray-300">
            {children}
        </span>
    );
}

function ScriptRef({ children, onHover, id }) {
    return (
        <p
            onMouseEnter={() => {
                onHover(0, id);
            }}
            onMouseLeave={() => {
                onHover(1, id);
            }}
            className="m-1 font-semibold"
        >
            {children}
        </p>
    );
}
