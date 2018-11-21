import React, { Component } from 'react';
import {connect} from "react-redux";
import {
  getEDocumentsListRequest,
} from "../../../../../actions/dashboard";
import { generateId } from '../../../../../utils/dashboardUtils';

// import { AccountStatements } from '../../../../../localdata/profileData';
//
// const Documents = () => (
//   <div className="tab-container">
//     <div className="tab-container__wrapper">
//       <h2 className="title-part title-part_md-big">Account Statements</h2>
//       <ul className="default-list">
//         {
//           AccountStatements.map(item => (
//             <li className="default-list__item" key={item.id}>{item.title}</li>
//           ))
//         }
//       </ul>
//     </div>
//   </div>
// );

class Documents extends Component {
  componentDidMount() {
    this.props.getEDocumentsListRequest();
  }


  render() {
    return (
      <div className="tab-container">
        <div className="tab-container__wrapper">
          <h2 className="title-part title-part_md-big">EDocuments</h2>
          <ul className="default-list">
            {
              this.props.documentsList.map(item => (
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
            {this.props.documentsList.length === 0 && <li className="default-list__item">
              EDocuments not found
            </li>}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    documentsList: state.dashboard.eDocumentsList,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getEDocumentsListRequest: () => dispatch(getEDocumentsListRequest()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
