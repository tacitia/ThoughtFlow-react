import React, { PropTypes } from 'react';

const propTypes = {
};

class ReferenceDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    const noSelectionMessage = (<p className="empty-placeholder">
      <i>Please select a citation to see its details.</i>
    </p>);
    const selectedWords = this.props.reference ? this.props.reference.abstract.split(' ') : [];
    const metadata = this.props.reference ? JSON.parse(this.props.reference.metadata) : {};
    return (<div className="reference-details">
      <h5>Selected citation</h5>
      {
        this.props.reference 
          ? (<div>
              <p>
                <b><span className="small-cap-text">Authors</span></b>: 
                <span className="thin-text">{metadata.AUTHOR}</span>
              </p>
              <p>
                <b><span className="small-cap-text">Affiliation</span></b>: 
                <span className="thin-text">{metadata.AFFILIATION}</span>
              </p>
              <p>
                <b><span className="small-cap-text">Publication date</span></b>: 
                <span className="thin-text">{metadata.DATE}</span>
              </p>
              <p><b><span className="small-cap-text">Abstract</span></b>:</p>
              {selectedWords.map(w => <span className="small-text">{w} </span>)}
          </div>)
          : noSelectionMessage
      }   
    </div>);
  }
}

export default ReferenceDetails;

/*      <div ng-if="selectedEvidence!==null" style="overflow-y:scroll;height:300px;">
        <div class="row" style="margin:10px">
          <button class="btn btn-default btn-xs col-md-12" ng-class="{'btn-success': showCitingTexts}" ng-disabled="associationInactive('evidence')" ng-click="toggleShowCitingTexts()">Who cited me?</button>
        </div>

      </div> */