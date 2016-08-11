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

    this.audioData = {
      freq: new Uint8Array( 128 ),
      beat: []
    };

    this.source = this.audioCtx.createMediaElementSource( this.player );
    this.source.connect( this.analyser );
    this.analyser.connect( this.audioCtx.destination );
  }

  detectBeat() {

    const detect = beats({
      lo: 0,
      hi: 128,
      threshold: 0,
      decay: 0.005
    });

    this.audioData.beat = detect( this.audioData.freq );
  }

  sampleAudioData() {
    this.analyser.getByteFrequencyData( this.audioData.freq );
    this.detectBeat();
  }

  play( url ) {

    this.player.crossOrigin = true;
    this.player.src = url;
    this.player.play();
    this.detectBeat();
    TweenMax.to( this.player, 0.3, { playbackRate : 1, ease: Expo.easeOut });
  }
}

export default AudioAnalyser;
