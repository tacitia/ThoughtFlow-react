import React from 'react';
import CitedReferenceListContainer from '../containers/CitedReferenceListContainer';
import BookmarkedReferenceListContainer from '../containers/BookmarkedReferenceListContainer';
import RecommendedReferenceListContainer from '../containers/RecommendedReferenceListContainer';
import ReferenceDetailsContainer from '../containers/ReferenceDetailsContainer';
import { Tab, Tabs } from 'react-bootstrap';

function ReferenceLists() {
  return (
    <div id="reference-lists">
      <Tabs defaultActiveKey={1} id="reference-tabs">
        <Tab eventKey={1} title="Recommended">
          <RecommendedReferenceListContainer />
        </Tab>
        <Tab eventKey={2} title="Cited">
          <CitedReferenceListContainer />
        </Tab>
        <Tab eventKey={3} title="Bookmarked">
          <BookmarkedReferenceListContainer />        
        </Tab>
      </Tabs>
      <ReferenceDetailsContainer />
    </div>
  );
}

export default ReferenceLists;
