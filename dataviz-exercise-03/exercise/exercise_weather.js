
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

	let div2 = document.getElementById("weather-part2");
	let obj = new Forecast(div2) 
	obj.show()

	let div3 = document.getElementById("weather-part3");	
	let obj2 = new ForecastOnline(div3) 
	obj2.show()

	let btn = document.getElementById("btn-part1");
	btn.onclick = function(){
			let btn = document.getElementById("btn-part1");
			btn.innerText = 'The button was clicked';
			obj.reload();
			obj2.reload()
			};


	// Part 1.2: Write temperatures
	let div4 = document.getElementById("weather-city");
	let obj3 = new ForecastCity(div4)
	obj3.show('Default')
	
	let search_btn = document.getElementById('btn-city');
	search_btn.onclick = function(){
		const val = document.getElementById('query-city').value;
		obj3.reload(val);

	}


	// Part 1.2: Write temperatures

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

	constructor(cont, temp = [1,2,3,4,5,6,7]){
		this.container = cont;
		this.temperatures = temp;
	}
	toString  (){
		this.container.toString() + " "+this.temperatures.toString()  
	}

	print() {
		console.log(this.toString());
	}
	 show(){
	 	showTemperatures(this.container,this.temperatures);
	 }
	 reload(){
	 	this.temperatures = TEST_TEMPERATURES
	 	this.show(this.temperatures)
	 }


}

// Part 3 - fetch

const QUERY_LAUSANNE = 'http://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Lausanne") and u="c"';
let data = undefined
data = fetch(QUERY_LAUSANNE).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    //console.log(Object.keys(myJson['query']['results']['channel']['item']['forecast']));
    //console.log(myJson['query']['results']['channel']['item']['forecast']);

  });

function yahooToTemperatures(data) {
	myJson = data
	array = myJson['query']['results']['channel']['item']['forecast']
    temp = array.map(d=>{return (Number(d.high)+Number(d.low))/2})
    return temp;
}

class ForecastOnline extends Forecast {
	reload(){
		fetch(QUERY_LAUSANNE).then((res)=>{return res.json()})
		.then((res)=>{ return yahooToTemperatures(res);}).then((res)=>{this.temperatures = res; this.show();});
	}
}

class ForecastCity extends Forecast{

	reload(text){
		let Query = 'http://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+text+'") and u="c"';
		fetch(Query).then((res)=>{return res.json() })
		.then((res)=>{ return yahooToTemperatures(res);}).then((res)=>{this.temperatures = res; this.show(text);}).catch(()=>(console.log('error')));
	}
	show(text){
		super.show();
		let p = document.createElement('p');
		p.setAttribute('class','white');
		let innerNode = document.createTextNode(text);
		p.appendChild(innerNode);
		this.container.insertBefore(p,this.container.children[0]);

	}

}



// Part 4 - interactive

