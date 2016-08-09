import './styles.scss';

/**
* AudioControlPanel class
* Based on https://github.com/michaelbromley/soundcloud-visualizer by @michaelbromley
* Improved and written in ES2015 by @patrickheng
*/

class AudioControlPanel {

  constructor( player ) {

    this.player = player;

    this.$el = document.querySelector('.audio-control-panel');

    this.$els = {
      controlPanel: this.$el,
      pannelBal: this.$el.querySelector( '.audio-control-panel__bar' ),
      trackInfoPanel: this.$el.querySelector( '.track-info' ),
      infoImage: this.$el.querySelector( '.track-info__image' ),
      infoArtist: this.$el.querySelector( '.track-info__artist' ),
      infoTrack: this.$el.querySelector( '.track-info__title' ),
      infoTimer: this.$el.querySelector( '.track-info__timer' ),
      progress: this.$el.querySelector( '.track-info__progress' ),
      progressBar: this.$el.querySelector( '.track-info__progress-bar' )
    };

    this.isOpen = false;

    this.bind();
    this.addEventListeners();

    this.toggleControlPanel();

  }

  bind() {

    [ 'onProgressClick', 'onPannelBarClick' ]
      .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    this.$els.progress.addEventListener( 'click', this.onProgressClick, false );

    this.$els.pannelBal.addEventListener( 'click', this.onPannelBarClick, false );
  }

  clearInfoPanel() {
    this.$els.infoArtist.innerHTML = "";
    this.$els.infoTrack.innerHTML = "";
  }

  update( loader ) {

    const artistLink = document.createElement('a');
    artistLink.setAttribute('href', loader.sound.user.permalink_url);
    artistLink.innerHTML = loader.sound.user.username;

    const trackLink = document.createElement('a');
    trackLink.setAttribute('href', loader.sound.permalink_url);

    if ( loader.sound.kind === "playlist" ){
      trackLink.innerHTML = "<p>" + loader.sound.tracks[loader.streamPlaylistIndex].title + "</p>" + "<p>"+loader.sound.title+"</p>";
    } else {
      trackLink.innerHTML = loader.sound.title;
    }

    const image = loader.sound.artwork_url ? loader.sound.artwork_url : loader.sound.user.avatar_url;

    this.$els.infoImage.setAttribute( 'src', image );

    this.$els.infoArtist.innerHTML = '';
    this.$els.infoArtist.appendChild( artistLink );

    this.$els.infoTrack.innerHTML = '';
    this.$els.infoTrack.appendChild( trackLink );

    const trackToken = loader.sound.permalink_url.substr(22);
    window.location = '#' + trackToken;
  }

  timecodeUpdate() {

    this.$els.infoTimer.innerHTML = this.formatTimer( this.player.currentTime ) + ' / ' + this.formatTimer( this.player.duration );

    this.$els.progressBar.style.transform = `scaleX(${ this.player.currentTime / this.player.duration })`;
  }

  formatTimer( seconds ) {
    let minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;

    return minutes + ":" + seconds;
  }

  toggleControlPanel() {

    if( this.isOpen ) {

      TweenMax.to( this.$el, 1, { y: '100%', ease: Expo.easeOut, onComplete: ()=> {
        this.isOpen = false;
      }} );
    } else {

      TweenMax.to( this.$el, 1, { y: '0%', ease: Expo.easeOut, onComplete: ()=> {
        this.isOpen = true;
      }} );
    }

  }

  onProgressClick( ev ) {
    const width = this.$els.progress.clientWidth;
    const normProgress = ev.offsetX / width;

    this.player.currentTime = normProgress * this.player.duration;

    this.timecodeUpdate();
  }

  onPannelBarClick() {

    this.toggleControlPanel();
  }
}

export default AudioControlPanel;
