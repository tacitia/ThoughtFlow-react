import React, { PropTypes } from 'react';

const propTypes = {
  references: PropTypes.array
};

class ReferenceList extends React.Component {

  constructor(props) {
    super(props);
    this.onReferenceSelection = this.onReferenceSelection.bind(this);
  }

  componentWillMount() {
    console.log(this.props)
    this.props.checkReferencesLoaded();
  }

  onReferenceSelection(reference) {
    console.log(reference)
    this.props.onReferenceSelection(reference);
  }

  render() {
    if (!this.props.references) {
      return <div></div>;
    }
    else {
      return (
        <div className="citation-container">
          {this.props.references.map((ref, i) => {
            const additionalClass = ref.id === (this.props.selectedReference && this.props.selectedReference.id) ? 'active' : '';
            return (<div className={`document-entry ${additionalClass}`} key={_.uniqueId('document-entry-')} onClick={() => this.onReferenceSelection(ref)}>
              <p className="citation-entry thin-text">{i+1}. {ref.title}</p>
              <span className="citation-decorator"><i className="glyphicon glyphicon-warning-sign"></i></span>
            </div>);
          })}
        </div>
      );
    }
  }
}

export default ReferenceList;