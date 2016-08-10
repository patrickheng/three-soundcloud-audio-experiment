import 'stylesheets/main.scss';
import 'gsap';
import domready from 'domready';
import AudioAnalyser from 'helpers/AudioAnalyser';
import SoundCloudLoader from 'helpers/SoundCloudLoader';

import LoaderComponent from 'components/Loader';
import AudioControlPanel from 'components/AudioControlPanel';
import WebGLExperiment from 'components/WebGLExperiment';
import AssetsLoader from 'helpers/AssetsLoader';

class Main {

  constructor() {

    this.bind();

    this.initLoader();
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

  initLoader() {

    this.loaderComponent = new LoaderComponent();
    
    this.assetLoader = AssetsLoader;
    this.resources = [];

    this.assetLoader
     .load()
     .then( resources => {

       resources.forEach( ({ id, resource }) => this.resources[ id ] = resource );

       this.start();
       this.addEventListeners();

     } );
  }

  start() {

    const root = document.querySelector( '#application' );

    this.player = document.createElement( 'audio' );

    this.trackForm = document.querySelector( '.player-form' );
    this.trackInput = document.querySelector( '.player-form__entry' );


    this.audioAnalyser = new AudioAnalyser( this.player );
    this.audioControlPanel = new AudioControlPanel( this.player );
    this.SCLoader = new SoundCloudLoader( this.player, this.audioControlPanel);

    this.webgl = new WebGLExperiment( root, this.resources, this.audioAnalyser );

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

    this.SCLoader.loadStream( url,
      ()=>{
        this.audioControlPanel.clearInfoPanel();
        this.audioAnalyser.play( this.SCLoader.streamUrl );
        this.audioControlPanel.update( this.SCLoader );
      },
      ()=>{

        this.loadTrack( 'https://soundcloud.com/alvan/amazone' );
      });
  }

  onKeyUp( ev ) {

    switch( ev.keyCode ) {
      case 32:
      // spacebar
        this.SCLoader.directStream( 'toggle' );
        break;
      case 37:
      // left key
        this.SCLoader.directStream( 'backward' );
        break;
      case 39:
      // right key
        this.SCLoader.directStream( 'forward' );
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
  }

}

domready(() => {

  new Main();
});
