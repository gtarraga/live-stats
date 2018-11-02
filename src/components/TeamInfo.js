import React, { Component } from 'react';
import PlayerBuild from './PlayerBuild';
import PlayerBars from './PlayerBars';
import TeamStats from './TeamStats';
import ChampionScore from './ChampionScore';

export default class TeamInfo extends Component {
	getPlayers = () => {
		var playerStats = [];
		var liveData = this.props.data;
		var red = true;
		if(this.props.side == "blue") red = false;
		if (this.props.side === "blue") var startNumber = 1;
		else startNumber = 6;

		for (var i = startNumber; i < startNumber + 5; i++) {
			playerStats.push(
				<div>
					<div style={{
						fontWeight: "700", 
						textAlign: red ? "left" : "right",
						padding: "2px",
					}}>
						{/ \w+/.exec(liveData.playerStats[i].summonerName) + " "}
					</div>
					<div style={{
						display: "flex",
						alignItems: "center",
						flexDirection: red ? "" : "row-reverse",
					}}>
						<div className="championIcon" style={{
							backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/8.19.1/img/champion/${liveData.playerStats[i].championName}.png)`,
						}}>
							<span className="championLevel" style={{
								// mirrors level position
								right: red ? "" : "0",
							}}>{liveData.playerStats[i].level}</span>
						</div>

						<ChampionScore data={liveData.playerStats[i]} side={this.props.side} />
						
					</div>

					<PlayerBars data={liveData.playerStats[i]} />

					<div className="items">
						<PlayerBuild data={liveData.playerStats[i]} />
					</div>
				</div>
			);
		}
		return playerStats;
	}

	render() {
		var liveData = this.props.data;
		var red = false
		var teamStats = liveData.teamStats[red ? 100 : 200];
		if (this.props.side == "blue") var red = true;

		return (
			<div>
				{/\w+/.exec(liveData.playerStats[red ? 1 : 6].summonerName)}
				<TeamStats data={teamStats}/>

				{this.getPlayers()}
			</div>
		);
	}
}
