import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider/Divider';
import Avatar from 'material-ui/Avatar';

class VideoCard extends Component {
    static propType = {
        video: PropTypes.object.isRequired,
        clickHandler: PropTypes.func.isRequired,
    }
    
    clickHandler = (event) => {
        this.props.clickHandler(this.props.video)
    }

    render() {
        const description = `${convertDuration(this.props.video.duration)} ${this.props.video.publish_date} views:${this.props.video.view_count}`
        return (
            <div className="video-card">
                <div style={{height:5}} />
                <ListItem
                    leftAvatar={<Avatar src={this.props.video.thumbnail.default.url} />}
                    primaryText={this.props.video.title}
                    secondaryText={description}
                    hoverColor='#c7d0dd'
                    onClick={this.clickHandler}
                    style={{height: 80}} />
                <div style={{height:5}} />
                <Divider />
            </div>
        );
    }
}

function convertDuration(dur) {
    dur /= 1000000000;
    var h = Math.floor(dur / 3600);
    var formatH = ('00' + h).slice(-2)
    var m = Math.floor((dur % 3600) / 60);
    var formatM = ('00' + m).slice(-2)
    var s = dur % 60;
    var formatS = ('00' + s).slice(-2)
    return `${formatH}:${formatM}:${formatS}`
}

export default VideoCard;
