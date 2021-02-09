import "../../Styles/landingPage.css";
import logoText from '../../images/logoText.png';

const LandingPage = () =>{
    return(
        <div className="centeredDiv" style={{height: "100%", width: "100%"}}>
            <img src={logoText}></img>
            <h1 className="title">Content To Make You Content</h1>
            <p>I'm baby cray keytar succulents, kinfolk fam you probably haven't heard of them slow-carb waistcoat plaid umami banh mi lyft vaporware. Pug synth jean shorts deep v actually polaroid cardigan tofu roof party aesthetic. XOXO ennui 3 wolf moon, put a bird on it salvia trust fund health goth mumblecore tote bag live-edge sustainable banh mi sartorial austin knausgaard. Air plant tumblr lumbersexual forage you probably haven't heard of them irony. Edison bulb vape poke gentrify fixie portland. Tacos offal +1 yuccie freegan blog four dollar toast sriracha coloring book disrupt tote bag.</p>
        </div>
    )
}

export default LandingPage;