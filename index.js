global.d3.iconGraph = function(selector){
   var element = d3.select(selector);

   var iconGraph = {
       properties: function(properties){
           if(!properties.percent)
               properties.percent = 100;

           element.style('background', 'url(' + properties.emptyGraph+ ')')
               .style('width', properties.width)
               .style('position', 'relative')
               .style('height', properties.height);

           var d3graph = element.append('div');

           d3graph.style('width', properties.width);
           d3graph.style('height',properties.height);
           d3graph.style('position', 'absolute');
           d3graph.style('clip','rect('+properties.height+ ' ' + properties.width+ ' ' + properties.height + ' 0px)');
           d3graph.style('background','url('+ properties.fullGraph +')');

           var height = parseFloat(properties.height.replace( /^\D+/g, ''))*(1 - (properties.percent/100));

           var t = d3.transition().duration(3500);
           d3graph.transition(t).style('clip','rect(' + height + 'px ' + properties.width + ' ' + properties.height + ' 0px)');

       }
   };

    return iconGraph;
}


