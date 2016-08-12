/* eslint-disable */

import { randomInt, randomFloat } from 'utils/maths';

/**
* MeshLineMaterial class
*/
class BallMaterial {

	constructor( config, resources ) {

		const textureList = [ 'stroke', 'zigzag', 'sinwave', 'nawakpaint' ];

		const map = resources[ textureList[ randomInt( 0, textureList.length - 1 ) ] ];
		this.lineWidth = randomFloat( 0 , 1 );

    this.params = {
			map,
			resolution: new THREE.Vector2( window.innerWidth, window.innerHeight ),
			lineWidth: this.lineWidth,
			...config
		}

		this.canUpdate = false;
		this.material = new THREE.MeshLineMaterial( this.params );
	}

	handleWindowResize( { width, height }) {
		this.material.uniforms.resolution.value.set( width, height );
	}

  update( time, index ) {
		if( !this.canUpdate ) return;
  	this.material.uniforms.lineWidth.value = this.lineWidth * ( 1 + .5 * Math.sin( 2 * time + index ) );
  }
}

export default BallMaterial;

/* eslint-enable */
