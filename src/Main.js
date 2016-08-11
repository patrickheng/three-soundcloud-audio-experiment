import 'stylesheets/main.scss';
import 'gsap';

import domready from 'domready';
import Emitter from 'helpers/Emitter';
import AssetsLoader from 'helpers/AssetsLoader';
import AudioAnalyser from 'helpers/AudioAnalyser';
import SoundCloudLoader from 'helpers/SoundCloudLoader';

import LoaderComponent from 'components/Loader';
import AudioControlPanel from 'components/AudioControlPanel';
import WebGLExperiment from 'components/WebGLExperiment';

import { MOUSE_DOWN, MOUSE_UP } from 'config/messages';

class Main {

  constructor() {

    this.bind();

    this.initLoader();
  }

  bind() {

    [ 'onKeyUp', 'onFormSubmit', 'onPlayerTimeUpdate', 'onMouseDown', 'onMouseUp' ]
      .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    document.addEventListener( 'keyup', this.onKeyUp, false );
    document.addEventListener( 'mousedown', this.onMouseDown, false );
    document.addEventListener( 'mouseup', this.onMouseUp, false );
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

     } );
  }

  start() {

    const root = document.querySelector( '#application' );

    this.player = document.createElement( 'audio' );
    this.trackForm = document.querySelector( '.player-form' );
    this.trackInput = document.querySelector( '.player-form__entry' );


    this.defaultTrack = 'https://soundcloud.com/alvan/amazone';
    this.playRateProgress = 1;

    this.audioAnalyser = new AudioAnalyser( this.player );
    this.audioControlPanel = new AudioControlPanel( this.player );
    this.SCLoader = new SoundCloudLoader( this.player, this.audioControlPanel);

    this.webgl = new WebGLExperiment( root, this.resources, this.audioAnalyser );

    this.detectHash();
    this.generateTimelines();
    this.addEventListeners();
  }

  generateTimelines() {

    this.playbackRateTl = new TimelineMax( { paused: true } );

    this.playbackRateTl
      .fromTo( this.player, 1, { playbackRate: 1 }, { playbackRate: 0.5 } );
  }

  detectHash() {

    if ( window.location.hash ) {
      const trackUrl = 'https://soundcloud.com/' + window.location.hash.substr(1);
      this.loadTrack( trackUrl );
    } else {
      setTimeout( ()=>{
        this.loadTrack( this.defaultTrack );
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

        this.loadTrack( this.defaultTrack );
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

  onMouseDown() {

    Emitter.emit( MOUSE_DOWN, this.playRateProgress );

    TweenMax.to( this, 0.5, { playRateProgress: 1, ease: Expo.easeOut, onUpdate: ()=> {
      this.playbackRateTl.progress( this.playRateProgress );
    }});
  }

  onMouseUp() {

    Emitter.emit( MOUSE_UP, this.playRateProgress );

    TweenMax.to( this, 0.3, { playRateProgress: 0, ease: Expo.easeOut, onUpdate: ()=> {
      this.playbackRateTl.progress( this.playRateProgress );
    }});
  }

}

domready(() => {

  new Main();
});
