/* var hoverCountry = document.getElementsByClassName("countries"); // this will generate an array of elements with this class
console.log(hoverCountry);
hoverCountry.forEach(element => { 
    element.addEventListener('mouseenter', () => element.style.fill = 'orange');
}); //im trying to add an event listener to each one

 */
const stateMap = [];

let btns = document.getElementsByClassName("countries");
Array.from(btns).forEach(function (i) {
    console.log(stateMap[i.id]); 
  
    i.addEventListener('mouseenter', function() {
    i.style.fill = 'orange';
    //console.log(i);
    d3.selectAll("rect")
    .filter(function(d) { return d.country == i.id; })
    .style("fill", "orange");
    toolTipThingy(i.id);
  });

  i.addEventListener('mouseleave', function() {
    console.log(stateMap[i.id]);  
    if (stateMap[i.id] != true){
        i.style.fill = 'black';
        //console.log(i);
        d3.selectAll("rect")
        .filter(function(d) { return d.country == i.id; })
        .style("fill", "black");
    } else {i.style.fill = 'orange';}
  });
  
  i.addEventListener('click', function(){
    const state = stateMap[i.id];
    if (state){
        stateMap[i.id] = false;
        i.style.fill = 'black';   
    }
    else{
        stateMap[i.id] = true;
        i.style.fill = 'orange';
    }
  });
});



function toolTipThingy(id){
    var _el = document.getElementById('woo');
 	_el.style.top = event.clientY + "px";
 	_el.style.left = event.clientX + "px";
    _el.innerHTML = id;
}

/* function hover(id) {
    var element = document.getElementById(id);
    element.style.fill = 'orange';
    d3.selectAll("rect")
    .filter(function(d) { return d.country == id; })
    .style("fill", "orange"); 
    console.log('yay');
} */

/* function OnOff(id) {
  var element = document.getElementById(id);
  const state = stateMap[id];
  if (state) {
    stateMap[id] = true;
    element.style.fill = 'black';
    d3.selectAll("rect")
    .filter(function(d) { return d.country == id; })
    .style("fill", "black");        
  }
  else {
    stateMap[id] = false;
    element.style.fill = 'orange';
    d3.selectAll("rect")
    .filter(function(d) { return d.country == id; })
    .style("fill", "orange");    
  }
} */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const dataset = 
[{
    "pop": 59308690,
    "country": "South Africa"
},
{   
    "pop": 2351625,
    "country": "Botswana"
},
{   
    "pop": 1160164,
    "country": "eSwatini"
},
{   
    "pop": 32866268,
    "country": "Angola"
},
{
    "pop": 869595,
    "country": "Comoros"
},
{   
    "pop": 89561404,
    "country": "DRC"
},
{
    "pop": 2142252,
    "country": "Lesotho"
},
{
    "pop": 27691019,
    "country": "Madagascar"
},
{
    "pop": 19129955,
    "country": "Malawi"
},
{
    "pop": 1265740,
    "country": "Mauritius"
},
{
    "pop": 31255435,
    "country": "Mozambique"
},
{   "pop": 2540916,
    "country": "Namibia"
},
{
    "pop": 98462,
    "country": "Seychelles"
},
{
    "pop": 59734213,
    "country": "Tanzania"
},
{
    "pop": 18383956,
    "country": "Zambia"
},
{
    "pop": 14862927,
    "country": "Zimbabwe"
}];
    
const w = 800;
const h = 800;
barHeight = 25;

let scale = d3.scaleLinear();
scale
.domain([10, 89561404])
.range([5,600]);



var graph = d3.select(".chart")
.attr("width", w)
              .attr("height", h)
              .append("svg")
              


var bar = graph.selectAll("g")
  .data(dataset.sort(function(a, b){return b.pop-a.pop}))
  .enter().append("g")
  .attr("width", 1000);
  bar.append("rect")
  .style('width', d => `${scale(d.pop)}px`)
  .attr("height", barHeight)
  .attr("y", (d, i) => {return i*26 })
  bar.append("text")
  
  .attr("x", function(d) { return (scale(d.pop) + 3); })
       .attr("y", (d, i) => {return (i*26) + barHeight/2})
       .attr("dy", ".35em")
       .text(function(d) { return d.country + ": " + numberWithCommas(d.pop); })
       
