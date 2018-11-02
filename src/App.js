import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import TeamInfo from './components/TeamInfo';

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

class App extends Component {
	state = {
		liveData: {},
		itemData: {}
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
							<div style={{width: "100%"}}>HOLA</div>
						<div className="centered">
							<TeamInfo side="blue" data={this.state.liveData} />
							<Map data={this.state.liveData} />
							<TeamInfo side="red" data={this.state.liveData} />
						</div>
						<div style={{ fontSize: "1.5em", margin: "10px" }}>{/([A-Z\d]+\|)([A-Z\d]+\|)([A-Z\d]+\|)/.exec(this.state.liveData.generatedName)[0].slice(0, -1).replace("|", " vs ")} In game time: {this.state.liveData.time}</div>
						<div>{JSON.stringify(this.state.liveData, null, 4)}</div>
					</header> : <h1>Loading...</h1>
				}
			</div>
		);
	}
}

export default App;
