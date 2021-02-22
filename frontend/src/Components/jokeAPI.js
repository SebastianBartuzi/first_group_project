import React from "react";
import axios from 'axios';

class Joke extends React.Component {
    constructor() {
        super();
        this.state = {
            setup : "",
            punchline: ""
        }
    }

    componentDidMount() {
        axios.get("https://official-joke-api.appspot.com/random_joke")
        .then(response => {
            this.setState({setup: response.data.setup});
            this.setState({punchline: response.data.punchline});
        });
    }
    
    resizeImage({target:img}) {
        let ratio = img.height / img.width;
        if (window.innerWidth * 0.5 * ratio > window.innerHeight * 0.6) {
            img.height = window.innerHeight * 0.6;
        } else {
            img.width = window.innerWidth * 0.5;
        }
    }

    render() {
        return (
            <div>
                <p className = "setup">{this.state.setup}</p>
                <p className = "punchline">{this.state.punchline}</p>
            </div>
            
        )
    }
}

export default Joke;