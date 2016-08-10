import MeshLineCurveMaterial from './MeshLineCurveMaterial';
import MeshLineShapeMaterial from './MeshLineShapeMaterial';
import 'utils/webgl/ConstantSpline';
import 'utils/webgl/MeshLine';
import { parabola, randomFloat } from 'utils/maths';


/**
* MeshLines class
*/
class MeshLines extends THREE.Group {

  /**
  * Constructor function
  * @param {Object} configuration Configuration
  */
  constructor( config, resources ) {

    super();

    this.config = config;
    this.resources = resources;

    console.log(resources);
    
    this.linesNb = 30;

    this.lines = [];

    this.curveParams = this.config.curve.geometry;

    this.addListeners();

    this.createMeshes();
  }

  addListeners() {
  }

  createMeshes() {
    for (let i = 0; i < this.linesNb; i++) {
      this.makeLine( this.createCurve(), 'curve' );
    }

    // for (let i = 0; i < this.shapesNb; i++) {
    //   this.makeLine( new THREE.CircleGeometry( 80 / this.shapesNb * i, 100 ), 'shape' );
    //
    //   this.shapes[ i ].baseRotationSpeed = randomFloat( 0.01, 0.05 );
    //   this.shapes[ i ].rotationSpeed = randomFloat( 0.01, 0.05 );
    // }
  }

  createCurve() {

    const s = new THREE.ConstantSpline();
    const rMin = 300;
    const rMax = 600;

    s.inc = .001;
    s.p0 = new THREE.Vector3( .5 - Math.random(), .5 - Math.random(), .5 - Math.random() );
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

  makeLine( geo, type = 'curve' ) {
    const g = new THREE.MeshLine();
    const lineType = ( type === 'curve' ) ? this.curveParams.type : this.shapeParams.type;

    switch( lineType ) {
      case 'none': g.setGeometry( geo ); break;
      case 'linear': g.setGeometry( geo, function( p ) { return 1 - p; } ); break;
      case 'parabolic': g.setGeometry( geo, function( p ) { return 1 * parabola( p, 1 ); } ); break;
      case 'wavy': g.setGeometry( geo, function( p ) { return 2 + Math.sin( 50 * p ); } ); break;
    }

    let matManager, mesh;

    if( type === 'curve' ) {
      matManager = new MeshLineCurveMaterial( this.resources );
      mesh = new THREE.Mesh( g.geometry, matManager.material );
      this.lines.push( mesh );
    } else {
      matManager = new MeshLineShapeMaterial( this.resources );
      mesh = new THREE.Mesh( g.geometry, matManager.material );
      this.shapes.push( mesh );
    }

    mesh.matManager = matManager;
    this.add( mesh );
  }

  handleWindowResize({ width, height }) {
    for (let i = 0; i < this.lines.length; i++) {
      this.lines[ i ].matManager.handleWindowResize({ width, height });
    }
  }


  update( time ) {
    //
    // for (let i = 0; i < this.shapes.length; i++) {
    //   this.shapes[ i ].matManager.update( time, i );
    //   this.shapes[ i ].rotation.z += this.shapes[ i ].rotationSpeed;
    //   this.shapes[ i ].rotation.z += this.shapes[ i ].rotationSpeed;
    // }

    for (let i = 0; i < this.lines.length; i++) {
      this.lines[ i ].matManager.update( time, i );
    }
  }

}

export default MeshLines;
