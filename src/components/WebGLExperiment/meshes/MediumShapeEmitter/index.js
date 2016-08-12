import EmitterBase from '../EmitterBase';
import MediumShape from './MediumShape';
import MediumShapeMaterial from './MediumShape/MediumShapeMaterial';

class MediumShapeEmitter extends EmitterBase {

  constructor( config, resources ) {

    super( config, resources );

    this.particleMaterial = new MediumShapeMaterial( config.material );

    this.populate( config.poolSize );
    this.throw( config.throwNb );
  }

  populate( poolSize ) {

    for (let i = 0; i < poolSize; i++ ) {
      this.pool.push( new MediumShape( this.config, this.particleMaterial, this.resources ) );
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

    this.rotation.z -= ( audioData.splitFreq[ 3 ] );

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[ i ].update( time, audioData );
    }

    this.particleMaterial.update( time, audioData );
  }
}

export default MediumShapeEmitter;
