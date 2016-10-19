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
      topics: this.props.topics ? this.props.topics.topics : null,
      connections: this.props.topics ? this.props.topics.termTopicConnections : null,
      termTopicProperties: this.props.termTopicProperties,
      selectedTerms: this.props.selectedTerms,
      selectedTopic: this.props.selectedTopic
    };

    return (
      <div>
        <TopicParallelLists 
          data={data} 
          onTermSelect={this.props.selectTerm}
          onTermDeselect={this.props.deselectTerm}
          onTopicSelect={this.props.selectTopic}
        />
      </div>
    );
  }
}

TopicModel.propTypes = propTypes;

export default TopicModel;