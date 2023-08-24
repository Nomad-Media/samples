import './App.css';

import React, { Component } from 'react';
class App extends Component {

  defaultVepConfig = {
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
  };

  constructor(props) {
    super(props);
    this.state = {
      forceStart: undefined,
      forcePause: undefined,
      vepConfig: this.defaultVepConfig,
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
    this.setState(prevState => ({
      forceStart: !prevState.forceStart
    }));
  }
  
  onForcePause() {
    this.setState(prevState => ({
      forcePause: !prevState.forcePause
    }));
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
    this.component.removeEventListener('playerEventsChanges', this.onPlayerEventChanges);
  }

  onPlayerEventChanges(event) {
    // Handle the wc-player events here
  }

  onConfigFormSubmit = (event) => {
    event.preventDefault();
    const updatedVepConfig = event.target.elements.vepConfig.value
    this.setState({
      vepConfig: JSON.parse(updatedVepConfig)
    });
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
    
    const setConfigBtnStyle = {
      backgroundColor: "blue",
      color: "white",
      margin: "10px",
      padding: "10px"
    };
    
    const headerStyle = {
      height: `${headerHeight}px`
    };

    const wcPlayerContainerStyle = {
      height: `calc(100% - ${headerHeight}px)`,
      display: 'flex',
    }
    
    const wcPlayerStyle = {
      width: '75%'
    }
    
    const vepConfigFormStyle = {
      width: '25%'
    }
    
    const vepConfigTextareaStyle = {
      width: '98%'
    }

    return <div className="App">
      <div style={headerStyle}>
        <button style={startBtnStyle} onClick={this.onForceMute}>Mute</button>
        <button style={pauseBtnStyle} onClick={this.onForceUnmute}>Unmute</button>
        <button style={startBtnStyle} onClick={this.onForceStart}>Play</button>
        <button style={pauseBtnStyle} onClick={this.onForcePause}>Pause</button>
      </div>
      <div style={wcPlayerContainerStyle}>
        <wc-player style={wcPlayerStyle}
            ref={this.handleRef}
            force-start={this.state.forceStart}
            force-pause={this.state.forcePause}
            force-mute={this.state.forceMute}
            force-unmute={this.state.forceUnmute}
            vep-config={JSON.stringify(this.state.vepConfig)}></wc-player>
        <form style={vepConfigFormStyle} 
            onSubmit={this.onConfigFormSubmit}>
          <textarea style={vepConfigTextareaStyle} 
              name="vepConfig"
              rows="40"
              defaultValue={JSON.stringify(this.state.vepConfig, undefined, 2)}></textarea>
          <button style={setConfigBtnStyle} type='submit'>Set Config</button>
        </form>
      </div>
    </div>
    }
}
export default App;
