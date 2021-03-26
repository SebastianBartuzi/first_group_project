import React from "react";
import axios from 'axios';

class Quote extends React.Component {
    constructor() {
        super();
        this.state = {
            quote : "",
            author: "",
            flaggedTags : ["attitude", "marriage", "medical", "mom", "morning", "movies", "music", "parenting", "patriotism"]
        }

    }

   

    fetchQuote() {
        axios.get("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
        .then(response => {
            if (this.state.flaggedTags.includes(response.data.quotes[0].tag ) || response.data.quotes[0].text.length>150 || response.data.quotes[0].text.includes("God") || response.data.quotes[0].text.includes("Boxing")){                
                this.fetchQuote();

            }
            
            else{
                this.setState({quote: '"' + response.data.quotes[0].text +'"'});
                this.setState({author: '- ' + response.data.quotes[0].author});
                console.log(response.data.quotes[0].tag);
                console.log(response.data.quotes[0].text.length)
            }

            
        });
    }
    
    componentDidMount() {
        this.fetchQuote()
    }



  
   

    render() {
        return (
            <div>
                <p className = "setup">{this.state.quote}</p>
                <p className = "setup">{this.state.author}</p>

            </div>
        )
    }
}
export default Quote;