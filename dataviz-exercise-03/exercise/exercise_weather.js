
/*
	Run the action when we are sure the DOM has been loaded
	https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
	Example:
	whenDocumentLoaded(() => {
		console.log('loaded!');
		document.getElementById('some-element');
	});
*/
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25,16];


// Part 1 - DOM

whenDocumentLoaded(() => {
	// Part 1.1: Find the button + on click event

	let btn = document.getElementById("btn-part1");
	btn.onclick = function(){
			let btn = document.getElementById("btn-part1");
			btn.innerText = 'The button was clicked';
			};


	// Part 1.2: Write temperatures
	let div1 = document.getElementById("weather-part1");
	showTemperatures(div1,TEST_TEMPERATURES);

});

function showTemperatures(container_element, temperature_array){
	container_element.innerHTML = ""
		let createP = (val)=>{
			let p = document.createElement('p');
			if(val > 23){ p.setAttribute("class","warm");};
			if(val<17){ p.setAttribute("class","cold"); };
			let innerNode = document.createTextNode(val);
			p.appendChild(innerNode);
			return p;
		}

	temp_new = temperature_array.map((val)=>
		{ return createP(val);});
	
	for (let element of temp_new){
		container_element.appendChild(element);
	};
};

// Part 2 - class

class Forecast {

}

// Part 3 - fetch

const QUERY_LAUSANNE = 'http://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Lausanne") and u="c"';

function yahooToTemperatures(data) {
}

class ForecastOnline extends Forecast {
}

// Part 4 - interactive

