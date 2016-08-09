import AbstractScene from 'webgl/core/AbstractScene';
import { lights as lightsConfig } from 'config/webgl/home';

/**
 * Scene class
 */
class Scene extends AbstractScene {

  /**
   * constructor function
   */
  constructor( config, audioAnalyser ) {

    super({
      camera: config.camera,
      renderer: config.renderer,
      postProcessing: config.postProcessing
    });

    this.audioData = audioAnalyser.audioData;
    this.audioAnalyser = audioAnalyser;

    this.progress = 0;
    this.cameraConfig = config.camera;

    this.camera.position.copy( this.cameraConfig.position );
    this.camera.lookAt( this.cameraConfig.target );

    this.addListeners();
    this.initLights();

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

  /**
   * render function
   */
  render() {

    this.preRender();

    this.audioAnalyser.sampleAudioData();
    this.audioData = this.audioAnalyser.audioData;
  }

  handleWindowResize({ width, height }) {
    this.width = width;
    this.height = height;

    this.camera.handleWindowResize({ width, height });
    this.renderer.handleWindowResize({ width, height });
    this.effectComposer.handleWindowResize({ width, height });
  }
}

export default Scene;
