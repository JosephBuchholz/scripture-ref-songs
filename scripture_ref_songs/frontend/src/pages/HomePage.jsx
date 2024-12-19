import Header from "../components/Header";

/**
 * Basic home page.
 */
export default function HomePage() {
    return (
        <>
            <div className="flex flex-col h-screen w-screen">
                <Header></Header>

                <div className="flex-1 flex justify-center items-center">
                    <h1 className="text-6xl font-bold text-blue-900 m-10">Welcome!</h1>
                </div>
            </div>
        </>
    );
}
