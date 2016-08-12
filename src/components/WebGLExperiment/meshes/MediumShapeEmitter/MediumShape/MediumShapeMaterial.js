import shaderParse from 'utils/webgl/shader-parse';
import vertexShader from './shader/vert.glsl';
import fragmentShader from './shader/frag.glsl';

/**
 * MediumShapeMaterial class
 */
class MediumShapeMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( config ) {

    const defines = {};
    const baseShader = THREE.ShaderLib.phong;
    const baseUniforms = THREE.UniformsUtils.clone( baseShader.uniforms );

    const uniforms = THREE.UniformsUtils.merge( [
      baseUniforms,
      config.uniforms
    ]);

    const options = {
      fragmentShader: shaderParse( fragmentShader ),
      vertexShader: shaderParse( vertexShader ),
      defines: defines,
      uniforms: uniforms,
      ...config.options
    };


    super( options );

    this.needsUpdate = true;
    this.ampFactor = 1;
  }

  onMouseUp() {
    this.ampFactor = 1;
  }

  onMouseDown() {
    this.ampFactor = 30;
  }

  update( time, audioData ) {
    this.uniforms.u_time.value = time;

    if( typeof audioData !== 'undefined' ) {
      this.uniforms.u_amp.value = audioData.splitFreq[ 2 ] * this.ampFactor;
    }

  }
}

export default MediumShapeMaterial;
