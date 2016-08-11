import AbstractScene from 'webgl/core/AbstractScene';
import LineEmitter from '../meshes/LineEmitter';
import BallEmitter from '../meshes/BallEmitter';
import { lights as lightsConfig } from 'config/webgl/home';

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

    this.progress = 0;
    this.cameraConfig = config.camera;

    this.camera.position.copy( this.cameraConfig.position );
    this.camera.lookAt( this.cameraConfig.target );

    this.addListeners();
    this.initLights();
    this.initMeshes();

  }

  addListeners() {
    this.handleMouseMove = ::this.handleMouseMove;

    this.renderer.domElement.addEventListener( 'mousemove', this.handleMouseMove, false );
  }

  handleMouseMove(ev) {

    if ( this.cameraConfig.orbitControls ) return;

    this.mousePos = {
      x: - ( ev.pageX - this.width / 2 ) / ( this.width / 2 ),
      y: ( ev.pageY - this.height / 2 ) /  ( this.height / 2 )
    };

    this.camera.handleMouseMove( this.mousePos );
  }

  initLights() {

    this.ambientLight = new THREE.AmbientLight( lightsConfig.ambientLight.color, lightsConfig.ambientLight.intensity );
    this.add( this.ambientLight );
  }

  initMeshes() {

    const geometry = new THREE.SphereGeometry( 5, 32, 32 );
    const material = new THREE.MeshBasicMaterial( { color: 0x444444, wireframe: true } );
    this.sphere = new THREE.Mesh( geometry, material );
    // this.add( this.sphere );


    this.lineEmitter = new LineEmitter( this.config.lineEmitter, this.resources );
    this.add( this.lineEmitter );

    this.ballEmitter = new BallEmitter( this.config.ballEmitter, this.resources );
    this.add( this.ballEmitter );
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

    this.sphere.scale.set( this.audioData.beat / 20, this.audioData.beat / 20, this.audioData.beat / 20 );

    this.sphere.position.z = Math.sin( this.clock.elapsedTime ) * 10;
    this.sphere.position.x = -Math.cos( this.clock.elapsedTime ) * 10;
    this.sphere.position.y = Math.cos( this.clock.elapsedTime ) * 10;
  }

  handleWindowResize({ width, height }) {
    this.width = width;
    this.height = height;

    this.camera.handleWindowResize({ width, height });
    this.renderer.handleWindowResize({ width, height });
    this.effectComposer.handleWindowResize({ width, height });
    this.lineEmitter.handleWindowResize({ width, height });
  }
}

export default Scene;
