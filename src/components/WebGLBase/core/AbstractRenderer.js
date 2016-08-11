/**
 * AbstractRenderer class
 */
class AbstractRenderer extends THREE.WebGLRenderer {

  /**
   * constructor function
   */
  constructor({ antialias, alpha, clearColor, clearColorAlpha, pixelRatio }) {

    super({ antialias, alpha });

    this.setSize( window.innerWidth, window.innerHeight );
    this.setClearColor( clearColor, clearColorAlpha );
    this.setPixelRatio( pixelRatio );
    this.clear();
  }

  /**
   * handleWindowResize function
   * @param {Object} size         Viewport size
   * @param {number} param.width  Viewport width
   * @param {number} param.height Viewport height
   */
  handleWindowResize({ width, height }) {
    this.setSize( width, height );
  }
}

export default AbstractRenderer;
