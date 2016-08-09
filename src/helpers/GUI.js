import ControlKit from 'controlkit';

/**
 * GUI class
 */
class GUI extends ControlKit {

  /**
   * constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );

    this.panel = this.addPanel();
  }

  /**
   * removeGroup function
   * @param {number} index Index
   */
  removeGroup( index ) {
    this.panel._groups[ index ]._node._element.remove();
  }

  /**
   * removeLastGroup function
   */
  removeLastGroup() {
    this.removeGroup( this.panel._groups.length - 1 );
  }

  /**
   * addPanel function
   * @param {Object} options Options
   */
  addPanel( options = {}) {
    return super.addPanel({
      align: 'left',
      position: [ 10, 10 ],
      opacity: 0.8,
      width: 275,
      ratio: 10,
      fixed: false,
      ...options
    });
  }
}

export default new GUI();
