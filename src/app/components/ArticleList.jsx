import $ from 'jquery';
import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Loading from 'react-loading';


const propTypes = {
  articles: PropTypes.array,
  selectedArticle: PropTypes.object,
  checkArticlesLoaded: PropTypes.func.isRequired,
  onArticleSelect: PropTypes.func.isRequired
};

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.onArticleEntryClick = this.onArticleEntryClick.bind(this);
    this.onAddTextEntryButtonClick = this.onAddTextEntryButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.checkArticlesLoaded();
  }

  onArticleEntryClick(articleIndex) {
    this.props.onArticleSelect(articleIndex);
  }

  onAddTextEntryButtonClick() {

  }

  render() {
    return (
      <div id="article-list">
        <h4>Proposals</h4>
        {
          this.props.articles 
            ? (
                <table className="table">
                  <tbody>
                  {
                    this.props.articles.map((t, i) =>
                      <tr key={'article-entry'+t.id}>
                        <td onClick={() => this.onArticleEntryClick(i)}>
                          <p>{t.title}</p>
                          <svg className="topic-info" id={"topic-info-"+t.id} width="150" height="25"></svg>
                          <div className={"article-entry" + (t.id===this.props.selectedArticle.id ? '' : 'hidden')}>
                            <Button>
                              <i className="glyphicon glyphicon-bin"></i>
                            </Button>  
                          </div>
                        </td>
                      </tr>
                    )
                  }
                  </tbody>
                </table>
              )             
            : <Loading type='bars' color='#e3e3e3' />
        }
        <ButtonGroup>
          <Button onClick={this.onAddTextEntryButtonClick}>
            <i className="glyphicon glyphicon-plus"></i>
            Add new proposal
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

ArticleList.propTypes = propTypes;

export default ArticleList;