import React, { Component } from 'react';

export default class TeamInfo extends Component {
	render() {
		var teamStats = this.props.data;
		return (
				<div className="teamStats">
					<div className="baron">
						<img src={require('../assets/baron.png')} height="15px"></img>
						{teamStats.baronsKilled}
					</div>
					<div className="dragon">
						<img src={require('../assets/dragon.png')} height="15px"></img>
						{teamStats.dragonsKilled}
					</div>
					<div className="tower">
						<img src={require('../assets/tower.png')} height="15px"></img>
						{teamStats.towersKilled}
					</div>
					<div className="inhibitor">
						<img src={require('../assets/inhib.png')} height="15px"></img>
						{teamStats.inhibitorsKilled}
					</div>
				</div>
		);
	}
}
