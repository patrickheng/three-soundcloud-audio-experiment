import OrbitControls from 'utils/webgl/OrbitControls';
// import GUI from 'helpers/GUI';

/**
 * AbstractCamera class
 */
class AbstractCamera extends THREE.PerspectiveCamera {

  /**
   * Constructor function
   */
  constructor({ fov, aspect, near, far, position, orbitControls }) {

    super( fov, aspect, near, far );

    this.basePosition = new THREE.Vector3();

    this.position.copy( position );

    this.basePosition.copy( position );

    if( orbitControls ) {
      this.controls = new OrbitControls( this );
    }

    this.position.range = [ -1000, 1000 ];
    this.rotation.range = [ - Math.PI * 2, Math.PI * 2 ];
  }

  /**
   * handleWindowResize function
   * @param {Object} size         Viewport size
   * @param {number} param.width  Viewport width
   * @param {number} param.height Viewport height
   */
  handleWindowResize({ width, height }) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }

  handleMouseMove({ x, y }) {

    this.position.x = this.basePosition.x + x * 20;
    this.position.y = this.basePosition.y + y * 20;

  }
}

export default AbstractCamera;
