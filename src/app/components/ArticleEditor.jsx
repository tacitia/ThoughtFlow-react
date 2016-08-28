import React, { PropTypes } from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ContentState, Editor, EditorState } from 'draft-js';
import ParagraphWithSidebar from '../components/ParagraphWithSidebar';
//import Paragraph from './Paragraph';

function paragraphBlockRenderer(contentBlock) {
  return {
    component: ParagraphWithSidebar,
    editable: true,
  };
}

const propTypes = {
  article: PropTypes.object
};

class ArticleEditor extends React.Component {
  /*
  updateParagraphs(article) {
    if (!article) return;
    const paragraphs = _.filter(article.content.split('\n'), text => text !== '');
    this.setState({
      paragraphs,
      keys: paragraphs.map(p => _.uniqueId('paragraph_'))
    });
  }
  */
  updateParagraphContent(props) {
    if (!props.article) return;
    const contentState = ContentState.createFromText(props.article.content);
    this.setState({
      editorState: EditorState.createWithContent(contentState)
    });
  }

  saveText() {
    console.log('save text')
    const newContent = this.state.editorState.getCurrentContent().getPlainText('\n');
    console.log(newContent)
    this.props.onSaveArticleRequest(1001, this.props.article.id, this.props.article.title, newContent);
  }

  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      hasUnsavedChanges: false,
      saveStatus: 'saved'
    };
    this.onChange = (editorState) => {
      this.setState({
        editorState,
        hasUnsavedChanges: true
      });
      const content = editorState.getCurrentContent();
    };
//    this.onParagraphSelect = this.onParagraphSelect.bind(this);
//    this.onCitationSelect = this.onCitationSelect.bind(this);
//    this.onChange = this.onChange.bind(this);
    setInterval(() => {
      if (this.state.hasUnsavedChanges) {
        this.setState({
          hasUnsavedChanges: false
        });
        this.saveText();
      }
    }, 5000);
//    this.onSaveTextButtonClick = this.onSaveTextButtonClick.bind(this);
  }

  componentWillMount() {
    this.updateParagraphContent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateParagraphContent(nextProps);
  }    

  onSaveTextButtonClick() {

  }

  render() {
    let statusLabel = null;
    const tooltip = (
      <Tooltip id="tooltip">Changes are auto-saved every 5 seconds</Tooltip>
    );

    switch (this.state.saveStatus) {
      case 'saved':
        statusLabel = <Button bsSize="xs" disabled><span className="status-label">Saved</span></Button>;
        break;
      case 'unsaved':
        statusLabel = (<Button bsSize="xs" bsStyle="primary" disabled onClick={this.onSaveTextButtonClick}>
          <span className="status-label">Saved</span>
        </Button>);
        break;
      case 'saving':
        statusLabel = <Button bsSize="xs" disabled><span className="status-label">Saving...</span></Button>;
        break;
      case 'failed':
        statusLabel = <Button bsSize="xs" bsStyle="danger" disabled><span className="status-label">Error occurred while saving!</span></Button>;
        break;
      default:
        statusLabel = null;
    }
    console.log(this.props)
    return (
      <div id="article-editor">
        <div>
          <h4>{this.props.article ? this.props.article.title : ''}</h4>
          <OverlayTrigger placement="right" overlay={tooltip}>
            {statusLabel}
          </OverlayTrigger>
        </div>
        {
          this.props.article 
          ? <Editor 
              editorState={this.state.editorState} 
              onChange={this.onChange}
              blockRendererFn={paragraphBlockRenderer}
            /> 
          : <div></div>
        }
      </div>
    );
  }
}

ArticleEditor.propTypes = propTypes;

export default ArticleEditor;  

/*
        {
          this.state.paragraphs.map((p, i) => <Paragraph key={this.state.keys[i]}
            text={p}
          />)
        }
        */
