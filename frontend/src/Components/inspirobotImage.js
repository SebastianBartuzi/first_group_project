import React from "react";
import axios from 'axios';

class InspirobotImage extends React.Component {
    constructor() {
        super();
        this.state = {
            imageUrl : ""
        }
    }

    componentDidMount() {
        axios.get('https://inspirobot.me/api?generate=true')
        .then(response => {
            console.log(response.data)
            this.setState({imageUrl : response.data});
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
            <img src={this.state.imageUrl} className="resize" onLoad={this.resizeImage}/>
        )
    }
}

export default InspirobotImage;