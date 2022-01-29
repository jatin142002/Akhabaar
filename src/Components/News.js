import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        pagesize : 6,
        category : "general"

    } 

    static propTypes = {
        pagesize : PropTypes.number,
        category : PropTypes.string
    }

    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props)
    {
        super(props);
        console.log("Constructor of newsis called");
        this.state = {
            articles : [],
            loading : false,
            page : 1,
            totalResults : 0
        }
        document.title = `AKHABAAR - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async updateNews()
    {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedata = await data.json();
        this.props.setProgress(70);
        console.log(parsedata);
        this.setState({
            articles : parsedata.articles ,
            totalResults : parsedata.totalResults ,
            loading : false
        });
        this.props.setProgress(100);
    }

    async componentDidMount()
    {
        // console.log("I am component did mount");
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pagesize}`;
        // this.setState({loading : true});
        // let data = await fetch(url);
        // let parsedata = await data.json();
        // console.log(parsedata);
        // this.setState({
        //     articles : parsedata.articles ,
        //     totalResults : parsedata.totalResults ,
        //     loading : false
        // });
        this.updateNews();
    }

    // handleNextClick= async()=>{
    //     console.log("Next is called !!");

    //     // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
    //     // this.setState({loading : true});
    //     // let data = await fetch(url);
    //     // let parsedata = await data.json();
    //     // console.log(parsedata);

    //     // this.setState({
    //     //     page : this.state.page + 1,
    //     //     articles : parsedata.articles,
    //     //     loading:false
    //     // })
    //     this.setState({page : this.state.page+1});
    //     this.updateNews();
    // }

    // handlePrevClick= async()=>{
    //     console.log("Prev is called !!");

    //     // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
    //     // this.setState({loading : true});
    //     // let data = await fetch(url);
    //     // let parsedata = await data.json();
    //     // console.log(parsedata);

    //     // this.setState({
    //     //     page : this.state.page - 1,
    //     //     articles : parsedata.articles,
    //     //     loading : false
    //     // })
    //     this.setState({page : this.state.page-1});
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        this.setState({page : this.state.page+1});
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        // this.setState({loading : true});
        let data = await fetch(url);
        let parsedata = await data.json();
        console.log(parsedata);
        this.setState({
            articles : this.state.articles.concat(parsedata.articles) ,
            totalResults : parsedata.totalResults ,
            loading : false
        });
      };

    render() {
        return (
            <>
               <center>
                    <h2 className='text-center' style={{marginTop:'80px'}}>Top  {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>

                    {this.state.loading && <Spinner/>}

                    {/* <div className="row my-4">
                    {!this.state.loading && this.state.articles.map((element)=>{

                        return  <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                                </div>
                    })}    
                    </div> */}
                     <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults }
                        loader={<Spinner/>}
                    >
                    
                    <div className="container">
                        <div className="row my-2">
                        {this.state.articles.map((element)=>{

                            return  <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,50):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                                    </div>
                        })}    
                        </div>
                    </div>

                    </InfiniteScroll>

                    {/* <div className="conatiner d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                        <button disabled={this.state.page===Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}

                </center>
               
            </>
        )
    }
}

export default News
