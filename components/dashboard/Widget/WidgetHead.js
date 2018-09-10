import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import WidgetDotsMenu from './WidgetDotsMenu';
import AssetAmountRange from './AssetAmountRange';
import Switcher from './Switcher';
import { openInfoPopup } from '../../../actions/dashboard';
import DashboardInfoPopup from '../Modal/DashboardInfoPopup';

class WidgetHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fxButtonContent: 'Local',
    };
  }

  toggleFX() {
    this.setState(prevState => ({ fxButtonContent: prevState.fxButtonContent === 'Local' ? 'Active' : 'Local' }));
  }
  render() {
    const { widget } = this.props;
    const { fxButtonContent } = this.state;
    return (
      <div className="widget__head">

        <div className="widget__title-row">
          {
            widget.icon && <i className={`widget__icon widget__icon_${widget.icon}`} />
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
