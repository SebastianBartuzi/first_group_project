import React from "react";
import axios from 'axios';
import "../Styles/catImage.css";

class CatImage extends React.Component {
    constructor() {
        super();
        this.state = {
            imageUrl : ""
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['x-api-key'] = "bb53c735-8801-4053-b250-6660bf5312b1"
        axios.get('https://api.thecatapi.com/v1/images/search', {params:{ limit:1, size:"full"}})
        .then(response => {
            this.setState({imageUrl : response.data[0].url});
        });
    }
    
    render() {
        return (
            <img src={this.state.imageUrl} className="image"/>
        )
    }
}

export default CatImage;