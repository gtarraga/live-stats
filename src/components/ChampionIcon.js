import React, { Component } from 'react';

export default class ChampionIcon extends Component {
	render() {
		var liveData = this.props.data;
		var i = this.props.player;

		return (
			<g>
				<defs>
					<pattern height="100%" viewBox="0 0 30 30" width="100%" x="0" y="0" id={`icon-${liveData.playerStats[i].championName}`}>
						<image _ngcontent-c5="" height="34" width="34" x="-3" y="-3" xlinkHref={`https://ddragon.leagueoflegends.com/cdn/8.19.1/img/champion/${liveData.playerStats[i].championName}.png`}></image>
					</pattern>
				</defs>
				<circle r="14" strokeWidth="2" cy={100 - (liveData.playerStats[i].y * 100 / 15000) + "%"} cx={(liveData.playerStats[i].x * 100 / 15000) + "%"} stroke="rgba(58, 171, 195, 0.75)" stroke={i < 6 ? "rgba(48, 169, 222, 0.75)" : "rgba(222, 48, 48, 0.75)"} fill={`url(#icon-${liveData.playerStats[i].championName})`} filter={liveData.playerStats[i].h === 0 ? "url(#grayscale)" : "none"}></circle>
			</g>
		);
	}
}