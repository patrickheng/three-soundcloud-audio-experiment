import EmitterBase from '../EmitterBase';
import Line from './Line';

class LineEmitter extends EmitterBase {

  constructor( config, resources ) {
    super( config, resources );

    this.populate( Line, config.poolSize );
    this.throw( config.throwNb );
  }

  onMouseDown() {

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[ i ].onMouseDown();
    }
  }

  onMouseUp() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[ i ].onMouseUp();
    }
  }
}

export default LineEmitter;
