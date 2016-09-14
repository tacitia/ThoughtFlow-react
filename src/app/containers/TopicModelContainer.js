import { connect } from 'react-redux';

import { fetchTopicsIfNeeded } from '../actions/topicActions';
import { getVisibleTopics, getVisibleTerms } from '../selectors/topicSelectors';
import TopicModel from '../components/TopicModel';

const mapStateToProps = (state) => {
  return { 
    terms: getVisibleTerms(state),
    topics: getVisibleTopics(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkTopicsLoaded: () => {
      dispatch(fetchTopicsIfNeeded());
    }
  };
};

const TopicModelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicModel);

export default TopicModelContainer;