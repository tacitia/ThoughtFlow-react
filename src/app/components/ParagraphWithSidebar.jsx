import React, { PropTypes } from 'react';
import { EditorBlock } from 'draft-js';

class ParagraphWithSidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="paragraph-with-sidebar">
        <EditorBlock {...this.props} />
        <div className="paragraph-sidebar">
          <p>abcde</p>
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

        <p className="text-paragraph active-paragraph" contentEditable="true" 
          onClick={() => this.onParagraphSelect(i, 'text')}
          onChange={this.onChange}>
          <span className="thin-text">{this.props.text}</span>
        </p>
          */