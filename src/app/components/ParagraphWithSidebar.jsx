import React, { PropTypes } from 'react';
import { EditorBlock } from 'draft-js';

class ParagraphWithSidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const recommendation = this.props.blockProps.recommendations[this.props.block.key];
    const topicString = recommendation && recommendation.topics[0].terms
      ? recommendation.topics[0].terms.map(t => t[0]).join(' ')
      : '';
    return (
      <div className="paragraph-with-sidebar">
        <EditorBlock {...this.props} />
        <div className="paragraph-sidebar">
          <p>Topic: {topicString}</p>
          <p>Cited: </p>
        </div>
      </div>
    );
  }
}

export default ParagraphWithSidebar;

/*
{this.props.block.getText()}
          <p className="sidebar-text" onClick={() => this.onParagraphSelect(i, 'topic')}>Topic: {this.props.info.topicString}</p>
          <br/>
          <p className="sidebar-text">Cited: 
            {this.props.citations.map(c => <span>[<a onClick={this.onCitationSelect}>{c.index+1}</a>]</span>)}
          </p>
          */