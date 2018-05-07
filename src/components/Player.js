import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Hls from 'hls.js'
import ReactHLS from 'react-hls';


const playerStyle = {
    height: 500,
    width: 800,
};

class Player extends Component {
    static propType = {
        poster: PropTypes.string.isRequired,
        audio: PropTypes.string.isRequired,
        audioTitle: PropTypes.string.isRequired,
        audioDescription: PropTypes.string.isRequired,
        autoPlayToggleHandler: PropTypes.func.isRequired,
    }

    toggleAutoPlay = (event, isInputChecked) => {
        this.props.autoPlayToggleHandler(isInputChecked)
    }

    toggleRepeat = (event, isInputChecked) => {
        this.props.autoPlayToggleHandler(isInputChecked)
    }

    render() {
        return (
            <div className="player">
                <Card style={{width: "100%"}}>
                    <CardMedia>
                        <ReactHLS
                            id="video"
                            ref="audioPlayer"
                            url={this.props.audio}
                            autoPlay={this.props.audio!=""}
                            controls={true}
                            videoProps={{ poster: this.props.poster, style: { height: "100%", width: "100%" }}}
                            />
                    </CardMedia>
                    <CardTitle title={this.props.audioTitle} subtitle={this.props.audioDescription} />
                    {/* <CardText style={{height: 80}}>
                        {this.props.audioDescription}
                    </CardText> */}
                    <CardActions>
                        <Toggle labelPosition="left" label="Repeat:" onToggle={this.toggleRepeat} style={{width: "100%"}} labelStyle={{textAlign:'right', marginRight: 10}}/>
                        <Toggle labelPosition="left" label="Auto play:" onToggle={this.toggleAutoPlay} style={{width: "100%"}} labelStyle={{textAlign:'right', marginRight: 10}}/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Player;
