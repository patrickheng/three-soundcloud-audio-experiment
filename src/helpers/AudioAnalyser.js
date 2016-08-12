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

    this.gainNode = this.audioCtx.createGain();
    this.bqFilter = this.audioCtx.createBiquadFilter();
    this.bqFilter.type = 'lowpass';
    /* eslint-disable */
    this. bqFilter.frequency.value = 10000;
    /* eslint-enable */

    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;

    this.splitFreqNb = 4;

    this.audioData = {
      freq: new Uint8Array( 128 ),
      splitFreq: [],
      beat: []
    };

    this.source = this.audioCtx.createMediaElementSource( this.player );

    this.source.connect( this.bqFilter );
    this.bqFilter.connect( this.gainNode );
    this.gainNode.connect( this.analyser );
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
    this.getAverageFreqArray();
  }

  splitFrenquencyArray( arr, n ) {

    const tab = Object.keys(arr).map( ( key ) => {
      return arr[key];
    });

    const len = tab.length;
    const result = [];
    let i = 0;

    while ( i < len ) {
      const size = Math.ceil((len - i) / n--);
      result.push(tab.slice(i, i + size));
      i += size;
    }
    return result;
  }

  getAverageFreqArray() {

    let frequencyArray = this.splitFrenquencyArray( this.audioData.freq,
      this.splitFreqNb );

    // Make average of frenquency array entries
    for (let i = 0; i < frequencyArray.length; i++) {
      let average = 0;

      for (let j = 0; j < frequencyArray[i].length; j++) {
        average += frequencyArray[i][j];
      }

      this.audioData.splitFreq[ i ] = average / frequencyArray[ i ].length;
    }
  }

  play( url ) {

    this.player.crossOrigin = true;
    this.player.src = url;
    this.player.play();
    this.detectBeat();
    this.player.playbackRate = 1;
  }
}

export default AudioAnalyser;
