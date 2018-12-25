import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import WidgetDotsMenu from './WidgetDotsMenu';
import AssetAmountRange from './AssetAmountRange';
import Switcher from './Switcher';
import { openInfoPopup } from '../../../actions/dashboard';
import Icons from '../../../constants/Icons';
import DashboardIcon from '../DashboardIcon';


class WidgetHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fxButtonContent: 'Local',
    };
    this.toggleFX = this.toggleFX.bind(this);
  }

  toggleFX() {
    this.setState(prevState => ({ fxButtonContent: prevState.fxButtonContent === 'Local' ? 'Active' : 'Local' }));
  }
  render() {
    const { widget } = this.props;
    const { fxButtonContent } = this.state;
    const widgetIcon = widget.icon && `icon${widget.icon.charAt(0).toUpperCase() + widget.icon.slice(1)}`;

    return (
      <div className="widget__head">

        <div className="widget__title-row">
          {
            widget.icon &&
            <DashboardIcon
              name={Icons[widgetIcon].id}
              viewBox={Icons[widgetIcon].viewBox}
              className="widget__icon"
            />
          }
          <h3 className="widget__title">{widget.title}</h3>
          {
            widget.info && (
              <button
                className="info-popup__btn"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.openInfoPopup(widget.id);
                }}
              >
                <i className="registration__icon" />
              </button>)
          }
        </div>
        <div className="widget__row-buttons">
          {widget.assetAmountRange &&
          <AssetAmountRange
            widgetName={widget.id}
            assetsRangeFrom={this.props.assetsRangeFrom}
            assetsRangeTo={this.props.assetsRangeTo}
            setInputValueById={this.props.setInputValueById}
            resetRange={this.props.resetRange}
          />
          }
          {widget.switcher &&
          <Switcher
            selectedLeague={this.props.selectedLeague}
            toggleLeague={this.props.toggleLeague}
          />}
          {
            widget.localFX &&
            <button
              className="btn-widget-head btn-widget-head_green"
              onClick={this.toggleFX}
            >{fxButtonContent} FX
            </button>
          }
          {
            widget.dots &&
            <WidgetDotsMenu
              name={widget.title}
            />
          }
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    openInfoPopup: name => dispatch(openInfoPopup(name)),
  }),
)(WidgetHead);
