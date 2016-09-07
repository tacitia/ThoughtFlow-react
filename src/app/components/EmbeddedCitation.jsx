import React, { PropTypes } from 'react';
import { createComponent } from 'react-d3kit';

import PlainCitationSparkline from '../components/CitationSparkline';

const CitationSparkline = createComponent(PlainCitationSparkline);

const propTypes = {
};

class EmbeddedCitation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.checkEvidenceLoaded();
    this.props.checkCitationMapLoaded();
  }

  render() {
    const data = {
      evidence: this.props.evidence,
      refs: this.props.refs,
      cites: this.props.cites
    };

    return (
      <div>
        <CitationSparkline data={data} />
      </div>
    );
  }
}

EmbeddedCitation.propTypes = propTypes;

export default EmbeddedCitation;