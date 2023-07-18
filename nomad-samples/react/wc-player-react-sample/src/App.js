import './App.css';

import React, { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forceStart: false,
      forcePause: false
    };

    // This binding is necessary to make `this` work in the callback
    this.onForceStart = this.onForceStart.bind(this);
    this.onForcePause = this.onForcePause.bind(this);
  }

  onForceStart() {
    console.log('Previous Force Start', this.state.forceStart);
    console.log('Previous Force Pause', this.state.forcePause);
    this.setState(prevState => ({
      forceStart: !prevState.forceStart
    }));
    console.log('New Force Start', this.state.forceStart);
    console.log('New Force Pause', this.state.forcePause);
  }
  
  onForcePause() {
    console.log('Previous Force Pause', this.state.forcePause);
    console.log('Previous Force Start', this.state.forceStart);
    this.setState(prevState => ({
      forcePause: !prevState.forcePause
    }));
    console.log('New Force Pause', this.state.forcePause);
    console.log('New Force Start', this.state.forceStart);
  }

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
    const startBtnStyle = {
      backgroundColor: "green",
      color: "white",
      margin: "10px"
    };
    
    const pauseBtnStyle = {
      backgroundColor: "red",
      color: "white",
      margin: "10px"
    };

    return <div className="App">
      <div>
        <button style={startBtnStyle} onClick={this.onForceStart}>Play</button>
        <button style={pauseBtnStyle} onClick={this.onForcePause}>Pause</button>
      </div>
        <wc-player
            ref={this.handleRef}
            force-start={this.state.forceStart}
            force-pause={this.state.forcePause}
            vep-config='{
              "application": "Embedded",
                "customer": "dev-05",
                "siteName": "Dev-05",
                "hideSidebar": true,
                "supportSharing": true,
                "googleTagManager": "GTM-NFWDGJB",
                "players": [{ "format": "progressive", "player": "bitmovin" } ],
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
