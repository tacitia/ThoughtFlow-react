import React, { PropTypes } from 'react';
import {ContentState, Editor, EditorState} from 'draft-js';
import ParagraphWithSidebar from '../components/ParagraphWithSidebar';

function myBlockRenderer(contentBlock) {
  return {
    component: ParagraphWithSidebar,
    editable: true,
  };
}

const propTypes = {
  text: PropTypes.string.isRequired
};

class Paragraph extends React.Component {
  updateParagraphContent(props) {
    const contentState = ContentState.createFromText(props.text);
    this.setState({
      editorState: EditorState.createWithContent(contentState)
    });
  }

  constructor(props) {
    super(props);
    const contentState = ContentState.createFromText(props.text);
    this.state = {
      editorState: EditorState.createWithContent(contentState),
      hasUnsavedChanges: false
    };
    this.onChange = (editorState) => {
      this.setState({
        editorState,
        hasUnsavedChanges: true
      });
      const content = editorState.getCurrentContent();
    };
    this.onParagraphSelect = this.onParagraphSelect.bind(this);
    this.onCitationSelect = this.onCitationSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    setInterval(() => {
      if (this.state.hasUnsavedChanges) {
        this.saveText();
      }
    }, 5000);
  }

  componentDidMount() {
    this.updateParagraphContent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateParagraphContent(nextProps);
  }  


  onChange(editorState) {
    this.setState(editorState);
    console.log(editorState.getCurrentContent().getPlainText())
    console.log(editorState.getSelection().serialize())
    this.setState({
      hasUnsavedChanges: true
    });
  }

  onParagraphSelect() {

  }

  onCitationSelect() {

  }

  saveText() {
    console.log('save text')
  }

  render() {
    return (
      <div>
        <Editor 
          editorState={this.state.editorState} 
          onChange={this.onChange}
          blockRendererFn={myBlockRenderer}
        />
      </div>
    );
  }
}

Paragraph.propTypes = propTypes;

export default Paragraph;

/*
        <p className="text-paragraph active-paragraph" contentEditable="true" 
          onClick={() => this.onParagraphSelect(i, 'text')}
          onChange={this.onChange}>
          <span className="thin-text">{this.props.text}</span>
        </p>

          <div>
            <p className="sidebar-text" onClick={() => this.onParagraphSelect(i, 'topic')}>Topic: {this.props.info.topicString}</p>
            <br/>
            <p className="sidebar-text">Cited: 
              {this.props.citations.map(c => <span>[<a onClick={this.onCitationSelect}>{c.index+1}</a>]</span>)}
            </p>
          </div>
          */