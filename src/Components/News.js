import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor()
    {
        super();
        console.log("Constructor of newsis called");
        this.state = {
            articles : []
        }
    }

    async componentDidMount()
    {
        console.log("I am component did mount");
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=2069f8682ebc4eefad0647d5e3ca6b7e";
        let data = await fetch(url);
        let parsedata = await data.json();
        console.log(parsedata);
        this.setState({articles : parsedata.articles});
    }

    render() {
        return (
            <div className="container my-3">
                <center>
                    <h2>YOUR - TOP HEADLINES</h2>
               

                    <div className="row">
                    {this.state.articles.map((element)=>{

                        return  <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                                </div>
                    })}    
                    </div>
                
                </center>
            </div>
        )
    }
}

export default News
