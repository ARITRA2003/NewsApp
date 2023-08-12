import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'
import About from './components/About';


const App=()=>{
  const pageSize = 5;
  const apikey=process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<News  apikey={apikey} setProgress={setProgress} key="general" pageSize={pageSize} country={"us"} category="general" />}
            />
            <Route
              path="/sports" 
              element={<News  apikey={apikey} setProgress={setProgress} key="sports" pageSize={pageSize} country={"us"} category="sports" />}
            />
            <Route
              path="/buisness"
              element={<News  apikey={apikey} setProgress={setProgress} key="buisness" pageSize={pageSize} country={"us"} category="buisness" />}
            />

            <Route
              path="/entertainment"
              element={<News  apikey={apikey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country={"us"} category="entertainment" />}
            />

            <Route
              path="/health"
              element={<News  apikey={apikey} setProgress={setProgress} key="health" pageSize={pageSize} country={"us"} category="health" />}
            />
            <Route
              path="/science"
              element={<News  apikey={apikey} setProgress={setProgress} key="science" pageSize={pageSize} country={"us"} category="science" />}
            />
            <Route
              path="/technology"
              element={<News  apikey={apikey} setProgress={setProgress} key="technology" pageSize={pageSize} country={"us"} category="technology" />}
            />
            <Route
              path="/about"
              element={<About />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    )
  
}

export default App


