import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Videos from './Videos';


class SearchArea extends Component {
    static propType = {
        searchResultVideos: PropTypes.array.isRequired,
        searchHandler: PropTypes.func.isRequired,
        videoChooseHandler: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        };
    }

    searchHandler = (event) => {
        this.props.searchHandler(this.state.searchText)
    }

    textChangeHandler = (event, newValue) => {
        this.setState({searchText: newValue});
    }


    render() {
        return (
            <Paper style={{height: 600, width:400}}>
                <Paper className="search-box" style={{ display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}> 
                    <TextField
                        id="text-field-controlled"
                        value={this.state.searchText}
                        onChange={this.textChangeHandler}
                        style={{width: "80%", marginTop: 10, marginBottom: -1}}/>
                    <RaisedButton label="Search" onClick={this.searchHandler} style={{width:"20%", margin: 12, marginRight: 0}} />
                </Paper>
                <div style={{height: 580}}>
                    <Videos videoList={this.props.searchResultVideos} videoClickHandler={this.props.videoChooseHandler}/>
                </div>
            </Paper>
        );
    }
}

export default SearchArea;
