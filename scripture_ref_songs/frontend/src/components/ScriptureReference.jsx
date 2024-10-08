/**
 * A scripture reference object that displays a scripture reference (like: John 3:16).
 *
 * @param children The scripture reference.
 * @param {function} onClick Callback for when the user clicks this reference.
 * @param {function} onHover Callback for when the user hovers over this reference.
 * @param {number} id A unique identifier passed to the onHover callback.
 */
export default function ScriptureReference({ children, onClick, onHover, id }) {
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
