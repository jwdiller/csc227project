const dataURL = 'http://127.0.0.1/project/inventory.data';

var serverCopy = {
	"bread" : "unknown",
	"milk" : "unknown",
	"eggs" : "unknown"
};

function readFile() {
	fetch(dataURL)
	.then(response => response.text()) 
	.then(data => serverCopy = JSON.parse(data));
}

async function refreshAll() {
	const waitHere = await readFile();
	for (foodItem in serverCopy) {
		refreshItem(foodItem);
	}
}

function refreshItem(foodItem) {
	fetch(dataURL, {
	method: "PUT",
	body: JSON.stringify(serverCopy),
	headers: {"Content-type": "application/json; charset=UTF-8"}
	})
	.then(response => response.json());
	document.getElementById(foodItem + "Status").innerHTML = "Amount of " + foodItem + " : " + serverCopy[foodItem];
	document.getElementById(foodItem + "n").disabled = (serverCopy[foodItem] == 0);
}

function functionSwitch(foodItem, addTrue) {
	if (addTrue)
		serverCopy[foodItem]++;
		else if (serverCopy[foodItem] > 0)
		serverCopy[foodItem]--;
	refreshItem(foodItem);
}