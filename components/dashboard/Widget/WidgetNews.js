import React, { Component } from 'react';
import Moment from 'react-moment';

class WidgetNews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widget } = this.props;
    return (
      <div className={`widget-col col-lg-${widget.col}`} key={widget.id}>
        <div className="widget" style={{ height: `${widget.height}px`}}>
          <div className="widget__head">
            <h3 className="widget__title">{widget.title}</h3>
          </div>
          <div className="widget__body">
            {
              widget.news.map(card => (
                <div className="news-card row no-gutters" key={card.id}>
                  <div className="news-card__wrap-image">
                    <img
                      className="news-card__image"
                      src={`../../../static/images/${card.image}`}
                      alt={card.title}
                    />
                  </div>
                  <div className="col news-card__body">
                    <div className="news-card__head">
                      <div>
                        <a className="news-card__creator" href="#">{card.creator}</a>
                        <span className="news-card__time">
                          <Moment date={card.date} fromNow />
                        </span>
                      </div>
                      <a className="news-card__link" href="#">{card.title}</a>
                    </div>
                    <div className="news-card__foot">
                      <div className="news-card__rating">
                        <span>Rating:</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </div>
    );
  }
}

export default WidgetNews;
