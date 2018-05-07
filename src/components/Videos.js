import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
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
            <List style={{ height: '100%', maxHeight: '95%', overflow: 'scroll', paddingTop: 0}}>
                {videoCards}
            </List>
        );
    }
}

export default Videos;
