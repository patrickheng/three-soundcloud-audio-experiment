import Emitter from 'helpers/Emitter';
import { MOUSE_DOWN, MOUSE_UP } from 'config/messages';

class EmitterBase extends THREE.Group {

  constructor( config, resources ) {

    super();

    this.config = config;
    this.resources = resources;

    this.poolIndex = 0;
    this.pool = [];
    this.particles = [];

    this.bind();
    this.addListeners();
  }

  bind() {

    [ 'onMouseUp', 'onMouseDown' ]
      .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addListeners() {

    Emitter.on( MOUSE_UP, this.onMouseUp );
    Emitter.on( MOUSE_DOWN, this.onMouseDown );
  }

  populate( particleClass, poolSize ) {

    for (let i = 0; i < poolSize; i++ ) {
      this.pool.push( new particleClass( this.config, this.resources ) );
    }
  }

  throw( number ) {

    for (let i = 0; i < number; i++) {

      const p = this.takeFromPool();

      p.reset();

      this.particles.push( p );
      this.add( p.mesh );
    }
  }

  takeFromPool() {

    this.poolIndex = (this.poolIndex >= this.pool.length - 1) ? 0 : this.poolIndex + 1;

    return this.pool[ this.poolIndex ];
  }

  handleWindowResize({ width, height }) {

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[ i ].matManager.handleWindowResize({ width, height });
    }
  }

  onMouseDown() {

  }

  onMouseUp() {

  }

  update( time, audioData ) {

    for (let i = 0; i < this.particles.length; i++) {

      const deadP = [];

      if( this.particles[ i ].isAlive ) {
        this.particles[ i ].update( time, audioData, i );
      } else {
        deadP.push( i );
      }

      for (let i = 0; i < deadP.length; i++) {
        this.remove( this.particles[ deadP[ i ] ]);
        this.particles.splice( deadP[ i ], 1);
        this.throw( 1 );
      }
    }
  }
}

export default EmitterBase;
