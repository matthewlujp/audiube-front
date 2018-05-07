import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import videoCard from './VideoCard'
import VideoCard from './VideoCard';

class Videos extends Component {
    static propType = {
        videoList: PropTypes.array.isRequired,
        videoClickHandler: PropTypes.func.isRequired,
    }

    render() {
        const videoCards = this.props.videoList.map((video) => 
            <VideoCard key={video.id} video={video} clickHandler={this.props.videoClickHandler} />
        );

        return (
            <List style={{ maxHeight: '100%', overflow: 'auto', paddingTop: 0}}>
                {videoCards}
            </List>
        );
    }
}

export default Videos;
