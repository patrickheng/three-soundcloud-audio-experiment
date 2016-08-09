import 'stylesheets/main.scss';
import 'gsap';
import domready from 'domready';
import AudioAnalyser from 'helpers/AudioAnalyser';
import SoundCloudLoader from 'helpers/SoundCloudLoader';

import AudioControlPanel from 'components/AudioControlPanel';
import WebGLExperiment from 'components/WebGLExperiment';

class Main {

  constructor() {

    this.bind();

    this.start();

    this.addEventListeners();
  }

  bind() {

    [ 'onKeyUp', 'onFormSubmit', 'onPlayerTimeUpdate' ]
      .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    document.addEventListener( 'keyup', this.onKeyUp, false );

    this.trackForm.addEventListener( 'submit', this.onFormSubmit, false );

    this.player.addEventListener( 'timeupdate', this.onPlayerTimeUpdate, false );
  }

  start() {

    const root = document.querySelector( '#application' );

    this.player = document.createElement( 'audio' );

    this.trackForm = document.querySelector( '.player-form' );
    this.trackInput = document.querySelector( '.player-form__entry' );


    this.audioAnalyser = new AudioAnalyser( this.player );
    this.audioControlPanel = new AudioControlPanel( this.player );
    this.loader = new SoundCloudLoader( this.player, this.audioControlPanel);

    this.webgl = new WebGLExperiment( root, this.audioAnalyser );

    if ( window.location.hash ) {
      const trackUrl = 'https://soundcloud.com/' + window.location.hash.substr(1);
      this.loadTrack( trackUrl );
    } else {
      setTimeout( ()=>{
        this.loadTrack( 'https://soundcloud.com/alvan/amazone' );
      }, 500 );
    }
  }

  loadTrack( url ) {

    this.loader.loadStream( url,
      ()=>{
        this.audioControlPanel.clearInfoPanel();
        this.audioAnalyser.play( this.loader.streamUrl );
        this.audioControlPanel.update( this.loader );
      },
      ()=>{
        /* eslint-disable */
        console.warn( 'Error : ', this.loaderMessage );

        this.loadTrack( 'https://soundcloud.com/alvan/amazone' );
        /* eslint-enable */
      });
  }

  onKeyUp( ev ) {

    switch( ev.keyCode ) {
      case 32:
      // spacebar
      this.loader.directStream( 'toggle' );
        break;
      case 37:
      // left key
      this.loader.directStream( 'backward' );
        break;
      case 39:
      // right key
      this.loader.directStream( 'forward' );
        break;
    }
  }

  onFormSubmit( ev ) {
    ev.preventDefault();
    const trackUrl = this.trackInput.value;
    this.loadTrack( trackUrl );
  }

  onPlayerTimeUpdate() {
    this.audioControlPanel.timecodeUpdate();
    this.audioAnalyser.sampleAudioData();
  }

}

domready(() => {

  new Main();
});
