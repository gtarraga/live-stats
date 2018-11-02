import React, { Component } from 'react';
import resourceBars from './bars.json';

export default class ChampionIcon extends Component {

	getResourceBar = () => {
		var barColor = "";
		var champion = this.props.data.championName;
		var percentage = this.props.data.p / this.props.data.maxPower * 100;

		if (Object.keys(resourceBars).includes(champion)) {
			var type = resourceBars[champion].type;

			if (type === "akali") {
				if (percentage >= 90) return barColor = "#f4ac41";
				else return barColor = "#d6af24";
			}
			if (type === "energy") return barColor = "#d6af24"
			if (type === "gnar") {
				if (percentage == 100) return barColor = "#B24C45";
				else return barColor = "#f4cd41";
			}
			if (type === "fury") return barColor = "#0A1827";
			if (type === "renek") {
				if (percentage >= 50) return barColor = "#A1362F";
				else return barColor = "#fff";
			}
			if (type === "rumble") {
				if (percentage === 100) return barColor = "#A1362F"
				else if (percentage >= 50) return barColor = "#f4cd41";
				else return barColor = "#fff";
			}
			if (type === "rengar") {
				if (percentage === 100) return barColor = "#B97C4A"
				else return barColor = "#fff"
			}
			if (type === "vlad") {
				if (percentage === 100) return barColor = "#B24C45";
				if (percentage >= 50) return barColor = "#B97C4A"
				else return barColor = "#fff"
			}
			else return barColor = "#fff"
		}
		else return barColor = "#2D8FF3";
	}

	render() {
		let liveData = this.props.data;
		return (
			<div className="statsBar" >
				<div className="hpBar" style={{ position: "relative" }}>
					<div style={{
						height: "15px",
						width: (liveData.h * 100 / liveData.maxHealth) + "%",
						backgroundColor: "#4CAF50",
					}} />
					<div className="barTitle">{`${liveData.h}/${liveData.maxHealth}`}</div>
				</div>

				<div className="manaBar" style={{ position: "relative" }}>
					<div style={{
						height: "15px",
						width: (liveData.maxPower === 0 ? "0%" : (liveData.p * 100 / liveData.maxPower) + "%"),
						backgroundColor: this.getResourceBar(),
					}} />
					<div className="barTitle" color="#999999">{`${liveData.p}/${liveData.maxPower}`}</div>
				</div>
			</div>
		)
	}
}