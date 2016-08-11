/* eslint-disable */

import { randomInt, randomFloat } from 'utils/maths';

/**
* MeshLineMaterial class
*/
class BallMaterial {

	constructor( resources ) {

		const textureList = [ 'stroke', 'zigzag', 'sinwave', 'nawakpaint' ];

		const strokesEnabled = true;
		const map = resources[ textureList[ randomInt( 0, textureList.length - 1 ) ] ];
		this.lineWidth = randomFloat( 0 , 1 );

    this.params = {
			map,
			useMap: true,
			color: new THREE.Color( 0xcccccc ),
			opacity: strokesEnabled ? .5 : 1,
			dashArray: new THREE.Vector2( 0, 0 ),
			resolution: new THREE.Vector2( window.innerWidth, window.innerHeight ),
			sizeAttenuation: false,
			lineWidth: this.lineWidth,
			near: 1,
			far: 2000,
			depthTest: !strokesEnabled.strokes,
			blending: THREE.NormalBlending,
			transparent: strokesEnabled,
			side: THREE.DoubleSide
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
