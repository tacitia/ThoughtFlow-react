import React, { PropTypes } from 'react';
import { createComponent } from 'react-d3kit';

import PlainTopicParallelLists from '../components/TopicParallelLists';

const TopicParallelLists = createComponent(PlainTopicParallelLists);

const propTypes = {
};

class TopicModel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props)
    this.props.checkTopicsLoaded();
  }

  render() {
    const data = {
      terms: this.props.terms,
      topics: this.props.topics
    };

    return (
      <div>
        <TopicParallelLists data={data} />
      </div>
    );
  }
}

TopicModel.propTypes = propTypes;

export default TopicModel;