import React from "react";
import youtube from "../api/youtube";
import SearchBar from "./SearchBar";
import VideosList from "./VideosList";
import VideoDetail from "./VideoDetail";

class App extends React.Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onFormSubmit("buildings ");
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  onFormSubmit = async (term) => {
    const res = await youtube.get("/search", {
      params: {
        q: term,
      },
    });
    // console.log(res.data.items);
    this.setState({
      videos: res.data.items,
      selectedVideo: res.data.items[0],
    });
  };
  render() {
    return (
      <div className="ui container">
        <SearchBar onSubmit={this.onFormSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideosList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
