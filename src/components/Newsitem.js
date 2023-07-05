import React from 'react'

const Newsitem =(props)=> {
    let {title,desc,imgUrl,newsUrl,time,author}=props;
    return (
      <div>
        <div className="card my-2" >
        <img src={imgUrl? imgUrl:"https://static.vecteezy.com/system/resources/previews/000/197/882/original/vector-news-headlines-background-with-earth-planet.jpg"} className="card-img-top" alt="..." style={{objectFit : "contain",objectPosition:"top"}}/>
          <div className="card-body">
            <h5 clsportassName="card-title">{title+"..."}</h5>
            <p className="card-text">{desc+"..."}</p>
            <p className="card-text"><small>By {author? author :"Unknown"} on {new Date(time).toUTCString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-primary">Read more</a>
          </div>
      </div>
      </div>
    )
}

export default Newsitem
