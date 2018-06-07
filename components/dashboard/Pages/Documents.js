import React from 'react';
import { AccountStatements } from '../../../localdata/profileData';

const Documents = () => (
  <div className="tab-container">
    <div className="tab-container__wrapper">
      <h2 className="title-part title-part_md-big">Account Statements</h2>
      <ul className="default-list">
        {
          AccountStatements.map(item => (
            <li className="default-list__item" key={item.id}>{item.title}</li>
          ))
        }
      </ul>
    </div>
  </div>
);
export default Documents;
