import './styles.scss';

/**
* AudioControlPanel class
* Based on https://github.com/michaelbromley/soundcloud-visualizer by @michaelbromley
* Improved and written in ES2015 by @patrickheng
*/

class AudioControlPanel {

  constructor() {

    this.$el = document.querySelector('.audio-control-panel');

    this.$els = {
      controlPanel: this.$el,
      trackInfoPanel: this.$el.querySelector( '.track-info' ),
      infoImage: this.$el.querySelector( '.track-info__image' ),
      infoArtist: this.$el.querySelector( '.track-info__artist' ),
      infoTrack: this.$el.querySelector( '.track-info__title' )
    };
  }

  clearInfoPanel() {
    this.$els.infoArtist.innerHTML = "";
    this.$els.infoTrack.innerHTML = "";
    this.$els.trackInfoPanel.className.add( 'hidden' );
  }

  update( loader ) {

    const artistLink = document.createElement('a');
    artistLink.setAttribute('href', loader.sound.user.permalink_url);
    artistLink.innerHTML = loader.sound.user.username;

    const trackLink = document.createElement('a');
    trackLink.setAttribute('href', loader.sound.permalink_url);

    if ( loader.sound.kind === "playlist" ){
      trackLink.innerHTML = "<p>" + loader.sound.tracks[loader.streamPlaylistIndex].title + "</p>" + "<p>"+loader.sound.title+"</p>";
    } else {
      trackLink.innerHTML = loader.sound.title;
    }

    const image = loader.sound.artwork_url ? loader.sound.artwork_url : loader.sound.user.avatar_url; // if no track artwork exists, use the user's avatar.

    this.$els.infoImage.setAttribute( 'src', image );

    this.$els.infoArtist.innerHTML = '';
    this.$els.infoArtist.appendChild( artistLink );

    this.$els.infoTrack.innerHTML = '';
    this.$els.infoTrack.appendChild( trackLink );

    this.$els.trackInfoPanel.className.remove( 'hidden' );

    // add a hash to the URL so it can be shared or saved
    const trackToken = loader.sound.permalink_url.substr(22);
    window.location = '#' + trackToken;
  }

  toggleControlPanel() {
    if ( this.$el.className.indexOf('hidden') === 0 ) {

      this.$el.className.remove( 'hidden' );
    } else {

      this.$el.className.add( 'hidden' );
    }
  }


}

export default AudioControlPanel;
