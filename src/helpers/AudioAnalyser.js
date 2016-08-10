'use strict';

import beats from 'beats';

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
    this.audioFrequencies = new Uint8Array( 128 );
    this.bpm = 0;

    this.source = this.audioCtx.createMediaElementSource( this.player );
    this.source.connect( this.analyser );
    this.analyser.connect( this.audioCtx.destination );
  }

  detectBeat() {

    this.detect = beats({
      lo: 0,
      hi: 128,
      threshold: 0,
      decay: 0.005
    });

    this.beat = this.detect( this.audioFrequencies );
  }

  sampleAudioData() {
    this.analyser.getByteFrequencyData( this.audioFrequencies );
    this.detectBeat();
  }

  play( url ) {

    this.player.crossOrigin = true;
    this.player.src = url;
    this.player.play();
    this.detectBeat();
  }
}

export default AudioAnalyser;
