import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parseDateString } from '../../../utils/dashboardUtils';
import { setCompleteAction } from '../../../actions/dashboard';


function mapDispatchToProps(dispatch) {
  return ({
    setCompleteAction: id => dispatch(setCompleteAction(id)),
  });
}

class NotificationsCard extends Component {
  getColorByType(type, viewed, completed) {
    if (type !== 'action' && viewed) return 'white';
    switch (type) {
      case 'action':
        return completed ? 'white' : 'red';
      case 'notification':
        return 'green';
      default:
        return 'white';
    }
  }

  parseTimestamp(timestamp) {
    if (!timestamp) return '';
    const delta = Math.floor((Date.now() / 1000) - timestamp);
    if (delta < 60) return `${delta} seconds ago`;
    if (delta < 3600) return `${Math.floor(delta / 60)} minutes ago`;
    if (delta < 86400) return `${Math.floor(delta / 3600)} hours ago`;
    return parseDateString(timestamp);
  }

  handleClickOnCompleteAction = () => {
    this.props.setCompleteAction(this.props.id);
  };

  render() {
    return (
      <div className={`notifications-card notifications-card_popup background_${this.getColorByType(this.props.type, this.props.viewed, this.props.completed)}`}>
        <div className="notifications-card__img">
          <span className="img-border" />
          <i className="image" />
        </div>
        <div className={`notifications-card__message ${this.props.page ? 'fs-15' : 'fs-12'}`}>
          <div className="d-flex justify-content-between">
            <div>
              <p className="message-title">{this.props.title || 'PEGA Earnings Announcement'}</p>
              <p className="message-text">{this.props.text || 'PEGA announced quarterly of $0.00 per share, missing expectations by $0.21'}</p>
            </div>
            {this.props.type === 'action' && this.props.complete &&
            (<div>
              <button className="icon-dots"/>
                <div>
                  <button className="btn-complete" onClick={this.handleClickOnCompleteAction}>Mark as complete</button>
                </div>
            </div>)}
          </div>
          <p className={`message-date ${this.props.popup && 'horizontal-align_end'}`}>{this.parseTimestamp(this.props.timestamp)}</p>
        </div>
      </div>
    );
  }
}


export default connect(null, mapDispatchToProps)(NotificationsCard);