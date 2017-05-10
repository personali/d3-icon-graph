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


global.d3.scoreCard = function(selector) {
    var element = d3.select(selector)

    var scoreCard = {
      properties: function(props) {
        var colors = {
            'pink': '#E1499A',
            'yellow': '#f0ff08',
            'green': '#47e495'
        };

        var color = '#ffffff';

        var radius = 75;
        var border = 5;
        var padding = 3;
        var startPercent = 0;
        var endPercent = 0.53;

        var twoPi = Math.PI * 2;
        var formatPercent = d3.format('.0%');
        var formatNumber = d3.format('0');
        var boxSize = (radius + padding) * 2;

        var count = Math.abs((endPercent - startPercent) / 0.01);
        var step = endPercent < startPercent ? -0.01 : 0.01;

        var parent = element;

        var svg = parent.append('svg')
            .attr('width', boxSize)
            .attr('height', boxSize);

        var arc = d3.arc()
            .startAngle(0)
            .innerRadius(radius)
            .outerRadius(radius - border);

        var defs = svg.append('defs');

        var filter = defs.append('filter')
            .attr('id', 'blur');

        /*
        filter.append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('stdDeviation', '7');
        */

        var g = svg.append('g')
            .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

        var meter = g.append('g')
            .attr('class', 'progress-meter');

        meter.append('path')
            .attr('class', 'background')
            .attr('fill', '#ccc')
            .attr('fill-opacity', 0.5)
            .attr('d', arc.endAngle(twoPi));

        var foreground = meter.append('path')
            .attr('class', 'foreground')
            .attr('fill', color)
            .attr('fill-opacity', 1)
            .attr('stroke', color)
            .attr('stroke-width', 5)
            .attr('stroke-opacity', 1)
            .attr('filter', 'url(#blur)');

        var front = meter.append('path')
            .attr('class', 'foreground')
            .attr('fill', color)
            .attr('fill-opacity', 1);

        var numberText = meter.append('text')
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .style("font-size", "3em")
            .attr('dy', '-.10em');

        var justText = meter.append('text')
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .attr('dy', '1.0em')
            .text('Out of 100')
            .style("font-size", "1.5em");

        function updateProgress(progress) {
            foreground.attr('d', arc.endAngle(twoPi * progress));
            front.attr('d', arc.endAngle(twoPi * progress));
            numberText.text(formatNumber(progress*100));
        }

        var progress = startPercent;

        (function loops() {
            updateProgress(progress);
            if (count > 0) {
                count--;
                progress += step;
                setTimeout(loops, 10);
            }
        })();
      }
    }

    return scoreCard;
}

global.d3.countUp = function(selector) {
  var element = d3.select(selector);

  var countUp = {
    properties: function(props) {
      var format = d3.format(props.format);
      element
        .transition()
        .duration(props.duration)
        .tween("text", function() {
          var that = d3.select(this),
            i = d3.interpolateNumber(props.start, props.end);
            return function(t) {
              that.text(format(i(t)));
            };
      });
    }
  }

  return countUp;
}
