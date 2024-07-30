import { useParams } from "react-router-dom";
import Header from "../components/Header";

export default function ViewSongPage() {
    const { id } = useParams();

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
    ];

    let mainReferencesDisplay = [];

    for (let ref of references) {
        mainReferencesDisplay.push(<p>{ref[0]}</p>);
    }

    let lyricsDisplay = [];

    let spans = references[0][1];

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
                    {mainReferencesDisplay}
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
