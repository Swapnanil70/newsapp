import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

  // Default props are used to set the default values of the props
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  } 

  // Prop types are used to set the type of the props
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props){
    super(props); // Whenever we create a constructor in a class based component we need to call super() method to call the constructor of the parent class
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fa53e49e8794638a5940ea59fb96ece&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles : parsedData.articles, totalResults: parsedData.totalResults, loading: false});
  }

  async componentDidMount(){ // This method is called after the component is mounted (Learn about JS Promises to understand async/await)
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({page: this.state.page-1});
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({page: this.state.page+1});
    this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin : '40px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* Whenever the page is in loading state show the spinner component */}
        {/* {this.state.loading && <Spinner/>}  */}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col md-4" key={element.url}>
            {/* Add a default image here */}
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/> 
          </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-3">
        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News