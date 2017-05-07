global.d3.iconGraph = function(selector){
   var element = d3.select(selector);

   var iconGraph = {
       properties: function(properties){
           if(!properties.percent)
               properties.percent = 100;

           element.style('background', 'url(' + properties.emptyGraph + ')')
               .style('width', properties.width)
               .style('position', 'relative')
               .style('height', properties.height);


           var d3graph = element.append('div');
           d3graph.style('background','url('+ properties.fullGraph +')');
           d3graph.style('width', properties.width);
           d3graph.style('height', properties.height);
           d3graph.style('position', 'absolute');
           d3graph.style('z-index', '1000');
           d3graph.style('clip','rect(' + properties.height + ' ' + properties.width + ' ' + properties.height + ' 0px)');

           var height = parseFloat(properties.height.replace( /^\D+/g, ''))*(1 - (properties.percent/100));

           var t = d3.transition().duration(1500);
           d3graph.transition(t).style('clip','rect(' + height + 'px ' + properties.width + ' ' + properties.height + ' 0px)');
       }
   };

    return iconGraph;
}


global.d3.barGraph = function(selector) {
  var element = d3.select(selector)

  var barGraph = {
    properties: function(props) {
      var yScale = d3.scaleLinear()
        .domain([0, d3.max(props.data) + 5])
        .range([0, props.height]);

      var xScale = d3.scaleBand()
        .domain(d3.range(0, props.data.length))
        .padding(0.2)
        .range([0, props.width]);

      var myChart = element.append('svg')
          .attr('width', props.width)
          .attr('height', props.height)
          .append('g')
          .style('background', '#C9D7D6')
          .selectAll('rect')
          .data(props.data)
          .enter()
          .append('rect')
          .style('fill', function(d, i) {
              return props.colors[i]; // color(i);
          })
          .attr('width', xScale.bandwidth())
          .attr('x', function(d, i) {
              return xScale(i);
          })
          .attr('height', 0)
          .attr('y', props.height);

      myChart.transition()
          .attr('height', function(d){
              return yScale(d);
          })
          .attr('y', function(d){
              return props.height - yScale(d);
          })
          .delay(function(d, i){
              return i * 20;
          })
          .duration(1000)
          .ease(d3.easeElastic)
    }
  }

  return barGraph;
}

