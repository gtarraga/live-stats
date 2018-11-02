import React, { Component } from 'react';
import ChampionIcon from './ChampionIcon';
import minimap from '../assets/minimap.png';

export default class Map extends Component {

	getIcons = () => {
		var icons = [];
		var liveData = this.props.data;
		for (var i = 1; i < 11; i++) {
			icons.push(
				<ChampionIcon data={liveData} player={i} />
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
					<feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
				</filter>
			</svg>
		);
	}
}