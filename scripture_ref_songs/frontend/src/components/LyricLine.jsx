import HighlightSpan from "./Highlighters";
import { useState } from "react";

/**
 * A single lyric line
 *
 * @param children The lyric line to be displayed.
 * @param lineNumber The line number.
 * @param isHighlighted Whether this line should be highlighted (in blue).
 * @param spans Not used at the moment.
 * @param nonLyric Indicates whether this line should be treated
 * as part of the lyrics ("Refrain: " will not be counted as a lyric).
 * @param onClick Basic onClick callback.
 */
export default function LyricLine({
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
