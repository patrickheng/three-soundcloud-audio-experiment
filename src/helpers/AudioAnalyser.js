'use strict';

/**
* AudioAnalyser class
* Audio Analyser wrapper for html5 audio API
* Author: @patrickheng
*/

class AudioAnalyser {

  constructor( player ) {

    this.player = player;

    this.audioCtx = new ( window.AudioContext || window.webkitAudioContext );
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    this.audioData = new Uint8Array( 128 );

    this.source = this.audioCtx.createMediaElementSource( this.player );
    this.source.connect( this.analyser );
    this.analyser.connect( this.audioCtx.destination );
  }

  sampleAudioData() {

    this.analyser.getByteFrequencyData( this.audioData );
  }

  play( url ) {

    this.player.crossOrigin = true;
    this.player.src = url;
    this.player.play();
  }
}

export default AudioAnalyser;
