import React from "react";
import axios from 'axios';

class CatImage extends React.Component {
    constructor() {
        super();
        this.state = {
            imageUrl : "",
            imageAlt: ""
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['x-api-key'] = "bb53c735-8801-4053-b250-6660bf5312b1"
        axios.get('https://api.thecatapi.com/v1/images/search', {params:{ limit:1, size:"full"}})
        .then(response => {
            this.setState({imageUrl : response.data[0].url});
            this.setState({imageAlt : "A"})
            if (response.data[0].breeds.length > 0){
                this.setState({imageAlt : this.state.imageAlt + " " + response.data[0].breeds[0].name})
            }
            this.setState({imageAlt : this.state.imageAlt + " cat"})
            console.log(response.data[0])
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
            <img src={this.state.imageUrl} alt={this.state.imageAlt} className="resize" onLoad={this.resizeImage}/>
        )
    }
}

export default CatImage;