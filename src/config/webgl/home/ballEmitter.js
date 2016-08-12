export default {
  poolSize: 100,
  throwNb: 8,
  geometry: {
    autoRotate: false,
    animateWidth: true,
    type: 'wavy'
  },
  material: {
    useMap: true,
    color: new THREE.Color( 0xcccccc ),
    opacity: .5,
    dashArray: new THREE.Vector2( 0, 0 ),
    sizeAttenuation: false,
    near: 1,
    far: 2000,
    depthTest: false,
    blending: THREE.NormalBlending,
    transparent: true,
    side: THREE.DoubleSide
  }
};
