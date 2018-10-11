import minimap from './assets/minimap.png';
import React, { Component } from 'react';

class Map extends Component {

    getIcons = () => {
        var icons = [];
        var liveData = this.props.data;
        console.log(this.props.liveData);
        
        for (var i = 1; i < 11; i++) {
            icons.push(<circle player={i} style={{
                cx: liveData.playerStats[i].x,
                cy: liveData.playerStats[i].x,
                fill: `url(http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${liveData.playerStats[i].championName}.png)`,
            }}/>);
        }
        return icons;
    }

    render() {
        return (
            <div className="Minimap" style={{
                background: `url(${minimap})`,
                backgroundRepeat: "no-repeat",
                width: "500px",
                height: "500px"
            }}>
                {this.getIcons()}
            </div>
        );
    }
}

export default Map;