import './App.css';

import React, { Component } from 'react';
class App extends Component {
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

  handleRef = component => {
    this.component = component;
  };

  render() {
  return <div className="App">
      <wc-player
          ref={this.handleRef}
          vep-config='{
            "application": "Embedded",
            "customer": "acme-customer",
            "siteName": "Acme Main Site",
            "hideSidebar": true,
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
                    "autoplay": true
                  }
                ]
              }
            ]
          }'></wc-player>
    </div>
    }
}
export default App;
