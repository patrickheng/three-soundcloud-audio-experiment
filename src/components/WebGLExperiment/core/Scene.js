import Emitter from 'helpers/Emitter';
import AbstractScene from 'webgl/core/AbstractScene';

import LineEmitter from '../meshes/LineEmitter';
import BallEmitter from '../meshes/BallEmitter';
import BassShapeEmitter from '../meshes/BassShapeEmitter';
import MediumShapeEmitter from '../meshes/MediumShapeEmitter';

import { lights as lightsConfig } from 'config/webgl/home';
import findIndex from 'lodash.findindex';
import { MOUSE_DOWN, MOUSE_UP } from 'config/messages';

/**
 * Scene class
 */
class Scene extends AbstractScene {

  /**
   * constructor function
   */
  constructor( config, resources, audioAnalyser ) {

    super({
      camera: config.camera,
      renderer: config.renderer,
      postProcessing: config.postProcessing
    });

    this.config = config;
    this.resources = resources;
    this.audioAnalyser = audioAnalyser;
    this.audioData = audioAnalyser.audioData;

    this.mouseDownProgress = 0;
    this.cameraConfig = config.camera;

    this.camera.position.copy( this.cameraConfig.position );
    this.camera.lookAt( this.cameraConfig.target );

    this.bind();
    this.addListeners();
    this.generateTimelines();
    this.initLights();
    this.initMeshes();
  }

  bind() {

    [ 'handleMouseMove', 'onMouseUp', 'onMouseDown' ]
      .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addListeners() {

    Emitter.on( MOUSE_UP, this.onMouseUp );
    Emitter.on( MOUSE_DOWN, this.onMouseDown );

    this.renderer.domElement.addEventListener( 'mousemove', this.handleMouseMove, false );
  }

  generateTimelines() {

    const fishEyeIndex = findIndex( this.postProcessing.passes, { name: 'fishEyePass' });
    const RGBPassIndex = findIndex( this.postProcessing.passes, { name: 'RGBSplitPass' });
    const multiPassBloomPassIndex = findIndex( this.postProcessing.passes, { name: 'multiPassBloomPass' });
    const fishEyePass = this.postProcessing.constructors[ fishEyeIndex ];
    const RGBPass = this.postProcessing.constructors[ RGBPassIndex ];
    const multiPassBloomPass = this.postProcessing.constructors[ multiPassBloomPassIndex ];

    this.mouseDownTl = new TimelineMax( { paused: true });

    this.mouseDownTl
      .fromTo( fishEyePass.params, 1, { power: 0.9 }, { power: 0.7 }, 0 )
      .fromTo( multiPassBloomPass.params, 1, { blurAmount: 0.01, zoomBlurStrength: 1 }, { blurAmount: 3, zoomBlurStrength: 2 }, 0 )
      .fromTo( RGBPass.params.delta, 1, { x: 0, y: 0 }, { x: 100, y: 100 }, 0 )
      .to( this.camera.position, 1, { z: 350 }, 0 );
  }

  initLights() {

    this.ambientLight = new THREE.AmbientLight( lightsConfig.ambientLight.color, lightsConfig.ambientLight.intensity );
    this.add( this.ambientLight );
  }

  initMeshes() {

    this.lineEmitter = new LineEmitter( this.config.lineEmitter, this.resources );
    this.add( this.lineEmitter );

    this.ballEmitter = new BallEmitter( this.config.ballEmitter, this.resources );
    this.add( this.ballEmitter );

    this.bassShapeEmitter = new BassShapeEmitter( this.config.bassShapeEmitter, this.resources );
    this.add( this.bassShapeEmitter );

    this.mediumShapeEmitter = new MediumShapeEmitter( this.config.mediumShapeEmitter, this.resources );
    this.add( this.mediumShapeEmitter );
  }

  handleMouseMove(ev) {

    if ( this.cameraConfig.orbitControls ) return;

    this.mousePos = {
      x: - ( ev.pageX - this.width / 2 ) / ( this.width / 2 ),
      y: ( ev.pageY - this.height / 2 ) /  ( this.height / 2 )
    };

    this.camera.handleMouseMove( this.mousePos );
  }


  handleWindowResize({ width, height }) {
    this.width = width;
    this.height = height;

    this.camera.handleWindowResize({ width, height });
    this.renderer.handleWindowResize({ width, height });
    this.effectComposer.handleWindowResize({ width, height });
    this.lineEmitter.handleWindowResize({ width, height });
    this.ballEmitter.handleWindowResize({ width, height });
    this.bassShapeEmitter.handleWindowResize({ width, height });
    this.mediumShapeEmitter.handleWindowResize({ width, height });
  }

  onMouseDown() {

    this.renderer.setClearColor( 0x03060c, 1 );
    TweenMax.to( this, 2, { mouseDownProgress: 1, ease: Expo.easeOut, onUpdate: ()=> {
      this.mouseDownTl.progress( this.mouseDownProgress );
    }});
  }

  onMouseUp() {

    this.renderer.setClearColor( 0x010306, 1 );
    TweenMax.to( this, 0.3, { mouseDownProgress: 0, ease: Expo.easeOut, onUpdate: ()=> {
      this.mouseDownTl.progress( this.mouseDownProgress );
    }});
  }

  /**
   * render function
   */
  render() {

    this.preRender();

    this.audioAnalyser.sampleAudioData();
    this.audioData = this.audioData;

    this.lineEmitter.update( this.clock.time, this.audioData );
    this.ballEmitter.update( this.clock.time, this.audioData );
    this.bassShapeEmitter.update( this.clock.time, this.audioData );
    this.mediumShapeEmitter.update( this.clock.time, this.audioData );
  }

}

export default Scene;
