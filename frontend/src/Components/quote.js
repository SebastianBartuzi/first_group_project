import React from "react";
import axios from 'axios';

class Quote extends React.Component {
    constructor() {
        super();
        this.state = {
            quote : "",
            author : ""
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('quoteList')) {
            console.log(1)
            axios.get('https://type.fit/api/quotes')
            .then(response => {
                console.log(1.5)
                localStorage.setItem('quoteList', JSON.stringify(response.data));
                console.log('getting')
                this.getQuote();
            },(error) =>{console.log(error);});
        } else {
            console.log(2)
            this.getQuote();
        }
    }

    getQuote() {
        var obj = JSON.parse(localStorage.getItem('quoteList'))[Math.floor(Math.random() * JSON.parse(localStorage.getItem('quoteList')).length)];
        this.setState({quote: obj.text});
        this.setState({author: obj.author});
    }

    render() {
        return (
            <div>
            <p>{this.state.quote}</p>
            <p>{this.state.author}</p>
            </div>
        )
    }
}

export default Quote;