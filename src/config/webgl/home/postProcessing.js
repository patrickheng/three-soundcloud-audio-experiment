import { BlendMode } from '@superguigui/wagner';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import TiltShiftPass from '@superguigui/wagner/src/passes/tiltShift/tiltShiftPass';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import SymetricPass from '@superguigui/wagner/src/passes/symetric/symetric';
import RGBSplitPass from 'webgl/postProcessing/passes/RGBSplit';

export default {
  active: true,
  effectComposer: {
    useRGBA: true
  },
  passes: [
    {
      name: 'SymetricPass',
      active: true,
      constructor: () => new SymetricPass({
        xMirror: true,
        yMirror: true
      })
    },
    {
      name: 'RGBSplitPass',
      active: true,
      constructor: () => new RGBSplitPass({
        delta: new THREE.Vector2(30, 30)
      })
    },
    {
      name: 'multiPassBloomPass',
      active: true,
      constructor: () => new MultiPassBloomPass({
        blurAmount: 0.01,
        applyZoomBlur: true,
        zoomBlurStrength: 1,
        blendMode: BlendMode.Screen
      })
    },
    {
      name: 'tiltShiftPass',
      active: false,
      constructor: () => new TiltShiftPass({
        bluramount: 0.5,
        center: 1,
        stepSize: 0.005
      })
    },
    {
      name: 'noisePass',
      active: false,
      constructor: () => new NoisePass({
        amount: 0.02,
        speed: 0.1
      })
    },
    {
      name: 'vignettePass',
      active: false,
      constructor: () => new VignettePass({
        boost: 1,
        reduction: 0.5
      })
    },
    {
      name: 'fxaaPass',
      active: true,
      constructor: () => new FXAAPass()
    }
  ]
};
