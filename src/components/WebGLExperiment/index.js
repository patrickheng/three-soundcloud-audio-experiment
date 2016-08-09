import Scene from './core/Scene';

import { home as homeConfig } from 'config/webgl';

class WebGLExperiment {

  constructor( root, audioAnalyser ) {

    this.root = root;
    this.audioAnalyser = audioAnalyser;

    this.bind();

    this.addEventListeners();

    this.start();
  }

  bind() {

    this.onWindowResize = ::this.onWindowResize;
  }

  addEventListeners() {

    window.addEventListener( 'resize', this.onWindowResize, false );
  }

  start() {

    this.scene = new Scene( homeConfig, this.audioAnalyser );
    this.sceneDomEl = this.scene.renderer.domElement;
    this.root.appendChild( this.sceneDomEl );
  }

  onWindowResize() {
    this.scene.handleWindowResize({ width: window.innerWidth, height: window.innerHeight });
  }
}

export default WebGLExperiment;
