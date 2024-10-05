
const Header= ()=>{
    function displayDocs(){
        window.open("/DOCUMENTATION_MINI.pdf", '_blank');
    };
    function navigateHome(){
        window.location.href="/";
    }
    return <>
        <nav>
            <div class="div1">
                <h1>X-raying the Threat</h1>
            </div>
            <div class="div2">
                <button onClick={navigateHome}>Home</button>
                <button onClick={displayDocs}>Docs</button>
                <button>About us</button>
                {/* <button>Feedback </button> */}
                {/* <button>Login</button> */}
            </div>
        </nav>
        {/* <marquee>
                this is a sample marquee tag
        </marquee> */}
    </>
}
export default Header;