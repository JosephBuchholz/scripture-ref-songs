import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

/**
 * A basic resuable header.
 */
export default function Header() {
    return <NavigationBar></NavigationBar>;
}

function NavigationBar() {
    return (
        <>
            <div className="flex bg-gray-100 top-0 w-full h-16 justify-between z-50">
                <div className="flex justify-center items-center text-center">
                    <Link to="/" className="text-3xl font-bold text-black m-6 p-1">
                        Hymns
                    </Link>
                </div>

                <div className="flex justify-center items-center text-center">
                    <SearchBar
                        onSubmit={() => {
                            console.log("Submited");
                        }}
                    ></SearchBar>
                </div>

                <ul className="flex justify-center items-center mr-8">
                    <NavLink to="/songlist">Songs</NavLink>
                </ul>
            </div>
        </>
    );
}

function NavLink({ to, children }) {
    return (
        <>
            <li className="text-center m-6 p-1">
                <Link to={to} className="hover:text-blue-600 transition-all font-semibold">
                    {children}
                </Link>
            </li>
        </>
    );
}
