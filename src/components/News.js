import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super(); // Whenever we create a constructor in a class based component we need to call super() method to call the constructor of the parent class
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount(){ // This method is called after the component is mounted (Learn about JS Promises to understand async/await)
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=7fa53e49e8794638a5940ea59fb96ece&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles : parsedData.articles, totalResults: parsedData.totalResults});
  }

  handlePrevClick = async () => {
    console.log("Previous");

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7fa53e49e8794638a5940ea59fb96ece&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles : parsedData.articles
    });
  }

  handleNextClick = async () => {
    console.log("Next");

    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){ 
      // Do nothing and pass
    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7fa53e49e8794638a5940ea59fb96ece&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles : parsedData.articles
      });
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>NewsMonkey - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col md-4" key={element.url}>
            {/* Add a default image here */}
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/> 
          </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-3">
        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News