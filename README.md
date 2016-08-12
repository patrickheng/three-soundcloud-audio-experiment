# Three.js + Soundcloud audio visualization

Here is simple audio visualization using Three.js and the Soundcloud API.

You can see it live here : [http//lab.hengpatrick.fr](http//lab.hengpatrick.fr/three-soundcloud-audioviz).

#### TECHNOLOGIES

* Three.js
* SoundCloud API
* EventEmitter
* GSAP - TweenMax
* Babel | ES2015
* Webpack
* ESLint
* SCSS

##### Install dependancies :
```shell
  npm i
```

##### Launch the project :

Add your own Soundcloud client_id from [https://developers.soundcloud.com/](https://developers.soundcloud.com/) in SoundCloudLoader.js

then :

```shell
  npm start
```

The project will be launched at [http://0.0.0.0:3000/](http://0.0.0.0:3000/)


##### Build for production :
```shell
  npm run build
```

##### Thanks :
Thanks to [@michaelbromley 's sound-cloud-visualizer](https://github.com/michaelbromley/soundcloud-visualizer). His project help me a lot to understand how retrieving SoundCloud stream.

Hope you like it <3
