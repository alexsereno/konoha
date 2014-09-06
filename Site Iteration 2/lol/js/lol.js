var apiKey = "9af903b2-2102-4d8e-ac0c-b5e19f2b065d";

function lolAPI(){
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/29577428/recent?api_key=9af903b2-2102-4d8e-ac0c-b5e19f2b065d", false);

	xhr.send();
	
	return xhr.response;
}

function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

function onClientLoad() {
    //showResponse(lolAPI());
	calculateWinRatio(JSON.parse(lolAPI()));
	lastChampPlayed(JSON.parse(lolAPI()));
}

function gimmeDatImg(champID){
	var id = champID;
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/"+id+"?api_key=9af903b2-2102-4d8e-ac0c-b5e19f2b065d", false);

	xhr.send();
	
	var champ = JSON.parse(xhr.response);
	
	// alert(champ.name);
	
	
	// var img = document.createElement("img");
	return ("img/" + champ.name + ".png");

	// var src = document.getElementById("champImg");
	// src.appendChild(img);	
}

function lastChampPlayed(obj){
	var matchList = obj;
	var img = document.createElement("img");
	img.src = gimmeDatImg(matchList.games[0].championId);
	var src = document.getElementById("lastPlayed");
	src.appendChild(img);
}

function calculateWinRatio(obj){
	var matchList = obj;
	var win = 0;
	var total = 0;
	for (i = 0; i < matchList.games.length; i++) {
		if (matchList.games[i].stats.win){
			win += 1;
			total += 1;
			}
			else if (matchList.games[i].stats.win == false) {
				total += 1;
			}
		}
		document.getElementById('wins').innerHTML += ("Wins " + win);
		document.getElementById('losses').innerHTML += ("Losses " + (total - win));
		document.getElementById('w/r').innerHTML +=("Win Ratio " + (100 * (win / total).toFixed(3)) + " %");
	}