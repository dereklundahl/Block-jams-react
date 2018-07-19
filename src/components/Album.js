import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state = {
    album: album,
    currentSong: album.songs[0],
    isPlaying: false,
    isHovered: null


  };
  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc
  this.handleDisplayButton = this.handleDisplayButton.bind(this);
}

play() {
  this.audioElement.play();
  this.setState({ isPlaying: true });
}

pause() {
  this.audioElement.pause();
  this.setState({ isPlaying: false });
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

handleDisplayButton(song, index) {
  let pauseButton = <ion-icon name="pause"></ion-icon>;
  let playButton = <ion-icon name="play-circle"></ion-icon>;
  if(song === this.state.currentSong && this.state.isPlaying) {
    return pauseButton;
  } else if (song === this.state.currentSong && !this.state.isPlaying) {
    return playButton;
  } else if(song !== this.state.currentSong && this.state.isHovered !== song) {
    return index + 1;
  } else if(song !== this.state.currentSong && this.state.isHovered === song) {
    return playButton;
  } else return index + 1;
}

handleMouseEnter(song) {
  this.setState({ isHovered: song });
}

handleMouseLeave(song) {
  this.setState({ isHovered: null });
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
                   <td>{this.handleDisplayButton(song, index)}</td>
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
