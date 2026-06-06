export function Footer() {
    return (
        <footer className="bg-gray-900 text-white  pb-40 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <div className="text-2xl font-bold mb-4">Johnas Blasco</div>
                <p className="text-gray-400 mb-6">Creating beautiful digital experiences</p>
                <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Johnas. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
