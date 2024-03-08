import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  pageSize = 5;
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
          <Routes>
              <Route key="home" path="/" element={<News pageSize={this.pageSize} country="in" category="general" />} />
              <Route key="business" path="/business" element={<News pageSize={this.pageSize} country="in" category="business" />} />
              <Route key="entertainment" path="/entertainment" element={<News pageSize={this.pageSize} country="in" category="entertainment" />} />
              <Route key="general" path="/general" element={<News pageSize={this.pageSize} country="in" category="general" />} />
              <Route key="health" path="/health" element={<News pageSize={this.pageSize} country="in" category="health" />} />
              <Route key="science" path="/science" element={<News pageSize={this.pageSize} country="in" category="science" />} />
              <Route key="sports" path="/sports" element={<News pageSize={this.pageSize} country="in" category="sports" />} />
              <Route key="technology" path="/technology" element={<News pageSize={this.pageSize} country="in" category="technology" />} />
            </Routes>
        </Router>
      </div>
    )
  }
}
