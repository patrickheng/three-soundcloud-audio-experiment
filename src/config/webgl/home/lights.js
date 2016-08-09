export default {
  ambientLight: {
    color: new THREE.Color( '#ffffff' ),
    intensity: 1
  },
  directionalLight: {
    color: new THREE.Color( '#e7e3e3' ),
    intensity: 10,
    target: new THREE.Vector3( 0, 0, 0 ),
    position: new THREE.Vector3( 0, 1, 0 )
  },
  pointLight: {
    palette: [ '#92c9ef', '#e7e3e3' ],
    position: new THREE.Vector3( 0, 0, 0 ),
    color: new THREE.Color( '#e7e3e3' ),
    intensity: 0.2,
    distance: 250,
    decay: 1,
    number: 10
  }
};
