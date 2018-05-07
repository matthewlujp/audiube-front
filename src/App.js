import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Player from './components/Player';
import SearchArea from './components/SearchArea';
import { Tabs, Tab } from 'material-ui/Tabs';
import Videos from './components/Videos';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';
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
      relatedVideos: [],
      focusTab: 0,
      autoPlayFlag: false,
      replayFlag: false,
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
    this.setState({
      autoPlayFlag: toggleState,
      replayFlag: !toggleState && this.replayFlag,
    });
  }
  
  replayToggleHandler = (toggleState) => {
    // toggleState: bool
    console.log("toggle replay!", toggleState)
    this.setState({
      replayFlag: toggleState,
      autoPlayFlag: !toggleState && this.autoPlayFlag,
    });
  }

  tabChangedHandler = (value) => {
    this.setState({focusTab: value})
  }

  searcHandler = (keywords) => {
    // replace spaces with ','
    keywords = keywords.replace(/\s+/g, ",")
    axios.get(`${process.env.REACT_APP_BACKEND}/videos/?q=${keywords}`).then(res => {
      // set unique keys
      this.setState({
        searchVideos: res.data.videos,
      })
    });
  }

  videoChooseHandler = (video) => {
    axios.get(`${process.env.REACT_APP_BACKEND}/streams/${video.id}`).then(res => {
      // request for related videos
      axios.get(`${process.env.REACT_APP_BACKEND}/videos/?relatedToVideoId=${video.id}`).then(relatedVideos => {
        this.setState({
          relatedVideos: relatedVideos.data.videos,
        });
      });

      this.setState({
        audio: process.env.REACT_APP_BACKEND + "/" + res.data.segment_list_file_url,
        poster: video.thumbnail.maxres.url || video.thumbnail.standard.url || video.thumbnail.default.url,
        audioTitle: video.title,
        audioDescription: "Published at " + video.publish_date + "   viewed " + video.view_count + " times",
        focusTab: 0, // focus on player tab
      });
    });
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Tabs value={this.state.focusTab} onChange={this.tabChangedHandler} > 
            <Tab label="Play" value={0}>
              <div className="player-page" style={{height:1000, marginLeft:'auto', marginRight:'auto'}}>
                <Player
                  audio={this.state.audio}
                  poster={this.state.poster}
                  audioTitle={this.state.audioTitle}
                  audioDescription={this.state.audioDescription}
                  chooseHandler={this.videoChooseHandler}
                  relatedVideoList={this.state.relatedVideos}
                  />
                <div style={{height:2}} />
                <div className="related-video-area" style={{ height: 600, width: '100%' }}>
                  <p style={{ marginTop: 12, marginLeft: 15 }}>Related Audios</p>
                  <Divider />
                  <Videos videoList={this.state.relatedVideos} videoClickHandler={this.videoChooseHandler}/>
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
