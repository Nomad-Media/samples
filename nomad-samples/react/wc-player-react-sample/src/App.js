import './App.css';

function App() {
  return (
    <div className="App">
      <wc-player
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
  );
}

export default App;
