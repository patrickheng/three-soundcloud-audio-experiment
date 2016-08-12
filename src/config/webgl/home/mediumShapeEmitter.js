export default {
  poolSize: 200,
  throwNb: 5,

  geometry: {
    radius: 5,
    segments: {
      width: 10,
      height: 10
    }
  },

  material: {
    uniforms: {
      u_time: { type: 'f', value: 0.0 },
      u_speed: { type: 'f', value: 1.0 },
      u_amp: { type: 'f', value: 2.0 },
      opacity: { type: 'f', value: 0.3 },
      diffuse: { type: 'vec3', value: new THREE.Color( '#386950' ) }
    },
    options: {
      lights: true,
      fog: false,
      side: THREE.FrontSide,
      blending: THREE.NormalBlending,
      wireframe: true
    }
  }
};
