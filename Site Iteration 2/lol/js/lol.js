var apiKey = "9af903b2-2102-4d8e-ac0c-b5e19f2b065d";

function lolAPI(){
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/29577428?api_key=9af903b2-2102-4d8e-ac0c-b5e19f2b065d", false);

	xhr.send();
	
	return xhr.response;
}

function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

function onClientLoad() {
    //showResponse(lolAPI());
	calculateWinRatio(lolAPI());
}

function calculateWinRatio(ls){
	var bigMatchList = JSON.parse(ls);
	var game = bigMatchList.matches;
	var win = 0;
	var total = 0;
	for (i = 0; i < game.length; i++) {
		if (game[i].participants[0].stats.winner){
			win += 1;
			total += 1;
			}
			else if (game[i].participants[0].stats.winner == false) {
				total += 1;
			}
		}
		alert("Wins " + win);
		alert("Losses " + (total - win));
		alert("Win Ratio " + (100 * (win / total).toFixed(3)) + " %");
	}