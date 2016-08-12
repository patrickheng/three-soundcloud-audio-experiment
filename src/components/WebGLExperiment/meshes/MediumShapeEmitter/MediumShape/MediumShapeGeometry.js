/**
 * MediumShapeGeometry class
 */
class MediumShapeGeometry extends THREE.SphereGeometry {

  /**
   * constructor function
   */
  constructor({ radius, segments: { width: segmentsWidth, height: segmentsHeight } }) {
    super( radius, segmentsWidth, segmentsHeight );
  }
}

export default MediumShapeGeometry;
