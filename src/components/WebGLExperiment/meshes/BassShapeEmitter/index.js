import EmitterBase from '../EmitterBase';
import BassShape from './BassShape';
import BassShapeMaterial from './BassShape/BassShapeMaterial';

class BassShapeEmitter extends EmitterBase {

  constructor( config, resources ) {
    super( config, resources );

    this.particleMaterial = new BassShapeMaterial( config.material );

    this.populate( config.poolSize );
    this.throw( config.throwNb );
  }

  populate( poolSize ) {

    for (let i = 0; i < poolSize; i++ ) {
      this.pool.push( new BassShape( this.config, this.particleMaterial, this.resources ) );
    }
  }

  onMouseDown() {

    this.particleMaterial.onMouseDown();
  }

  onMouseUp() {
    
    this.particleMaterial.onMouseUp();
  }


  update( time, audioData ) {

    super.update( time, audioData );

    this.rotation.z += audioData.splitFreq[ 1 ] / 80000 + audioData.splitFreq[ 3 ];

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[ i ].update( time, audioData );
    }

    this.particleMaterial.update( time, audioData );
  }
}

export default BassShapeEmitter;
