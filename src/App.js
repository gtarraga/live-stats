import React, { Component } from 'react';
import minimap from './assets/minimap.png';
import './App.css';

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}

function cTime(millisec) {
  var seconds = (millisec / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = (hours >= 10) ? hours : "0" + hours;
    minutes = minutes - (hours * 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
  }
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  if (hours !== "") {
    return hours + ":" + minutes + ":" + seconds;
  }
  return minutes + ":" + seconds;
}

class TeamInfo extends Component {
  getPlayers = () => {
    var playerStats = [];
    var liveData = this.props.data;
    var blue = false
    if(this.props.side == "blue") {
      var startNumber = 1;
      blue = true;
    } 
    else var startNumber = 6;


    for (var i = startNumber; i < startNumber + 5; i++) {
      
      playerStats.push(
        <div>
          <h4>{/\ \w+/.exec(liveData.playerStats[i].summonerName)}</h4>
          <div style={{
            display: "flex",
            alignItems: "center",
          }}>
            <div className="championIcon" style={{
              position: "relative",
              backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/8.19.1/img/champion/${liveData.playerStats[i].championName}.png)`,
              backgroundSize: "115%",
              backgroundPosition: "center",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}>
              <span className="championLevel" style={{
                // mirrors level position
                // right: blue ? "" : "0",
              }}>{liveData.playerStats[i].level}</span>
            </div>
            <div className="championScore" style={{margin: "10px"}}>
              <img src={require('./assets/kills.png')} height="10px" margin="5px"></img>
              {` ${liveData.playerStats[i].kills}/${liveData.playerStats[i].deaths}/${liveData.playerStats[i].assists}`}
            </div>
          </div>

          <div className="statsBar" style={{
            margin: "3px",
          }}>
            <div className="hpBar" style={{position: "relative"}}> 
              <div style={{
                height: "15px",
                width: (liveData.playerStats[i].h * 100 / liveData.playerStats[i].maxHealth) + "%",
                backgroundColor: "#4CAF50",
              }}/>
              <div className="barTitle">{`${liveData.playerStats[i].h}/${liveData.playerStats[i].maxHealth}`}</div>
            </div>

            <div className="manaBar" style={{position: "relative"}}> 
              <div style={{
                height: "15px",
                width: (liveData.playerStats[i].p * 100 / liveData.playerStats[i].maxPower) + "%",
                backgroundColor: "#2D8FF3",
              }}/>
              <div className="barTitle">{`${liveData.playerStats[i].p}/${liveData.playerStats[i].maxPower}`}</div>
            </div>
          </div>

        </div>
      );
    }
    return playerStats;
  }

  render() {
    var liveData = this.props.data;
    var blue = false
    var teamStats = liveData.teamStats[blue ? 100 : 200];
    if(this.props.side == "blue") var blue = true;

    return(
      <div>
        {/\w+/.exec(liveData.playerStats[blue ? 1 : 6].summonerName)}
        <div className="teamStats">
          <div className="baron">
            <img src={require('./assets/baron.png')} height="15px"></img>
            {teamStats.baronsKilled}
          </div>
          <div className="dragon">
            <img src={require('./assets/dragon.png')} height="15px"></img>
            {teamStats.dragonsKilled}
          </div>
          <div className="tower">
            <img src={require('./assets/tower.png')} height="15px"></img>
            {teamStats.towersKilled}
          </div>
          <div className="inhibitor">
            <img src={require('./assets/inhib.png')} height="15px"></img>
            {teamStats.inhibitorsKilled}
          </div>
        </div>
        {this.getPlayers()}
      </div>
    );
  }
}

class ChampionIcon extends Component {
  render() {
    var liveData = this.props.data;
    var i = this.props.player;

    return(
      <g>
        <defs>
          <pattern height="100%" viewBox="0 0 30 30" width="100%" x="0" y="0" id={`icon-${liveData.playerStats[i].championName}`}>
            <image _ngcontent-c5="" height="34" width="34" x="-3" y="-3" xlinkHref={`https://ddragon.leagueoflegends.com/cdn/8.19.1/img/champion/${liveData.playerStats[i].championName}.png`}></image>
          </pattern>
        </defs>
        <circle r="14" strokeWidth="2" cy={100- (liveData.playerStats[i].y * 100 / 15000) + "%"} cx={(liveData.playerStats[i].x * 100 / 15000) + "%"} stroke="rgba(58, 171, 195, 0.75)" stroke={i < 6 ? "rgba(48, 169, 222, 0.75)" : "rgba(222, 48, 48, 0.75)"} fill={`url(#icon-${liveData.playerStats[i].championName})`} filter={liveData.playerStats[i].h === 0 ? "url(#grayscale)" : "none"}></circle>
      </g>
    );
  }
}

class Map extends Component {

  getIcons = () => {
    var icons = [];
    var liveData = this.props.data;
    console.log(this.props.liveData);

    for (var i = 1; i < 11; i++) {
      
      icons.push(
        <ChampionIcon data={liveData} player={i}/>
      );
    }
    return icons;
  }

  render() {
    return (
      <svg className="Minimap" style={{
        backgroundImage: `url(${minimap})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "512px",
        height: "512px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}>
        {this.getIcons()}
        <filter id="grayscale">
          <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
        </filter>
      </svg>
    );
  }
}

class App extends Component {
  state = {
    liveData: {}
  }

  componentDidMount() {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjoiMS4wIiwiamlkIjoiY2I1MTljYWUtN2FkYS00NmRmLWFkNmEtOWRhOGIzNTdkMTllIiwiaWF0IjoxNTM5MTYwNTc4NzQxLCJleHAiOjE1Mzk3NjUzNzg3NDEsIm5iZiI6MTUzOTE2MDU3ODc0MSwiY2lkIjoiYTkyNjQwZjI2ZGMzZTM1NGI0MDIwMjZhMjA3NWNiZjMiLCJzdWIiOnsiaXAiOiI3OS4xNTAuMTcyLjE4NyIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzY5LjAuMzQ5Ny4xMDAgU2FmYXJpLzUzNy4zNiJ9LCJyZWYiOlsid2F0Y2guKi5sb2xlc3BvcnRzLmNvbSJdLCJzcnYiOlsibGl2ZXN0YXRzLXYxLjAiXX0.d00CxicOj-99p2Amrg9PIs_bBwky_qLCUSTY6072E5Q";

    this.ws = new WebSocket(`ws://livestats.proxy.lolesports.com/stats?jwt=${token}`)
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })

    this.ws.onmessage = e => {
      let games = {};
      let json = {};
      let newLiveData = this.state.liveData;
      try {
        json = JSON.parse(e.data);
      } catch (er) {
        console.log(er)
      }

      Object.keys(json).forEach((key) => {
        let game = json[key]
        if (game === null) return

        if (!games[key]) {
          games[key] = {
            obj: game,
            id: `${game.realm}-${key}`,
          }
        }

        mergeDeep(newLiveData, game);
        newLiveData.time = cTime(newLiveData.t);
      })
      this.setState({ liveData: newLiveData });
    };
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    return (
      <div className="App">
        {this.state.liveData.playerStats ?
          <header className="App-header">
            <div className="centered">
              <TeamInfo side="blue" data={this.state.liveData} />
              <Map data={this.state.liveData} />
              <TeamInfo side="red" data={this.state.liveData} />
            </div>
            <div style={{ fontSize: "1.5em", margin: "10px" }}>{/([A-Z\d]+\|)([A-Z\d]+\|)([A-Z\d]+\|)/.exec(this.state.liveData.generatedName)[0].slice(0,-1).replace("|"," vs ")} In game time: {this.state.liveData.time}</div>
            <div>{JSON.stringify(this.state.liveData, null, 4)}</div>
          </header> : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
