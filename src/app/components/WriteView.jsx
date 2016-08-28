import React from 'react';

import ArticleListContainer from '../containers/ArticleListContainer';
import ArticleEditorContainer from '../containers/ArticleEditorContainer';
import EmbeddedCitation from '../components/EmbeddedCitation';

function WriteView() {
  return (
    <div id="write-view">
      <ArticleListContainer />
      <ArticleEditorContainer />
      <EmbeddedCitation />
    </div>
  );
}

export default WriteView;
