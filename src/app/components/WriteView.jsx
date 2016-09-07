import React from 'react';

import ArticleListContainer from '../containers/ArticleListContainer';
import ArticleEditorContainer from '../containers/ArticleEditorContainer';
import ReferenceLists from '../components/ReferenceLists';

function WriteView() {
  return (
    <div id="write-view">
      <ArticleListContainer />
      <ArticleEditorContainer />
      <ReferenceLists />
    </div>
  );
}

export default WriteView;
