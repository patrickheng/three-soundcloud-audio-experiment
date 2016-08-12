/**
* SoundCloudLoader class
* Based on https://github.com/michaelbromley/soundcloud-visualizer by @michaelbromley
* Improved and written in ES2015 by @patrickheng
*/

class SoundCloudLoader {

  constructor( player, audioControlPanel ) {

    this.player = player;
    this.audioControlPanel = audioControlPanel;
    this.clientId = ''; // HERE YOUR CLIENT ID
    this.sound = {};
    this.streamUrl = "";
    this.errorMessage = "";

    if( this.clientId === '')
      alert('You need to insert your soundcloud client id in SoundCloudLoader.js');
  }

  loadStream( trackUrl, successCallback, errorCallback ) {

    SC.initialize({
      client_id: this.clientId
    });

    SC.get('/resolve', { url: trackUrl }, ( sound ) => {

      if (sound.errors) {
        this.errorMessage = "";

        for (let i = 0; i < sound.errors.length; i++) {
          this.errorMessage += sound.errors[i].error_message + '<br>';
        }

        this.errorMessage += '=> Make sure the URL has the correct format: https://soundcloud.com/user/title-of-the-track';

        errorCallback();

      } else {

        if( sound.kind === 'playlist' ){

          this.sound = sound;
          this.streamPlaylistIndex = 0;
          this.streamUrl = sound.tracks[ this.streamPlaylistIndex ].stream_url + '?client_id=' + this.clientId;

          successCallback();

        } else {
          this.sound = sound;
          this.streamUrl = sound.stream_url + '?client_id=' + this.clientId;

          successCallback();

        }
      }
    });
  }

  directStream( direction ) {

    if( direction === 'toggle' ){

      if ( this.player.paused ) {
        this.player.play();
      } else {
        this.player.pause();
      }

    }

    else if( this.sound.kind === 'playlist' ){

      if( direction === 'coasting' ) {

        this.streamPlaylistIndex++;

      } else if( direction === 'forward' ) {

        if ( this.streamPlaylistIndex >= this.sound.track_count - 1 ) this.streamPlaylistIndex = 0;
        else this.streamPlaylistIndex++;

      } else{

        if ( this.streamPlaylistIndex <= 0 ) this.streamPlaylistIndex = this.sound.track_count - 1;
        else this.streamPlaylistIndex--;

      }

      if ( this.streamPlaylistIndex >= 0 && this.streamPlaylistIndex <= this.sound.track_count - 1 ) {

        this.player.setAttribute( 'src', this.streamUrl() );
        this.audioControlPanel.update( this );
        this.player.play();

      }
    }
  }
}

export default SoundCloudLoader;
