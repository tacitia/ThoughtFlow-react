import { connect } from 'react-redux';

import Paragraph from '../components/Paragraph';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const ParagraphContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Paragraph);

export default ParagraphContainer;