import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Player from './components/Player';
import SearchArea from './components/SearchArea';
import { Tabs, Tab } from 'material-ui/Tabs';
import Videos from './components/Videos';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import axios from 'axios';
import MoreIcon from './components/MoreIcon'
import LessIcon from './components/LessIcon'



class App extends Component {
  componentWillMount() {
    this.setState({
      audio: "",
      poster: "default_thumbnail.jpg",
      audioTitle: "Audio not selected",
      audioDescription: "",
      expandRelatedVideos: false,
      searchVideos: [],
      focusTab: 0,
    });
  }

  relatedVideosToggleHandler = () => {
    this.setState({
      expandRelatedVideos: !this.state.expandRelatedVideos
    });
  }
  
  autoPlayToggleHandler = (toggleState) => {
    // toggleState: bool
    console.log("toggle autoplay!", toggleState)
  }

  replayToggleHandler = (toggleState) => {
    // toggleState: bool
    console.log("toggle autoplay!", toggleState)
  }

  tabChangedHandler = (value) => {
    this.setState({focusTab: value})
  }

  searcHandler = (keywords) => {
    // replace spaces with ','
    keywords = keywords.replace(/\s+/, ",")
    axios.get(`${process.env.REACT_APP_BACKEND}/videos/?q=${keywords}`)
      .then(res => {
        // set unique keys
        console.log(res.data.videos)
        this.setState({
          searchVideos: res.data.videos,
        })
      });
  }

  videoChooseHandler = (video) => {
    console.log("get", video.id)
    axios.get(`${process.env.REACT_APP_BACKEND}/streams/${video.id}`)
    .then(res => {
      console.log(res)
        this.setState({
          audio: process.env.REACT_APP_BACKEND + "/" + res.data.segment_list_file_url,
          poster: video.thumbnail.maxres.url,
          audioTitle: video.title,
          audioDescription: "Published at " + video.publish_date + "   viewed " + video.view_count + " times",
          focusTab: 0, // focus on player tab
        })
      });
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Tabs value={this.state.focusTab} onChange={this.tabChangedHandler}> 
            <Tab label="Play" value={0}>
              <div className="plaer-page" style={{width:400}}>
                <Player
                  audio={this.state.audio}
                  poster={this.state.poster}
                  audioTitle={this.state.audioTitle}
                  audioDescription={this.state.audioDescription}
                  autoPlayToggleHandler={this.autoPlayToggleHandler}/>
                <div style={{height:2}} />
                <div className="related-video-area" style={{ height: 400 }}>
                  <div className="related-video-area-head" style={{ display: 'flex', marginLeft: 10}}>
                    <p style={{ marginTop: 10 }}>Related</p><IconButton onClick={this.relatedVideosToggleHandler} style={{ paddingTop: 0,  }}>{LessIcon()}</IconButton>
                  </div>
                  <Divider />
                  <Videos videoList={this.state.searchVideos} videoClickHandler={this.videoChooseHandler}/>
                </div>
              </div>
            </Tab>
            <Tab label="Search" value={1}>
              <SearchArea searchHandler={this.searcHandler} videoChooseHandler={this.videoChooseHandler} searchResultVideos={this.state.searchVideos}/>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
