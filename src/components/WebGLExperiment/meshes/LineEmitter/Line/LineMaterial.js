import { randomInt, randomFloat } from 'utils/maths';

/**
* LineMaterial class
*/
class LineMaterial {

  constructor( config, resources ) {

    const textureList = [ 'stroke', 'zigzag', 'sinwave', 'nawakpaint' ];
    const map = resources[ textureList[ randomInt( 0, textureList.length - 1 ) ] ];

    this.lineWidth = randomFloat( 0 , 5 );

    this.params = {
      map,
      resolution: new THREE.Vector2( window.innerWidth, window.innerHeight ),
      lineWidth: this.lineWidth,
      ...config
    }

    this.material = new THREE.MeshLineMaterial( this.params );
  }

  handleWindowResize( { width, height }) {
    this.material.uniforms.resolution.value.set( width, height );
  }

  update( time, audioData, index ) {
    this.material.uniforms.lineWidth.value = this.lineWidth * ( 1 + .5 * Math.sin( 4 * time + index ) );
  }
}

export default LineMaterial;
