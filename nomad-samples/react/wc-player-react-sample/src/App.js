import './App.css';

import React, { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forceStart: undefined,
      forcePause: undefined,
      forceMute: undefined,
      forceUnmute: undefined,
    };

    // This binding is necessary to make `this` work in the callback
    this.onForceStart = this.onForceStart.bind(this);
    this.onForcePause = this.onForcePause.bind(this);
    this.onForceMute = this.onForceMute.bind(this);
    this.onForceUnmute = this.onForceUnmute.bind(this);
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

  onForceMute() {
    this.setState(prevState => ({
      forceMute: !prevState.forceMute
    }));
  }

  onForceUnmute() {
    this.setState(prevState => ({
      forceUnmute: !prevState.forceUnmute
    }));
  }

  componentDidMount() {
    this.component.addEventListener('playerEventsChanges', this.onPlayerEventChanges);
  }

  componentWillUnmount() {
    this.component.addEventListener('playerEventsChanges', this.onPlayerEventChanges);
  }

  onPlayerEventChanges(event) {
    // Handle the wc-player events here
  }

  handleRef = component => {
    this.component = component;
  };

  render() {
    const headerHeight = 40;

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
    
    const headerStyle = {
      height: `${headerHeight}px`
    };

    const wcPlayerStyle = {
      height: `calc(100% - ${headerHeight}px)`,
      display: 'block'
    }

    return <div className="App">
      <div style={headerStyle}>
        <button style={startBtnStyle} onClick={this.onForceMute}>Mute</button>
        <button style={pauseBtnStyle} onClick={this.onForceUnmute}>Unmute</button>
        <button style={startBtnStyle} onClick={this.onForceStart}>Play</button>
        <button style={pauseBtnStyle} onClick={this.onForcePause}>Pause</button>
      </div>
        <wc-player style={wcPlayerStyle}
            ref={this.handleRef}
            force-start={this.state.forceStart}
            force-pause={this.state.forcePause}
            force-mute={this.state.forceMute}
            force-unmute={this.state.forceUnmute}
            vep-config='{
              "application": "Embedded",
                "customer": "dev-05",
                "siteName": "Dev-05",
                "hideSidebar": true,
                "supportSharing": true,
                "googleTagManager": "GTM-5K22WWM",
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
                        "title": "Test Video 1",
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
