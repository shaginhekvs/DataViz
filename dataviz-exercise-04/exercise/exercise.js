


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


const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25, 16];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let zipped = TEST_TEMPERATURES.map(
				(e,i)=> {return {'y':e,'x':i+1,'name':DAYS[i]};});




//const MARGIN = { top: 10, right: 10, bottom: 10, left: 10 };


class ScatterPlot {
	/* your code here */
	constructor(name,data){

		let svg = d3.select('svg');
		let scaleX = d3.scaleBand().rangeRound([10, 220])
						.domain(data.map(d=> {return d.name}));
		console.log(data.map(d=> {return scaleX(d.name)}))
		let scaleY = d3.scaleLinear()
						.domain([0,d3.max(data,(d)=> {return d.y})])
						.range([80,0]);
		console.log(data)
		svg.append('g')
			.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('width', 20 )
			.attr('fill','white')
			.attr('y',d=>scaleY(d.y))
          .attr('height', function(d) {  return 80 - scaleY(d.y); })
          .attr('transform', function(d, i) {
            return "translate(" + scaleX(d.name) + ",0)";
          });
        let xAxis = d3.axisBottom(scaleX);
        let yAxis = d3.axisLeft(scaleY);
        svg.append('g').attr("class", "axis").attr("transform", 'translate(-5,80)').call(xAxis);
        svg.append('g').attr("class", "axis").attr("transform", 'translate(8,0)').call(yAxis);
	}
}

whenDocumentLoaded(() => {

	// prepare the data here

	//console.log(data);

	let zipped = TEST_TEMPERATURES.map(
				(e,i)=> {return {'y':e,'x':i+1,'name':DAYS[i]};});
	console.log(zipped)
	const plot = new ScatterPlot('plot', zipped);
});

