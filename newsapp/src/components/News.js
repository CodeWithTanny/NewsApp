import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types' //rptc
import InfiniteScroll from "react-infinite-scroll-component";

export class news extends Component { //rce

    static defultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static PropsTypes = {
        country: PropTypes.string,//pts
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalReults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - DailySamachar`
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json()
        this.props.setProgress(70);
        console.log(parseData);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b21816691c584f34823753a052c67247&page=1&pageSize=${this.props.pageSize}`;
        //   this.setState({loading: true})
        //   let data =await fetch(url);
        //   let parseData = await data.json()
        //   console.log(parseData);
        //   this.setState({articles:parseData.articles, totalResults: parseData.totalResults,loading: false})

        //we copy all theses code in the above function
        this.updateNews();
    }

    

    handlePrevious = async () => {
        // console.log("previous")
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b21816691c584f34823753a052c67247&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true})
        //     let data =await fetch(url);
        //     let parseData = await data.json()
        //     console.log(parseData);

        //     this.setState({
        //         page: this.state.page-1,
        //         articles:parseData.articles,
        //         loading: false
        //     })    

        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        // console.log("next")
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b21816691c584f34823753a052c67247&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true})
        //     let data =await fetch(url);
        //     let parseData = await data.json()

        //     this.setState({
        //         page: this.state.page+1,
        //         articles:parseData.articles,
        //         loading: false
        //     })
        // instead of writing all above code we created a function and we call the fucntion 

        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({ articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults })
      };


    render() {
        console.log("render");
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>DailySamachar - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalReults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row">
                        {/*!this.state.loading && */this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
           
           </>
        )
    }
}

export default news