import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEDocumentsListRequest } from '../../../../../actions/dashboard';
import { generateId } from '../../../../../utils/dashboardUtils';
import { changeActiveDocumentsTab } from '../../../../../actions/profile';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

class Documents extends Component {
  constructor(props) {
    super(props);
    this.setActiveDocumentTab = this.setActiveDocumentTab.bind(this);
    this.setActiveClassForTabName = this.setActiveClassForTabName.bind(this);
  }
  componentDidMount() {
    if (!this.props.activeDocumentsTab) this.props.setActiveDocumentTab('account_statements');
    this.props.getEDocumentsListRequest();
  }
  setActiveDocumentTab(e) {
    this.props.setActiveDocumentTab(e.target.getAttribute('name'));
  }
  setActiveClassForTabName(tabName) {
    if (this.props.activeDocumentsTab === tabName) {
      return 'documents-tabs-bar__item_active';
    }
    return '';
  }

  render() {
    if (!this.props.documentsList || this.props.loading) {
      return (

       <div className="tab-container position-relative">
        <div className="loader">
          <CircularProgress
            size={50}
            style={{ color: '#98c73a' }}
          />
        </div>
       </div>
      );
    }
    return (
      <div className="tab-container">
        <div className="documents-tabs">
          <ul className="documents-tabs-bar">
            <li
              className={`documents-tabs-bar__item ${this.setActiveClassForTabName('account_statements')}`}
              name="account_statements"
              onClick={this.setActiveDocumentTab}
            >Account Statements
            </li>
            <li
              className={`documents-tabs-bar__item ${this.setActiveClassForTabName('trade_confirmations')}`}
              name="trade_confirmations"
              onClick={this.setActiveDocumentTab}
            >Trade Confirmations
            </li>
            <li
              className={`documents-tabs-bar__item ${this.setActiveClassForTabName('tax_documents')}`}
              name="tax_documents"
              onClick={this.setActiveDocumentTab}
            >Tax Documents
            </li>
            <li
              className={`documents-tabs-bar__item ${this.setActiveClassForTabName('compliance')}`}
              name="compliance"
              onClick={this.setActiveDocumentTab}
            >Compliance
            </li>
          </ul>
          <hr className="documents-tabs-bar__line" />
        </div>
        <div className="tab-container__wrapper">
          <ul className="default-list">
            { !this.props.documentsList[this.props.activeDocumentsTab] && 'No eDocuments found' }
            { this.props.documentsList[this.props.activeDocumentsTab] &&
              this.props.documentsList[this.props.activeDocumentsTab].map(item => (
                <li className="default-list__item" key={item.id}>
                  <a href={item.link} target="_blank" className="default-list__item-link">
                    {item.name} {item.date}
                  </a>
                  {item.inserts && item.inserts.length > 0 && item.inserts.map((insert, index) => (
                    <a href={insert} target="_blank" key={generateId()} className="default-list__item-link ml-3">
                      insert{index + 1}
                    </a>
                  ))}
                </li>
              ))
            }

          </ul>
        </div>
      </div>
    );
  }
}

Documents.propTypes = {
  documentsList: PropTypes.object,
  activeDocumentsTab: PropTypes.string,
  loading: PropTypes.bool,
  getEDocumentsListRequest: PropTypes.func.isRequired,
  setActiveDocumentTab: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    documentsList: state.dashboard.eDocumentsList,
    activeDocumentsTab: state.profile.activeDocumentsTab,
    loading: state.dashboard.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getEDocumentsListRequest: () => dispatch(getEDocumentsListRequest()),
    setActiveDocumentTab: name => dispatch(changeActiveDocumentsTab(name)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
