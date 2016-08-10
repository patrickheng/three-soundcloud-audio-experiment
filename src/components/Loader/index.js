import './style.scss';

import Emitter from 'helpers/Emitter';
import { RESSOURCES_PROGRESS } from 'config/messages';

/**
* Loader component
*/
class Loader {

  constructor() {

    this.$el = document.querySelector( '.loader' );

    this.$els = {
      percent: this.$el.querySelector( '.loader__percent' )
    };

    this.progress = 0;
    this.tweenProgress = 0;
    this.canTween = true;

    this.bind();
    this.addListeners();
  }

  bind() {
    this.onResourceProgress = ::this.onResourceProgress;
  }

  addListeners() {
    Emitter.on( RESSOURCES_PROGRESS, this.onResourceProgress );
  }

  onResourceProgress( p ) {
    this.progress = Math.ceil( p * 100 );

    if( this.progress === 100 ) {

      TweenMax.to(this, 0.1, { tweenProgress: this.progress, onUpdate: () => {
        this.progress = Math.ceil( this.tweenProgress );
        this.$els.percent.innerHTML = `${this.progress}%`;
      }});

      TweenMax.to( this.$el, 1, { opacity: 0, ease: Expo.easeOut, onComplete: () => {
        this.$el.style.display = 'none';
      } });

    }
    else if ( this.progress <= 100 ) {

      TweenMax.to(this, 0.4, { tweenProgress: this.progress, onUpdate: () => {
        this.progress = Math.ceil( this.tweenProgress );
        this.$els.percent.innerHTML = `${this.progress}%`;
      }});

    } else {
      this.progress = 0;
      this.tweenProgress = 0;
      this.$els.percent.innerHTML = `${this.progress}%`;
    }
  }
}

export default Loader;
