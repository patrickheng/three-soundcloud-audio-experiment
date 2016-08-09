import shaderParse from 'utils/webgl/shader-parse';
import vertexShader from './shader/vert.glsl';
import fragmentShader from './shader/frag.glsl';
import { randomInt } from 'utils/maths';
import GUI from 'helpers/GUI';

/**
 * PlaneMaterial class
 */
class PlaneMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( materialConfig, video, bufferTexture ) {
    const defines = {};
    const baseShader = THREE.ShaderLib.phong;
    const baseUniforms = THREE.UniformsUtils.clone( baseShader.uniforms );
    const videoTexture = new THREE.VideoTexture( video );

    const uniforms = THREE.UniformsUtils.merge( [
      baseUniforms,
      {
        u_time: { type: 'f', value: 0.0 },
        u_speed: { type: 'f', value: 0.4, range: [ 0, 20 ] },
        u_amp: { type: 'f', value: 3.0, range: [ 0, 20 ]  }
      }
    ]);

    video.play();
    video.loop = true;

    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    uniforms.map.value = videoTexture;
    uniforms.alphaMap.value = bufferTexture.texture;
    // uniforms.normalMap.value = videoTexture;
    // uniforms.normalScale.value = new THREE.Vector2( 0.8, 0.8 );

    defines[ "USE_MAP" ] = "";
    defines[ "USE_ALPHAMAP" ] = "";

    const options = {
      fragmentShader: shaderParse( fragmentShader ),
      vertexShader: shaderParse( vertexShader ),
      defines: defines,
      uniforms: uniforms,
      lights: true,
      fog: false,
      side: THREE.FrontSide,
      blending: THREE.NormalBlending,
      transparent: true
    };

    super( options );

    this.noiseGlitchTimeout = null;

    this.defaultNoiseUniforms = {
      speed: this.uniforms.u_speed.value,
      amplitude: this.uniforms.u_amp.value
    };

    this.startNoiseGlitch();

    this.addGUI();
  }

  addGUI() {
    GUI.panel
      .addGroup({ label: 'Plane vertex', enable: false })
        .addSlider( this.uniforms.u_speed, 'value', 'range', { label: 'Speed' })
        .addSlider( this.uniforms.u_amp, 'value', 'range', { label: 'Amplitude' });
  }

  startNoiseGlitch() {
    clearTimeout( this.noiseGlitchInterval );

    this.noiseGlitchTimeout = setTimeout(()=>{

      this.defaultNoiseUniforms.speed = this.uniforms.u_speed.value;
      this.defaultNoiseUniforms.amplitude = this.uniforms.u_amp.value;

      this.uniforms.u_speed.value = randomInt(5, 20);
      this.uniforms.u_amp.value = randomInt(5, 20);

      setTimeout(()=> {
        this.uniforms.u_speed.value = this.defaultNoiseUniforms.speed;
        this.uniforms.u_amp.value = this.defaultNoiseUniforms.amplitude;

        this.startNoiseGlitch();
      }, randomInt(0, 400));

    }, randomInt(1000, 10000));
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.uniforms.u_time.value = time;
  }
}

export default PlaneMaterial;
