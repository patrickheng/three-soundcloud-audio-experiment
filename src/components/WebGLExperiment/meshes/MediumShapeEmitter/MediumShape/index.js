import MediumShapeGeometry from './MediumShapeGeometry';
import { randomInt, randomFloat } from 'utils/maths';
/**
 * BassShape class
 */
class BassShape {

  /**
   * Constructor function
   * @param {Object} configuration Configuration
   */
  constructor( { geometry }, material ) {

    this.mesh = new THREE.Mesh( new MediumShapeGeometry( geometry ), material );

    this.isAlive = true;
    this.baseVelocity= randomFloat( 0 , 0.2 );
    this.velocity = this.baseVelocity;
  }

  reset() {
    this.velocity = this.baseVelocity;
    this.mesh.position.x = randomInt( -800, 800);
    this.mesh.position.y = randomInt( -800, 800);
    this.mesh.position.z = randomInt( -3000, -1500);
    this.isAlive = true;
  }

  handleWindowResize() {
  }

  onMouseDown() {
  }

  onMouseUp() {
  }

  update( time, audioData ) {

    if( !this.isAlive ) return;

    this.mesh.position.z += ( audioData.beat ) * this.velocity;

    if( this.mesh.position.z >= 1000 )
      this.isAlive = false;

  }
}

export default BassShape;
