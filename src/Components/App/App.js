import React, { Component } from 'react';
import './App.css';
import PlayList from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);
     this.state = {
      searchResults: [],
      playlistName: 'Playlist',
      playlistTracks: []
     }; 

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
    } else {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
    console.log(track);
  };

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    const newTracks = tracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({ playlistTracks: newTracks });
    console.log(newTracks);
  };

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  };
//write to console
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    const listName = this.state.playlistName;
    Spotify.savePlaylist(listName, trackURIs)
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
    console.log(listName, trackURIs);
  };

  search(term) {
    Spotify.search(term)
      .then(tracks => {
        this.setState({ searchResults: tracks });
      });
    console.log(term);
  };


  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} onRemove={this.removeTrack} />
            <PlayList
              playlistName={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onSearch={this.search}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
