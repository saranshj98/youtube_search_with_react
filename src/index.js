//create a page with a component and it will produce some html.
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyByaMXvsQ8lowPQKykdNGe4nWbjvgk4NV8';

class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            videos : [],
            selectedVideo : null 
        } 

        this.videoSearch('surfboard')
    }

    videoSearch(term){
        YTSearch({ key : API_KEY, term : term}, (videos) => {
            this.setState({
                videos : videos,
                selectedVideo : videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 500);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}


//take this component's generated html and put it on the page.
ReactDom.render(<App />, document.querySelector('.container'));