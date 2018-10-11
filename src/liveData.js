var wsUri = "ws://livestats.proxy.lolesports.com/stats?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjoiMS4wIiwiamlkIjoiY2I1MTljYWUtN2FkYS00NmRmLWFkNmEtOWRhOGIzNTdkMTllIiwiaWF0IjoxNTM5MTYwNTc4NzQxLCJleHAiOjE1Mzk3NjUzNzg3NDEsIm5iZiI6MTUzOTE2MDU3ODc0MSwiY2lkIjoiYTkyNjQwZjI2ZGMzZTM1NGI0MDIwMjZhMjA3NWNiZjMiLCJzdWIiOnsiaXAiOiI3OS4xNTAuMTcyLjE4NyIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzY5LjAuMzQ5Ny4xMDAgU2FmYXJpLzUzNy4zNiJ9LCJyZWYiOlsid2F0Y2guKi5sb2xlc3BvcnRzLmNvbSJdLCJzcnYiOlsibGl2ZXN0YXRzLXYxLjAiXX0.d00CxicOj-99p2Amrg9PIs_bBwky_qLCUSTY6072E5Q";

var liveData = {
	"playerStats": {
		"1": {
			"participantId": 1,
			"summonerName": "AFs Kiin",
			"championName": "Sion",
			"kills": 0,
			"deaths": 3,
			"assists": 0,
			"level": 14,
			"wardsPlaced": 13,
			"wardsKilled": 4,
			"items": [
				1054,
				3047,
				3133,
				3071,
				3134,
				2055
			],
			"mk": 0,
			"cg": 696,
			"tg": 7951,
			"xp": 0,
			"x": 3010,
			"y": 2562,
			"h": 0,
			"p": 0,
			"td": 104298,
			"pd": 104298,
			"md": 0,
			"trd": 0,
			"tdc": 4664,
			"pdc": 4664,
			"mdc": 0,
			"trdc": 0,
			"playerId": "1521"
		},
	},
};

var websocket;

testWebSocket();

function testWebSocket() {
	websocket = new WebSocket(wsUri);
	websocket.onpen = function (evt) { onOpen(evt) };
	websocket.onclose = function (evt) { onClose(evt) };
	websocket.onmessage = function (evt) { onMessage(evt) };
	websocket.onerror = function (evt) { onError(evt) };
}

function onOpen(evt) {
	console.log("CONNECTED");
}

function onClose(evt) {
	testWebSocket();
}

function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item));
}

function onMessage(evt) {
	let games = {};
	let json = {};
	try {
		json = JSON.parse(evt.data);
	} catch (e) {
		console.log(e)
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

		mergeDeep(liveData, game);
		liveData.time = cTime(liveData.t);
	})
}

function onError(evt) {
	// testWebSocket();
}

// Merges 2 objects replacing all source object properties on the target if available
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
// Convert time from milliseconds to HH:MM:SS format
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
	if (hours != "") {
		return hours + ":" + minutes + ":" + seconds;
	}
	return minutes + ":" + seconds;
}


export default liveData;