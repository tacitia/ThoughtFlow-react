import { createSelector } from 'reselect';

const getAllTopics = (state) => state.topicReducer.topics;
const getAllTerms = (state) => state.topicReducer.terms;
const getTermTopicMap = (state) => state.topicReducer.termTopicMap;
const getTopicIdMap = (state) => state.topicReducer.topicIdMap;
const getMinTermTopicProb = (state) => state.topicReducer.minTermTopicProb;

// getAllTerms return a list of strings
export const getVisibleTerms = createSelector(
  [ getAllTerms, getTermTopicMap ], 
  (terms, termTopicMap) => {
    if (!terms) return [];
    const termOrders = {};
    termOrders.weight = d3.range(terms.length).sort((i, j) => termTopicMap[terms[j]].weight - termTopicMap[terms[i]].weight);
    const start = 0;
    const topNum = 50;
    const sortedTermIndice = _.take(_.drop(termOrders.weight, start), topNum);
    return sortedTermIndice.map(function(i) {
      return {
        term: terms[i],
        origIndex: i,
        properties: termTopicMap[terms[i]]
      };
    });
  }
);

export const getVisibleTopics = createSelector(
  [ getVisibleTerms, getAllTopics, getTopicIdMap], 
  (terms, topics, topicIdMap) => {
    if (!topics) return [];
    // Compute the total weight for each topic, i.e. the weight of all the topic's terms that are 
    // among the top terms
    const topicMap = {};
    const termTopicConnections = [];
    const selectedTerms = [];
    const top = 50;

    terms.forEach(term => {
      term.properties.topics.forEach(function(topic) {
        if (topicMap[topic.id] === undefined) { 
          topicMap[topic.id] = 0;
        }
        var weight = 1;
        if (selectedTerms !== undefined && selectedTerms.length > 0) {
          if (selectedTerms.indexOf(term.term) >= 0) {
            weight = Math.ceil(1 / minTermTopicProb);
          }
        }
        topicMap[topic.id] += topic.prob * weight;

        termTopicConnections.push({
          term: term,
          topic: topicIdMap[topic.id]
        });
      });
    });

    const sortedTopics = _.keys(topicMap).map(function(topicId) {
      const topic = topicIdMap[topicId];
      topic.variable = {};
      topic.variable.weight = topicMap[topicId];
      return topic;
    }).sort(function(topic1, topic2) {
      return topic2.variable.weight - topic1.variable.weight;
    });

    const topTopics = _.take(sortedTopics, top);
    const topTopicIds = topTopics.map(t => t.id);

    return {
      topics: topTopics,
      termTopicConnections: _.filter(termTopicConnections, function(c) {
        return topTopicIds.indexOf(c.topic.id) >= 0;
      })
    }
  }
);

export const getTermPropertyMax = createSelector(
  [ getAllTerms, getTermTopicMap ],
  (terms, termTopicMap) => {
    if (!terms) return -1;
    return _.max(terms.map(term => termTopicMap[term].weight));    
  }
);