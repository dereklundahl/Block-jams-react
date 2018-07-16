import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

  const playButton = <ion-icon name="play-circle"></ion-icon>;

  const pauseButton = <ion-icon name="pause"></ion-icon>;

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state = {
    album: album,
    currentSong: album.songs[0],
    isPlaying: false,
    displayButton: playButton
  };
  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc
}

play() {
  this.audioElement.play();
  this.setState({ isPlaying: true });
  this.setState({ displayButton: pauseButton });
}

pause() {
  this.audioElement.pause();
  this.setState({ isPlaying: false });
  //this.setState({ displayButton: playButton });
}

setSong(song) {
  this.audioElement.src = song.audioSrc;
  this.setState({ currentSong: song });
}

handleSongClick(song) {
  const isSameSong = this.state.currentSong === song;
  if (this.state.isPlaying && isSameSong) {
    this.pause();
  } else {
    if (!isSameSong) { this.setSong(song); }
    this.play();
  }
}

handleMouseEnter(song) {
  console.log("the mouse has entered");
}

handleMouseLeave(song) {
  console.log("the mouse has left");
}

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.year} {this.state.album.label}</div>
          </div>
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-culumn" />
           </colgroup>
           <tbody>

             {
               this.state.album.songs.map( (song, index) =>
                 <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleMouseEnter(song)} onMouseLeave={() => this.handleMouseLeave(song)} >
                   <td>{this.state.displayButton}</td>
                   <td>{index + 1}</td>
                   <td>{song.title}</td>
                   <td>{song.duration}</td>
                 </tr>
               )
             }
           </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
