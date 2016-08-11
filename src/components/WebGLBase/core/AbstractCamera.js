import OrbitControls from 'utils/webgl/OrbitControls';
import GUI from 'helpers/GUI';

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

    // this.addGUI();
  }

  addGUI() {
    GUI.panel
      .addGroup({ label: 'Camera', enable: true })
        .addSubGroup({ label: 'Position', enable: true })
          .addSlider( this.position, 'x', 'range', { label: 'X', dp: 0 })
          .addSlider( this.position, 'y', 'range', { label: 'Y', dp: 0 })
          .addSlider( this.position, 'z', 'range', { label: 'Z', dp: 0 })
        .addSubGroup({ label: 'Rotation', enable: true })
          .addSlider( this.rotation, 'x', 'range', { label: 'X' })
          .addSlider( this.rotation, 'y', 'range', { label: 'Y' })
          .addSlider( this.rotation, 'z', 'range', { label: 'Z' });
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

    this.position.x = this.basePosition.x + x * 6;
    this.position.y = this.basePosition.y + y * 6;
    // this.position.z = this.basePosition.z + ( y + x ) * 2 ;

  }
}

export default AbstractCamera;
