const dataURL = 'http://127.0.0.1/project/inventory.data';

var serverCopy;

async function readFile() {
	return fetch(dataURL)
	.then(response => response.text()) 
	.then(data => serverCopy = JSON.parse(data));
}

async function refreshAll() {
	const waitHere = await readFile();
	for (foodItem in serverCopy) {
		displayFoodItem(foodItem);
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
	if (serverCopy[foodItem] == 0)
		document.getElementById(foodItem + "n").setAttribute("class","outstock");
		else
		document.getElementById(foodItem + "n").setAttribute("class","lessstock");
}

function functionSwitch(foodItem, addTrue) {
	if (addTrue)
		serverCopy[foodItem]++;
		else if (serverCopy[foodItem] > 0)
		serverCopy[foodItem]--;
	refreshItem(foodItem);
}

function displayFoodItem(foodItem) {
	var foodDiv = document.createElement("div");
	foodDiv.setAttribute("id",foodItem);
	foodDiv.setAttribute("class","bar");
	
	var foodStatus = document.createElement("p");
	foodStatus.setAttribute("id",foodItem+"Status");
	foodStatus.setAttribute("class","status");
	
	var plusButton = document.createElement("span");
	plusButton.setAttribute("class", "instock");
	plusButton.setAttribute("id", foodItem + "y");
	plusButton.setAttribute("onclick", "functionSwitch(\"" + foodItem + "\",true)");
	plusButton.innerHTML = "ADD";
	
	var minusButton = document.createElement("span");
	minusButton.setAttribute("class", "outstock");
	minusButton.setAttribute("id", foodItem + "n");
	minusButton.setAttribute("onclick", "functionSwitch(\"" + foodItem + "\",false)");
	minusButton.innerHTML = "SUBTRACT";
	
	foodDiv.appendChild(foodStatus);
	foodDiv.appendChild(plusButton);
	foodDiv.appendChild(minusButton);
	document.getElementById("mainBody").appendChild(foodDiv);
}