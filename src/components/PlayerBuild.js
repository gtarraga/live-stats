import React, { Component } from 'react';
import request from 'request';

export default class PlayerBuild extends Component {
	state = {
		itemsData: {},
		trinket: {}
	}

	componentDidMount() {
		request('http://ddragon.leagueoflegends.com/cdn/8.19.1/data/en_US/item.json', { json: true }, (err, res, body) => this.setState({ itemsData: body.data }))
	}

	getItems = () => {
		var itemBuild = [];
		var stacks = [];
		var items = this.props.data.items;
		var itemsData = this.state.itemsData;
		var trinketList = [];

		Object.keys([itemsData][0]).forEach(k => {
			if ([itemsData][0][k].tags.includes("Trinket")) trinketList.push(parseInt(k))
		})

		items.sort((a, b) => {
			return itemsData[b].gold.total - itemsData[a].gold.total
		});


		for (let i = 0; i < items.length; i++) {
			// If the item is a trinket it stores it so we can position it differently later
			if (trinketList.includes(items[i])) this.state.trinket = items[i]
			else {
				// Bundles items into stacks when applicable
				if (items[i] !== undefined && itemsData[items[i]].stacks) {
					if (!stacks.includes(items[i])) {
						stacks.push(items[i]);
						let count = items.filter(item => {
							return item === items[i];
						}).length;
						itemBuild.push(
							<div className="itemIcon" style={{
								backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/8.19.1/img/item/${items[i]}.png)`,
							}}>
								{count > 1 ? <span className="itemNumber">{count}</span> : ""}
							</div>
						)
					}
				}
				else {
					// Counts out the elixir actives, since they show up in the item build and we dont want that
					if (!(items[i] === 2138 || items[i] === 2139 || items[i] === 2140)) itemBuild.push(
						<div className="itemIcon" style={{
							backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/8.19.1/img/item/${items[i]}.png)`,
						}}></div>)
				}
			}
		}
		while (itemBuild.length > 6) {
			itemBuild.pop();
		}
		while (itemBuild.length < 6) {
			itemBuild.push(<div className="itemIcon" />)
		}

		return itemBuild;
	}

	render() {
		return (
			<div>
				{this.state.itemsData["1001"] ?
					<div style={{ display: "flex" }}>
						<div className="playerBuild">
							{this.getItems()}
						</div>
						<div className="extraBuild" >
							{/* trinket icon */}
							<div className="trinketIcon" style={{
								width: "93%",
								backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/8.19.1/img/item/${this.state.trinket}.png)`,
							}}></div>

							<div className="goldCounter" >
								{this.props.data.cg}
							</div>

						</div>
					</div>
					: <h4>Loading...</h4>
				}
			</div>
		)
	}
}