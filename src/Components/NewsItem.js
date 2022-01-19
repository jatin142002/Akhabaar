import React, { Component } from 'react'

export class NewsItem extends Component {

    constructor()
    {
        super();
        console.log("Constructor of newsitem is called");
    }

    render() {
        let {title , description , imageUrl , newsUrl} = this.props ;
        return (
            <div className="my-3">
                <div className="card" style={{width: "18rem"}}>
                <img src={!imageUrl?"https://cdn.cnn.com/cnnnext/dam/assets/220119031612-indian-navy-2009-file-super-tease.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
