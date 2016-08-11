import BallMaterial from './BallMaterial';
import 'utils/webgl/ConstantSpline';
import 'utils/webgl/MeshLine';

import { parabola, randomInt, randomFloat } from 'utils/maths';


/**
* Ball class
*/
class Ball {

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
    this.velocity = randomFloat( 0 , 1 );

    this.makeLine( new THREE.SphereGeometry( randomInt( 1 , 20 ), 32, 32 ) );
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

    this.matManager = new BallMaterial( this.resources );
    this.mesh = new THREE.Mesh( g.geometry, this.matManager.material );

  }

  reset() {
    this.mesh.position.x = randomInt( -200, 200 );
    this.mesh.position.y = randomInt( -200, 200 );
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
    const scaleVal = ( this.audioData.beat ) ? this.audioData.beat / 80 : 0.00001;
    this.mesh.scale.set( scaleVal, scaleVal, scaleVal );

    if( this.mesh.position.z >= 1000 )
      this.isAlive = false;

  }
}

export default Ball;
