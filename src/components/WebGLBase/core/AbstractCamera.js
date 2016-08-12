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

    window.camera = this;

    this.basePosition = new THREE.Vector3();
    this.baseRotation = new THREE.Vector3();

    this.orbitPosition = new THREE.Vector3( -2450, 603, 200 );


    this.position.copy( position );

    this.basePosition.copy( position );
    this.baseRotation.copy( this.rotation );

    this.orbitControlsEnabled = orbitControls;

    this.controls = new OrbitControls( this );
    this.controls.enabled = orbitControls;

    this.addGUI();
  }

  addGUI() {
    GUI.panel
      .addGroup({ label: 'Camera', enable: true })
        .addCheckbox( this, 'orbitControlsEnabled', { onChange: () => {
          if( this.orbitControlsEnabled ) {
            this.controls.enabled = true;
            // this.position.copy( this.orbitPosition );
          } else {
            this.controls.enabled = false;

            this.position.copy( this.basePosition );
            this.rotation.copy( this.baseRotation );
            this.lookAt( new THREE.Vector3( 0, 0 ,0 ) );
          }
        }});
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

    if (this.orbitControlsEnabled ) return;
    this.position.x = this.basePosition.x + x * 20;
    this.position.y = this.basePosition.y + y * 20;

  }
}

export default AbstractCamera;
