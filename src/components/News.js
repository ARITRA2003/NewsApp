import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    const toUpper = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(function (word) {
                return word[0].toUpperCase() + word.substr(1);
            })
            .join(' ');
    }



    const fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles));
        setloading(false);
        settotalResults(parsedData.totalResults);
        setpage(page+1);
    };


    const NewsUpdate = async (pageNo) => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${pageNo}&pageSize=${props.pageSize}`;
        setloading(true);
        props.setProgress(40);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70);

        setarticles(parsedData.articles);
        setloading(false);
        settotalResults(parsedData.totalResults);
        // this.setState({
        //     articles: parsedData.articles,
        //     loading: false,
        //     totalResults: parsedData.totalResults,
        // });
        props.setProgress(100);
    }

    useEffect(() => {
        NewsUpdate(1);
        setpage(1);
        document.title = `NewsApp-${toUpper(props.category)}`;
    }, []);

    // const handleNextclick = async () => {
    //     NewsUpdate(page + 1);
    //     setpage(page+1);
    // }

    // const handlePreviousclick = async () => {
    //     NewsUpdate(page - 1);
    //     setpage(page-1);
    // }


    return (
        // <div className="container my-3">
        //     <h1 className="text-center"><u><strong>Top headlines</strong></u></h1>
        // {/* {this.state.loading && <Spinner/>} */}
        // {/* <div className="row my-3">
        //     {!this.state.loading && this.state.articles.map((element) => {
        //         return <div className='col-md-4' key={element.url}>
        //             <Newsitem title={element.title && element.title.slice(0, 50)} desc={element.description && element.description.slice(0, 61)} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt}/>
        //         </div>;
        //     })};
        // </div> */}




        //     {/* <div className="container d-flex justify-content-between">
        //         <button disabled={this.state.page <= 1} type="button" className="btn btn-info mx-1" onClick={this.handlePreviousclick}>&larr; Previous</button>
        //         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-info mx-1" onClick={this.handleNextclick}>next &rarr;</button>
        //     </div> */}
        // {/* </div> */}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !==totalResults}
            loader={<Spinner />}
        >
            <h1 className="text-center" style={{marginTop:"80px"}}><u><strong>Top headlines - {toUpper(props.category)}</strong></u></h1>
            {loading && <Spinner />}
            <div className="container">
                <div className="row my-3">
                    {articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <Newsitem title={element.title && element.title.slice(0, 50)} desc={element.description && element.description.slice(0, 61)} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} />
                        </div>;
                    })}
                </div>
            </div>
        </InfiniteScroll>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: "10",
    category: "general",
}

News.propTypes = {
    country: String,
    pageSize: Number,
    category: String,
    apikey: String
}

export default News
