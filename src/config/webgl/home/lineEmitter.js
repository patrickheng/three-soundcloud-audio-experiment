export default {
  poolSize: 1000,
  throwNb: 50,

  geometry: {
    autoRotate: false,
    animateWidth: true,
    type: 'wavy'
  },

  material: {
    useMap: true,
    color: new THREE.Color( 0xdddddd ),
    opacity: 0.5,
    dashArray: new THREE.Vector2( 0, 0 ),
    sizeAttenuation: true,
    near: 1,
    far: 2000,
    depthTest: false,
    blending: THREE.NormalBlending,
    transparent: true,
    side: THREE.DoubleSide
  }
};
