import { connect } from 'react-redux';

import { fetchTopicsIfNeeded, selectTerm, selectTopic, deselectTerm } from '../actions/topicActions';
import { getVisibleTopics, getVisibleTerms, getTermPropertyMax } from '../selectors/topicSelectors';
import TopicModel from '../components/TopicModel';

const mapStateToProps = (state) => {
  return { 
    terms: getVisibleTerms(state),
    topics: getVisibleTopics(state),
    selectedTerms: state.topicReducer.selectedTerms,
    selectedTopic: state.topicReducer.selectedTopic,
    termTopicProperties: {
      maxWeight: getTermPropertyMax(state)
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkTopicsLoaded: () => {
      dispatch(fetchTopicsIfNeeded());
    },
    selectTerm: (term) => {
      dispatch(selectTerm(term));
    },
    selectTopic: (topic) => {
      dispatch(selectTopic(topic));
    },
    deselectTerm: (term) => {
      dispatch(deselectTerm(term));      
    }
  };
};

const TopicModelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicModel);

export default TopicModelContainer;