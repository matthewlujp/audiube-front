import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import ReactHLS from 'react-hls';


class Player extends Component {
    static propType = {
        poster: PropTypes.string.isRequired,
        audio: PropTypes.string.isRequired,
        audioTitle: PropTypes.string.isRequired,
        audioDescription: PropTypes.string.isRequired,
        chooseHandler: PropTypes.func.isRequired,
        relatedVideoList: PropTypes.array.isRequired,
        watchedVideosList: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            startSet: false,
        };

        this.started = false;
        this.autoPlayFlag = false;
        this.replayFlag = false;
    }

    componentDidUpdate() {
        // reset start status
        this.started = false;
    }

    toggleAutoPlay = (event, toggleValue) => {
        this.autoPlayFlag = toggleValue;
    }
    
    toggleReplay = (event, toggleValue) => {
        this.replayFlag = toggleValue;
    }

    audioEndedHandle = () => {
        if (!this.autoPlayFlag && !this.replayFlag ) return;
        setTimeout(() => {
            const videoDOM = document.getElementsByTagName("video")[0];
            // auto play < replay
            if (this.replayFlag) {
                if (videoDOM) videoDOM.play();
            } else {
                // search for an unwatched video in this.props.relatedVideoList
                for (var i = 0; i < this.props.relatedVideoList.length; i++) {
                    var found = false;
                    for (var j = 0; j < this.props.watchedVideosList.length; j++) {
                        if (this.props.relatedVideoList[i].id == this.props.watchedVideosList[j].id) {
                            found = true;
                            break;
                        }
                    }
                    if (found) continue;

                    this.props.chooseHandler(this.props.relatedVideoList[i]); // not included in watchedVideosList -> play this
                    return
                }
                this.props.chooseHandler(this.props.relatedVideoList[0]); // all videos in relatedVideosList have already been watched
            }
        }, 3000);
    }

    loadedHandler = (e) => {
        if (this.started) return;
        this.started = true;
        const videoDOM = document.getElementsByTagName("video")[0];
        setTimeout(()=>{
            videoDOM.play();
        }, 1000);
    }

    render() {
        const videoDOM = navigator.userAgent.includes("iPhone") ? 
            <video id="video"
                className="iphone-video"
                ref="video"
                poster={this.props.poster}
                controls
                playsInline
                style={{ height: "100%", width: "100%" }} >
                <source src={this.props.audio} type="application/x-mpegURL" />
            </video>:
            <ReactHLS
                id="video"
                ref="video"
                url={this.props.audio}
                controls={true}
                videoProps={{ poster: this.props.poster, onLoadedData: this.loadedHandler, style: { height: "100%", width: "100%" }, onEnded: this.audioEndedHandle}}
                />;

        return (
            <div className="player">
                <Card style={{width: "100%"}}>
                    <CardMedia>
                        {videoDOM}
                    </CardMedia>
                    <CardTitle title={this.props.audioTitle} subtitle={this.props.audioDescription} />
                    <CardActions>
                        <div className="toggles-area" style={{display:"inline-block", width: '100%', marginRight: 500}}>
                            <Toggle labelPosition="left" label="Auto play:" onToggle={this.toggleAutoPlay}  style={{ width: "40%", float: "right", marginRight: 15}} labelStyle={{textAlign:'right', marginRight: 5}}/>
                            <Toggle labelPosition="left" label="Repeat:" onToggle={this.toggleReplay} style={{width: "30%", float: "right"}} labelStyle={{textAlign:'right', marginRight: 5}}/>
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Player;
