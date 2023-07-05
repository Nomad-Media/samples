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
              "customer": "dev-05",
              "siteName": "Dev-05",
              "hideSidebar": true,
              "googleTagManager": "GTM-NFWDGJB",
              "players": [{ "format": "progressive", "player": "videojs" } ],
              "applicationId": "fc53821f-43a4-4758-9a31-87e3c66883ef",
              "bitmovinLicenseKey": "f507de7a-720a-4b61-9698-94dc4a014479",
              "liveMode": false,
              "vepModules": [
                {
                  "moduleType": "streams",
                  "isEnabled": true,
                  "streams": [
                    {
                      "streamUrl": "https://content.dev-05.demos.media/Content/Public/the-joker.mp4",
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
