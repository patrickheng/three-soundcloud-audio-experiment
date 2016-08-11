/* eslint-disable */

import { randomInt, randomFloat } from 'utils/maths';

/**
* LineMaterial class
*/
class LineMaterial {

	constructor( resources ) {

		const strokesEnabled = true;
		const textureList = [ 'stroke', 'zigzag', 'sinwave', 'nawakpaint' ];
		const map = resources[ textureList[ randomInt( 0, textureList.length - 1 ) ] ];

		this.lineWidth = randomFloat( 0 , 5 );

    this.params = {
			map,
			useMap: true,
			color: new THREE.Color( 0xdddddd ),
			opacity: strokesEnabled ? 0.5 : 1,
			dashArray: new THREE.Vector2( 0, 0 ),
			resolution: new THREE.Vector2( window.innerWidth, window.innerHeight ),
			sizeAttenuation: true,
			lineWidth: this.lineWidth,
			near: 1,
			far: 2000,
			depthTest: !strokesEnabled.strokes,
			blending: THREE.NormalBlending,
			transparent: strokesEnabled,
			side: THREE.DoubleSide
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

/* eslint-enable */
