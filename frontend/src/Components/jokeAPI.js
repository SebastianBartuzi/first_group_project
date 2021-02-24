import React from "react";
import axios from 'axios';

class Joke extends React.Component {
    constructor() {
        super();
        this.state = {
            setup : "",
            punchline: "",
            show : false,
            cowsay : false,
            pengsay : false
        }
    }

    componentDidMount() {
        if (localStorage.getItem('cowsay')){
            if (localStorage.getItem('cowsay') == "true") {
                this.setState({cowsay: true});
            }
        } else {
            localStorage.setItem('cowsay', "false")
        }
        if (localStorage.getItem('pengsay')){
            if (localStorage.getItem('pengsay') == "true") {
                this.setState({pengsay: true});
            }
        } else {
            localStorage.setItem('pengsay', "false")
        }
        axios.get("https://official-joke-api.appspot.com/random_joke")
        .then(response => {
            this.setState({setup: response.data.setup});
            this.setState({punchline: response.data.punchline});
        });
    }
    
    showPunchline = () => {
        this.setState({show: true});
    }

    toggleCow = () => {
        if (this.state.cowsay) {
            this.setState({cowsay: false});
            localStorage.setItem( 'cowsay', "false" );
        } else {
            this.setState({pengsay: false});
            localStorage.setItem( 'pengsay', "false" );
            this.setState({cowsay: true});
            localStorage.setItem( 'cowsay', "true" );
        }
        
    }

    togglePeng = () => {
        if (this.state.pengsay) {
            this.setState({pengsay: false});
            localStorage.setItem( 'pengsay', "false" );
        } else {
            this.setState({cowsay: false});
            localStorage.setItem( 'cowsay', "false" );
            this.setState({pengsay: true});
            localStorage.setItem( 'pengsay', "true" );
        }
        
    }

    refreshPage() {
        window.location.reload(false); 
    }

    render() {
        return (
            <div>
                <p className = "setup">{this.state.setup}</p>
                {this.state.cowsay
                ? <span>
                <div style={{height: "8em"}}><div className="cowBox">
                <pre>{` \\   ^__^
  \\  (oo)\\_______
     (__)\\       )\\/\\
         ||----w |
         ||     ||`}</pre>
                </div></div>
                </span>
                : false}
                {this.state.pengsay
                ? <span>
                <div style={{height: "12em"}}><div className="cowBox">
                <pre>{`   \\
    \\  .--.
      |o_o |
      |:_/ |
     //   \\ \\
    (|     | )
   /\'\\_   _/\`\\
   \\___)=(___/`}</pre>
                </div></div>
                </span>
                : false}
                {this.state.show
                 ? <p className = "punchline">{this.state.punchline}</p>
                 : <button onClick = {this.showPunchline} class="button" style={{marginTop: "1em"}}>Show Punchline</button>}
                <div style={{textAlign: "center"}}>
                <button onClick = {this.toggleCow} class="button" style={{marginTop: "1em", display: "inline-block"}}>Toggle Cow</button>
                <button onClick = {this.refreshPage} class="button" style={{marginLeft: "1em", display: "inline-block"}}>Next Joke</button>
                <button onClick = {this.togglePeng} class="button" style={{marginLeft: "1em", display: "inline-block"}}>Toggle Penguin</button>
                </div>
            </div>
            
        )
    }
}

export default Joke;