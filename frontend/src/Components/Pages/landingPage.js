import "../../Styles/landingPage.css";
import logoText from '../../images/logoText.png';

const LandingPage = () =>{
    return(
        <div className="centeredDiv" style={{height: "100%", width: "100%"}}>
            <img src={logoText}></img>
            <h1 className="title">Content To Make You Content</h1>
            <p>Are you feeling bored? Are you feeling anxious? Looking for a place to get your mind off things? If your answer is yes, then you are on the right page. Project Happy gives you access to different categories of entertaining content such as minigames, quizzes, polls, jokes, riddles, and many more.  Not sure where to start? Click our random button generator to be taken to a randomly selected page!</p>
        </div>
    )
}

export default LandingPage;