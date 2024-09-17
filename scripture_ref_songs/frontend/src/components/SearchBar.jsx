export default function SearchBar({ onSubmit = () => {} }) {
    return (
        <div>
            <input
                className="p-1 rounded-md"
                name="Search"
                placeholder="Search"
                type="text"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSubmit();
                    }
                }}
            ></input>
        </div>
    );
}
