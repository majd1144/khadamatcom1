export default function WelcomeBoard() {
    return (
        <div className="container_welcome">
            <h1>Scale your professional <br />workforce with{" "}<span style={{ fontFamily: "'Playwrite IN', serif" }}>Freelancers</span></h1>
            <br /><br /><br />
            <div className="search-bar_wel">
                <input type="text" placeholder="Search for any service..." />
                <button className="fa fa-search" type="submit"></button>
            </div>
        </div>
    );
}
