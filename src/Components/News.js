import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor()
    {
        super();
        console.log("Constructor of newsis called");
        this.state = {
            articles : [],
            page : 1
        }
    }

    async componentDidMount()
    {
        console.log("I am component did mount");
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=2069f8682ebc4eefad0647d5e3ca6b7e&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedata = await data.json();
        console.log(parsedata);
        this.setState({articles : parsedata.articles , totalResults : parsedata.totalResults});
    }

    handleNextClick= async()=>{
        console.log("Next is called !!");

        // if(this.state.page + 1 > Math.ceil(this.state.totalResults/20))
        // {

        // }
        // else
        // {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2069f8682ebc4eefad0647d5e3ca6b7e&page=${this.state.page+1}&pageSize=20`;
            let data = await fetch(url);
            let parsedata = await data.json();
            console.log(parsedata);
    
            this.setState({
                page : this.state.page + 1,
                articles : parsedata.articles
            })
        // }

    }

    handlePrevClick= async()=>{
        console.log("Prev is called !!");

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2069f8682ebc4eefad0647d5e3ca6b7e&page=${this.state.page-1}&pageSize=20`;
        let data = await fetch(url);
        let parsedata = await data.json();
        console.log(parsedata);

        this.setState({
            page : this.state.page - 1,
            articles : parsedata.articles
        })
    }

    render() {
        return (
            <div className="container my-3">
                <center>
                    <h2>INDIA's - TOP HEADLINES</h2>
               

                    <div className="row">
                    {this.state.articles.map((element)=>{

                        return  <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                                </div>
                    })}    
                    </div>
                    <div className="conatiner d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                        <button disabled={this.state.page===Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                
                </center>
            </div>
        )
    }
}

export default News
