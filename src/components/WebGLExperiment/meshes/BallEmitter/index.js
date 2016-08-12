import EmitterBase from '../EmitterBase';
import Ball from './Ball';

class BallEmitter extends EmitterBase {

  constructor( config, resources ) {

    super( config, resources );

    this.populate( Ball, config.poolSize );
    this.throw( config.throwNb );
  }

}

export default BallEmitter;
