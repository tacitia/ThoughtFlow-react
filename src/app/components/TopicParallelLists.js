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

  //***************************************************//
  //*********** Computation Functions Begin ***********//
  //***************************************************//

  //***************************************************//
  //*********** Computation Functions End ***********//
  //***************************************************//

  //***************************************************//
  //*********** Draw Functions Begin ***********//
  //***************************************************//

  //***************************************************//
  //*********** Draw Functions End ***********//
  //***************************************************//


  function visualize(){
    if(!skeleton.hasData()) return;
    const data = skeleton.data();
    console.log(data)

  }

  function visualizeTopTerms(container, width, height, topTerms) {
    var x = d3.scale.linear()
      .domain([0, TermTopic.getTermPropertyMax('weight')])
      .range([10, width-130]); // 100 pixels are allocated to the texts

    var y = d3.scale.ordinal()
      .domain(d3.range(termBatchSize))
      .rangeBands([0, height], 0.05);

    var term = container.selectAll('.term')
      .data(topTerms, function(d) {
        return d.term;
      });

    term.exit().remove();
    var newTerms = term.enter()
      .append('g')
      .attr('class', 'term');
    term.transition()
      .attr('transform', function(d, i) {
        return 'translate(100, ' + y(i) + ')'; // Each group is moved right by 100, to leave 100 pixels for the texts
      });

    newTerms.append('text')
      .text(function(term) {
        return term.term;
      })
      .attr('font-weight', 300)
      .attr('text-anchor', 'end')
      .attr('dy', 13);

    newTerms.append('rect')
      .attr('width', function(d) {
        return x(d.properties.weight);
      })
      .attr('height', y.rangeBand())
      .attr('fill', '#ccc')
      .attr('transform', 'translate(20, 0)') // Space between rectangles and texts
      .on('mouseover', function(d, i) {
        if ($scope.selectedTerms.indexOf(d.term) >= 0) return;
        d3.select(this).attr('fill', '#a6bddb');
        d3.selectAll('.connection')
          .filter(function(curve) {
            return $scope.selectedTerms.indexOf(curve.term.term) < 0;
          })
          .attr('stroke', function(curve, i) {
            return curve.term.term === d.term ? '#a6bddb' : '#ccc';
          })
          .attr('stroke-width', function(curve, i) {
            return curve.term.term === d.term ? 2 : 1;
          })
          .attr('opacity', function(curve, i) {
            return curve.term.term === d.term ? 0.75 : 0.25;
          });
        topTopicContainer.selectAll('.topic-term-selector')
          .attr('fill', function(topicTerm, i) {
            if ($scope.selectedTerms.indexOf(topicTerm.term) >= 0) {
              return termColorMap(topicTerm.term);
            }
            else if (topicTerm.term === d.term) {
              return '#a6bddb';
            }
            else {
              return '#ccc';
            }
          });
      })
      .on('mouseout', function(d, i) {
        if ($scope.selectedTerms.indexOf(d.term) >= 0) return;
//          d3.select(this).attr('fill', '#ccc');
        updateTermTopicFills();
        d3.selectAll('.connection')
          .filter(function(curve) {
            return $scope.selectedTerms.indexOf(curve.term.term) < 0;
          })
          .attr('stroke', '#ccc')
          .attr('stroke-width', 1)
          .attr('opacity', 0.5);
      })
      .on('click', function(d) {
        if ($scope.selectedTerms.indexOf(d.term) >= 0) {
          Logger.logAction($scope.userId, 'deselect term', 'v2','1', 'explore', {
            term: d.term,
            numSelectedTerms: $scope.selectedTerms.length,
            topicCount: d.properties.topicCount,
            target: 'term index'
          }, function(response) {
            console.log('action logged: deselect term');
          });
          $scope.selectedTerms = _.without($scope.selectedTerms, d.term);
        }
        else {
          Logger.logAction($scope.userId, 'select term', 'v2','1', 'explore', {
            term: d.term,
            numSelectedTerms: $scope.selectedTerms.length,
            topicCount: d.properties.topicCount,
            target: 'term index'
          }, function(response) {
            console.log('action logged: select term');
          });
          $scope.selectedTerms.push(d.term);
        }
//          $scope.updateTermTopicOrdering();
        updateTermTopicFills();
        updateConnectionStrokes();
      });
  }

  return skeleton.mixin({
    visualize
  });
});