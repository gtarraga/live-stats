import React, { Component } from 'react';

export default class championScore extends Component {
	render() {
		let minions = this.props.data.mk;
		let kills = this.props.data.kills;
		let deaths = this.props.data.deaths;
		let assists = this.props.data.assists;
		var red = true
		if (this.props.side == "blue") var red = false;

		return (
			<div className="championScore" style={{ margin: "10px" }}>
				<div style={{
					display: "flex",
					alignItems: "center",
					flexDirection: red ? "" : "row-reverse",
				}}>
					<img src={require('../assets/kills.png')} height="10px" margin="5px" alt="kills icon"></img>
					{` ${kills}/${deaths}/${assists} `}
				</div>
				<div style={{
					display: "flex",
					alignItems: "center",
					flexDirection: red ? "" : "row-reverse",
				}}>
					<img src={require('../assets/minion.png')} height="10px" margin="5px" alt="minions icon" style={{
						padding: "0px 1.2px",
					}}></img>
					{` ${minions} `}
				</div>
			</div>
		);
	}
}
