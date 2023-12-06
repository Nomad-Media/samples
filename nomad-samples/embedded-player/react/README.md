# How to run the existing sample React app that already uses `wc-player`
1. Run `npm install` to install the React dependencies.
2. From root folder, run `npm start` and load the application in `localhost:3000`

<br/>
<br/>
<br/>

# How to use `wc-player` in a new React application

1. Put `wc-player` folder that contains `wc-player.js` along with `style.scss` and other necessary assets into `public` folder.
2. Import the `wc-player.js` in the `index.html` like this:
`<script src="./wc-player/wc-player.js"></script>`
3. Import the `style.scss` in the `index.html` like this:
`<link rel="stylesheet" href="./wc-player/styles.css"></head>`
4. Now you are ready to use the `<wc-player>` web component in App.js like a normal html tag:
`<wc-player></wc-player>`

## Configuration of `wc-player`
1. You have to set the `vep-config` property of `<wc-player>` so that the player can be initialized. 
2. Also you can have a reference to the component like this `ref={this.handleRef}` and then consume the player events in the `App.js`
3. In order to play/pause from external button controls you have to set the `force-start` and `force-pause` input properties of the wc-player. 
Then you have to bind the values to a button handler. There is a working example in App.js. You can also see in the example below how the two inputs are bound.
4. In order to enable sharing you have to set the `supportSharing` property of the `vep-config` to `true`
5. You can control the share icon position by setting `"bottomShareIcon": true`. In this case the icon will be displayed at the bottom. If this value is set to 'false' the share icon will be displayed at the top.
6. Also you can control the sharing url by setting `"shareUrl": "<url>"`. This can be the URL to the Nomad API endpoint that serves up the HTML and metadata needed for social sharing of the asset. Alternatively this can be the URL of the web page the embedded player has been included in.
7. You can also specify which media options you support, setting these `vep-config` properties to `true`: 
`supportSharingFacebook`, `supportSharingTwitter`, `supportSharingLinkedin`, `supportSharingEmail`. If not specified, this defaults to showing all media.
In the example below we support all media except for twitter which is set to `false`.
8. You can disable 'seek' gtm event tracking by setting `"skipGtmSeek": true` in the vepConfig.
9. We can set the quad-view setting `"showTileMode": true` in the config and having specified multiple streams. Currently we display up to 4 videos at the same time
10. In order to use the plain video player without the Pin and Expand controls, you have to set `"showTileMode": false`
11. The share menu panel UI can be changed using these CSS variables, in the public/styles.css:
--custom-menu-button-icon--color
--form--submit-button-bg-color
--form--submit-button-txt-color
--form--field-padding
--form--button-padding
12. There is an option to enable debug mode and see some internal logs about the player. Just add the `debug-mode` attribute to the `wc-player`.

There is a `playerEventsChanges` event thrown by the wc-player that has a certain type. Here is the current event type list: `sourceloaded`, `play`, `pause` and `ended`.
You can refer to some example screenshots in the `screenshots` folder.

```
  componentDidMount() {
    this.component.addEventListener('playerEventsChanges', this.onPlayerEventChanges);
  }

  componentWillUnmount() {
    this.component.addEventListener('playerEventsChanges', this.onPlayerEventChanges);
  }

  onPlayerEventChanges(event) {
    // Handle the wc-player events here
    console.log('React::playerEventsChanges', event);
  }
```

Example usage of wc-player:

```
<wc-player 
    ref={this.handleRef}
    force-start={this.state.forceStart}
    force-pause={this.state.forcePause}
    force-mute={this.state.forceMute}
    force-unmute={this.state.forceUnmute}
    vep-config='{
        "application": "Embedded",
              "customer": "acme-customer",
              "siteName": "Acme Main Site",
              "hideSidebar": true,
              "supportSharing": true,
	      "shareUrl": "Nomad sharing HTML endpoint URL or website page URL goes here",
              "bottomShareIcon": true,
              "supportSharingFacebook": true,
              "supportSharingTwitter": false,
              "supportSharingLinkedin": true,
              "supportSharingEmail": true,
              "googleTagManager": "GTM-TAGGOESHERE",
              "players": [{ "format": "hls", "player": "videojs" } ],
              "liveMode": false,
              "vepModules": [
                {
                  "moduleType": "streams",
                  "isEnabled": true,
                  "streams": [
                    {
                      "streamUrl": "stream URL goes here",
                      "title": "stream title goes here",
                      "autoplay": true
                    }
                  ]
                }
              ]
    }'></wc-player>
```

<br/>
<br/>
<br/>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
