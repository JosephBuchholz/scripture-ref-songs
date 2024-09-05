/**
 * Highlights its children.
 *
 * @param children The children to be highlighted.
 * @param {boolean} lineIsHighlighted Whether to highlight the children.
 */
export default function HighlightSpan({ children, lineIsHighlighted = false }) {
    let className = "bg-blue-100 text-blue-700 shadow-md shadow-gray-300";
    if (lineIsHighlighted)
        className = "bg-yellow-300 text-yellow-950 shadow-md shadow-gray-300";

    return <span className={className}>{children}</span>;
}
