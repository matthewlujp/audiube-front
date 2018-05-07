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

  searcHandler = (keywords) => {
    // replace spaces with ','
    keywords = keywords.replace(/\s+/, ",")
    axios.get(`http://audiube.xyz/videos/?q=${keywords}`)
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
    axios.get(`http://audiube.xyz/streams/${video.id}`)
    .then(res => {
      console.log(res)
        this.setState({
          audio: "http://audiube.xyz/"+res.data.segment_list_file_url,
          poster: video.thumbnail.maxres.url,
          audioTitle: video.title,
          audioDescription: "Published at " + video.publish_date + "   viewed " + video.view_count + " times"
        })
      });
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Tabs> 
            <Tab label="Play" >
              <div className="plaer-page" style={{width:400}}>
                <Player
                  audio={this.state.audio}
                  poster={this.state.poster}
                  audioTitle={this.state.audioTitle}
                  audioDescription={this.state.audioDescription}
                  autoPlayToggleHandler={this.autoPlayToggleHandler}/>
                <div style={{height:2}} />
                {/* {
                  this.state.expandRelatedVideos ? 
                    <Paper style={{ height: 400, width: "100%", paddingLeft: 10, paddingRight: 10  }}>
                      <div style={{ display: 'flex', marginLeft: 10}}>
                        <p style={{ marginTop: 10 }}>Related</p><IconButton onClick={this.relatedVideosToggleHandler} style={{ paddingTop: 0,  }}>{LessIcon()}</IconButton>
                      </div>
                      <Divider />
                      <Videos />
                    </Paper> :
                    <Paper style={{ height: 40, width: "100%", paddingLeft: 10, paddingRight: 10 }}>
                      <div style={{ display: 'flex', marginLeft: 10 }}>
                        <p style={{ marginTop: 10 }}>Related</p><IconButton onClick={this.toggleRelatedVideos} style={{ paddingTop: 3, paddingBottom: 12 }}>{MoreIcon()}</IconButton>
                      </div>
                    </Paper>
                } */}
                <Paper style={{ height: 400, width: "100%", paddingLeft: 10, paddingRight: 10  }}>
                  <div style={{ display: 'flex', marginLeft: 10}}>
                    <p style={{ marginTop: 10 }}>Related</p><IconButton onClick={this.relatedVideosToggleHandler} style={{ paddingTop: 0,  }}>{LessIcon()}</IconButton>
                  </div>
                  <Divider />
                  <Videos videoList={this.state.searchVideos} videoClickHandler={this.props.videoChooseHandler}/>
                </Paper>
              </div>
            </Tab>
            <Tab label="Search" >
              <SearchArea searchHandler={this.searcHandler} videoChooseHandler={this.videoChooseHandler} searchResultVideos={this.state.searchVideos}/>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
