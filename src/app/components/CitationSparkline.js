import d3 from 'd3';
import d3Kit from 'd3kit';
import d3Tip from 'd3-tip';

d3.tip = d3Tip;

const DEFAULT_OPTIONS = {
  margin: {top: 10, right: 10, bottom: 10, left: 10},
  initialWidth: 300,
  initialHeight: 70,
};

const CUSTOM_EVENTS = [
  'eventClick'
];


export default d3Kit.factory.createChart(DEFAULT_OPTIONS, CUSTOM_EVENTS,
function constructor(skeleton){
  // alias
  const options = skeleton.options();
  const dispatch = skeleton.getDispatcher();
  const layers = skeleton.getLayerOrganizer();

  layers.create(['citation-lines']);
  dispatch.on('data', visualize);

  const dateScale = d3.scale.linear();
  const paperCountScale = d3.scale.pow().exponent(1);

  //***************************************************//
  //*********** Computation Functions Begin ***********//
  //***************************************************//

  function countDates(eArray, targetMap, minYear, maxYear, evidence) {
    for (var i = minYear; i <= maxYear; ++i) {
      targetMap.total[i] = 0;
      targetMap.bookmarked[i] = 0;
    }
    eArray.forEach(function(e) {
      if (typeof e.metadata == 'string') {
        e.metadata = JSON.parse(e.metadata);
      }
      var date = getEvidenceDate(e);
      if (date === 0 || date < minYear || date > maxYear) return;
      targetMap.total[date] += 1;
      if (e.bookmarked === 0) {
        targetMap.bookmarked[date] += 1;
      }
    })
    return _.max(_.values(targetMap.total));
  }

  function getEvidenceDate(evidence) {
    var evidenceYear = 0;
    if (evidence.metadata.DATE !== undefined) {
      evidenceYear = parseInt(evidence.metadata.DATE);
    }
    else if (evidence.metadata.YEAR !== undefined) {
      evidenceYear = parseInt(evidence.metadata.YEAR);        
    }
    return evidenceYear;
  }

  //***************************************************//
  //*********** Computation Functions End ***********//
  //***************************************************//

  //***************************************************//
  //*********** Draw Functions Begin ***********//
  //***************************************************//

  function drawBar(paperMap, type, color, offset) {
    var years = _.keys(paperMap).map(function(d) {
      return parseInt(d);
    })
    layers.get('citation-lines').selectAll('.' + type + '-line')
      .data(years)
      .enter()
      .append('line')
      .attr('class', type + '-line')
      .attr('x2', function(d) { return dateScale(d) + offset; })
      .attr('x1', function(d) { return dateScale(d) + offset; })
      .attr('y2', function(d) { return paperCountScale(paperMap[d]); })
      .attr('y1', function(d) { return paperCountScale(0); })
      .attr('stroke', color)
      .attr('stroke-width', 4);
    return;
  }

  function drawPointer() {
    layers.get('citation-lines').append('line')
      .attr('id', 'pointer')
      .attr('x1', -1)
      .attr('x2', -1)
      .attr('y1', 0)
      .attr('y2', skeleton.getInnerHeight())
      .attr('stroke', 'black')
      .attr('stroke-width', 1);
  }

  function updatePointer(x, citationInfo, evidenceYear) {
    const layer = layers.get('citation-lines');
    layer.select('#pointer')
      .attr('x1', x)
      .attr('x2', x);
    var infoText = '';
    if (x !== -1) {
      year = Math.ceil(dateScale.invert(x));
      if (year < evidenceYear) {
        totalPaper = citationInfo.references.total[year];          
        bookmarkedPaper = citationInfo.references.bookmarked[year]; 
        infoText += 'References from ' + year + ':';
        infoText += totalPaper + ' (bookmarked ' + bookmarkedPaper + ')';     
      }
      else if (year > evidenceYear) {
        totalPaper = citationInfo.citations.total[year];
        bookmarkedPaper = citationInfo.citations.bookmarked[year];
        infoText += 'Citations from ' + year + ':';
        infoText += totalPaper + ' (bookmarked ' + bookmarkedPaper + ')';
        layer.selectAll('.cite-total-circle').attr('r', 1);
        layer.selectAll('.cite-bookmarked-circle').attr('r', 1);  
        layer.select('#cite-total-circle-' + year).attr('r', 2);          
        layer.select('#cite-bookmarked-circle-' + year).attr('r', 2);     
      }
      else {
        infoText += 'Paper published in ' + year
      }
    }
    layer.select('#dateInfo')
      .text(infoText);
  }

  function drawLine(paperMap, type, color, fillArea) {
    const layer = layers.get('citation-lines');
    var line = d3.svg.line()
      .x(function(d) { return dateScale(d); })
      .y(function(d) { return paperCountScale(paperMap[d]); })
      .interpolate("linear");
    var years = _.keys(paperMap).map(function(d) {
      return parseInt(d);
    })
    layer.selectAll('.' + type + '-circle')
      .data(years)
      .enter()
      .append('circle')
      .attr('class', type + '-circle')
      .attr('id', function(d) {
        return type + '-circle-' + d ;
      })
      .attr('r', 1)
      .attr('stroke', 'steelblue')
      .attr('fill', 'white')
      .attr('cx', function(d) {
        return dateScale(d);
      })
      .attr('cy', function(d) {
        return paperCountScale(paperMap[d]);
      });

    layer.append('path')      
      .datum(years)  
      .attr('d', line)
      .attr('stroke', color)
      .attr('fill', 'none')
    if (fillArea) {
      var area = d3.svg.area()
        .y0(paperCountScale(0))
        .x(function(d) { return dateScale(d); })
        .y1(function(d) { return paperCountScale(paperMap[d]); })
      layer.append('path')      
        .datum(years)  
        .attr('d', area)
        .attr('fill', color);
    }
  }

  //***************************************************//
  //*********** Computation Functions End ***********//
  //***************************************************//


  function visualize(){
    if(!skeleton.hasData()) return;

    const data = skeleton.data();

    var citeInfo = {
      citations: {
        total: {},
        bookmarked: {},
        // The keys should come in the same order in citations and references
        topics: {}
      },
      references: {
        total:{},
        bookmarked: {},
        topics: {}
      }
    };

    var evidenceYear = getEvidenceDate(data.evidence);
//    var refs = Paper.getReferencesForPaper(scope.e.id);
//    var cites = Paper.getCitationsForPaper(scope.e.id);
    var maxCountCite = countDates(data.cites, citeInfo.citations, Math.min(2016, evidenceYear+1), 2016, evidenceYear);
    var maxCountRef = countDates(data.refs, citeInfo.references, 1985, Math.max(1985, evidenceYear-1), evidenceYear);
    dateScale
      .domain([1985, 2016])
      .range([5, skeleton.getInnerWidth()]);
    paperCountScale
      .domain([Math.max(maxCountCite, maxCountRef), 0])
      .range([10, skeleton.getInnerHeight()]);
    // Now we can start visualizing...
    drawPointer();
    drawLine(citeInfo.citations.total, 'cite-total', 'grey', false);
    drawBar(citeInfo.references.total, 'ref-total', 'grey', -2);
    drawLine(citeInfo.citations.bookmarked, 'cite-bookmarked', 'steelblue', true);
    drawBar(citeInfo.references.bookmarked, 'ref-bookmarked', 'steelblue', 2);
    layers.get('citation-lines').on('mousemove', function(d) {
      updatePointer(d3.mouse(this)[0], citeInfo, evidenceYear);
    });
    layers.get('citation-lines').on('mouseout', function(d) {
      updatePointer(-1);
    })
    layers.get('citation-lines').selectAll('#this-paper')
      .data([data.evidence])
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('fill', 'crimson')
      .attr('cx', dateScale(evidenceYear))
      .attr('cy', paperCountScale(0))

    layers.get('citation-lines').append('text')
      .attr('id', 'dateInfo')
      .attr('transform', 'translate(20, ' + (skeleton.getInnerHeight() + 1) + ')')
      .text(function(d) {
        return '';
      })
      .attr('font-size', 10);
  }

  return skeleton.mixin({
    visualize
  });
});