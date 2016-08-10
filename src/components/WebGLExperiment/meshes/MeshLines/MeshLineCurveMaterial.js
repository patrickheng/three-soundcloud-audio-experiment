/* eslint-disable */

/**
* MeshLineMaterial class
*/
class MeshLineMaterial {

	constructor( resources ) {

		const strokesEnabled = true;

		this.lineWidth = 10;

    this.params = {
			map: resources.stroke,
			useMap: true,
			color: new THREE.Color( 0xdddddd ),
			opacity: strokesEnabled ? .1 : 1,
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

  update( time, index ) {
  	this.material.uniforms.lineWidth.value = this.lineWidth * ( 1 + .5 * Math.sin( 2 * time + index ) );
  }
}

export default MeshLineMaterial;

/* eslint-enable */
