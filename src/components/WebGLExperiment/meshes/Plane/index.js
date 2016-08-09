import PlaneGeometry from './PlaneGeometry';
import PlaneMaterial from './PlaneMaterial';

import GUI from 'helpers/GUI';

import { TweenMax, Expo } from 'gsap';

/**
 * Plane class
 */
class Plane extends THREE.Mesh {

  /**
   * Constructor function
   * @param {Object} configuration Configuration
   */
  constructor({ geometry, material, position }, video, bufferTexture ) {

    super( new PlaneGeometry( geometry ), new PlaneMaterial( material, video, bufferTexture ));

    this.castShadow = true;

    this.position.copy(position);

    this.position.range = [ -300, 300 ];

    TweenMax.from(this.rotation, 4, { x: -Math.PI / 10 , ease: Expo.easeOut });
    TweenMax.from(this.position, 4, { z: this.position.z + 100 , ease: Expo.easeOut });

    this.addGUI();
  }

  addGUI() {
    GUI.panel
      .addGroup({ label: 'Plane position', enable: false })
        .addSlider( this.position, 'x', 'range', { label: 'X', dp: 0 })
        .addSlider( this.position, 'y', 'range', { label: 'Y', dp: 0 })
        .addSlider( this.position, 'z', 'range', { label: 'Z', dp: 0 });
  }

  update( time ) {

    this.material.update( time );
  }
}

export default Plane;
