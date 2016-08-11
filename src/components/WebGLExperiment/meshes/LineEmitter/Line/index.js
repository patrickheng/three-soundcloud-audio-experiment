import LineMaterial from './LineMaterial';
import 'utils/webgl/ConstantSpline';
import 'utils/webgl/MeshLine';

import { parabola, randomInt, randomFloat } from 'utils/maths';


/**
* Line class
*/
class Line {

  /**
  * Constructor function
  * @param {Object} configuration Configuration
  */
  constructor( config, resources ) {

    this.mesh = null;

    this.config = config;
    this.resources = resources;
    this.audioData = null;

    this.isAlive = true;
    this.velocity = randomFloat( 0 , 0.3 );

    this.makeLine( this.createCurve() );
  }

  createCurve() {

    const s = new THREE.ConstantSpline();
    const rMin = 300;
    const rMax = 600;

    s.inc = .001;
    s.p0 = new THREE.Vector3( 0, 0, 0 );
    s.p0.set( .5 - Math.random(), .5 - Math.random(), .5 - Math.random() );
    s.p1 = s.p0.clone().add( new THREE.Vector3( .5 - Math.random(), .5 - Math.random(), .5 - Math.random() ) );
    s.p2 = s.p1.clone().add( new THREE.Vector3( .5 - Math.random(), .5 - Math.random(), .5 - Math.random() ) );
    s.p3 = s.p2.clone().add( new THREE.Vector3( .5 - Math.random(), .5 - Math.random(), .5 - Math.random() ) );
    // s.p0.multiplyScalar( rMin + Math.random() * rMax );
    s.p0.multiplyScalar( rMin + Math.random() * rMax );
    s.p1.multiplyScalar( rMin + Math.random() * rMax );
    s.p2.multiplyScalar( rMin + Math.random() * rMax );
    s.p3.multiplyScalar( rMin + Math.random() * rMax );

    s.calculate();
    const geometry = new THREE.Geometry();
    s.calculateDistances();
    s.reticulate( { steps: 500 } );

    for( let j = 0; j < s.lPoints.length - 1; j++ ) {
      geometry.vertices.push( s.lPoints[ j ].clone() );
    }

    return geometry;
  }

  makeLine( geo ) {

    const g = new THREE.MeshLine();
    const lineType = this.config.geometry.type;

    switch( lineType ) {

      case 'none': g.setGeometry( geo ); break;
      case 'linear': g.setGeometry( geo, function( p ) { return 1 - p; } ); break;
      case 'parabolic': g.setGeometry( geo, function( p ) { return 1 * parabola( p, 1 ); } ); break;
      case 'wavy': g.setGeometry( geo, function( p ) { return 2 + Math.sin( 50 * p ); } ); break;
    }

    this.matManager = new LineMaterial( this.resources );
    this.mesh = new THREE.Mesh( g.geometry, this.matManager.material );

  }

  reset() {
    this.mesh.position.z = randomInt( -4000, -2000 );
    this.isAlive = true;
  }

  handleWindowResize({ width, height }) {
    this.matManager.handleWindowResize({ width, height });
  }

  update( time, audioData, i ) {

    if( !this.isAlive ) return;

    this.audioData = audioData;
    this.matManager.update( time, this.audioData, i );
    this.mesh.position.z += this.audioData.beat * this.velocity;

    if( this.mesh.position.z >= 1000 )
      this.isAlive = false;
  }

}

export default Line;
