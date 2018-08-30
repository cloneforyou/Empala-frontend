import React, { Component } from 'react';
import Moment from 'react-moment';
import _ from 'lodash';
import nophotoUser from '../../../static/images/default-avatar-of-user.svg';


class WidgetNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  toggleMenu = () => {
    const { menuIsOpen } = this.state;
    this.setState({ menuIsOpen: !menuIsOpen });
  };

  render() {
    const { widget } = this.props;
    const { menuIsOpen } = this.state;
    const widgetNews = widget.news || [];
    const DEFAULT_IMAGE = "../../../../static/images/icon-news.svg";

    return (
      <div className={`widget-col widget-col_${widget.id === 'external_news' ? 5 : 4}`}
           key={widget.id}
           style={{ maxWidth: this.props.maxWidth ? this.props.maxWidth : 'auto'}}
      >
        <div className="widget widget_padding" style={{ height: '365px' }}>
          <div className="widget__head">
            <h3 className="widget__title">{widget.id === 'external_news' ? 'News' : 'Empala internal news'}</h3>
            <div className="widget-menu">
              <button className="widget-menu__btn" onClick={this.toggleMenu} />
              <ul className={menuIsOpen ?
                'dropdown-menu dropdown-menu-right show widget-menu__list' :
                'dropdown-menu dropdown-menu-right  widget-menu__list'
              }
              >
                <li className="dropdown-item widget-menu__item"><a href="#">Link 1</a></li>
                <li className="dropdown-item widget-menu__item"><a href="#">Link 2</a></li>
                <li className="dropdown-item widget-menu__item"><a href="#">Link 3</a></li>
              </ul>
            </div>
          </div>
          <div className="widget__body">
            {widget.id === 'external_news' ?
              widgetNews.map(card => (
                <div className="news-card row no-gutters" key={card.uuid}>
                  <div className="news-card__wrap-image">
                    {
                      card.imageUrls ?
                      (
                        <a target="_blank" href={card.url}>
                          <img
                            className="news-card__image"
                            src={card.imageUrls}
                            onError={(e)=>{ e.target.src = card.source.imageUrl }}
                            alt={card.source.brandName}
                          />
                        </a>
                      ) :
                        (
                          <a target="_blank" href={card.url}>
                            <img
                            className="news-card__image"
                            src={card.source.imageUrl}
                            onError={(e)=>{ e.target.src = DEFAULT_IMAGE }}
                            alt={card.source.brandName}
                            />
                          </a>
                        )
                    }
                  </div>
                  <div className="col news-card__body">
                    <div className="news-card__head">
                      <div>
                        {
                          card.source.brandName &&
                          <a
                            className="news-card__creator"
                            target="_blank"
                            href={`https://${card.source.name}`}
                          >
                            {card.source.brandName}
                          </a>
                        }
                        <span className="news-card__time">
                            <Moment date={card.publishTime} fromNow />
                        </span>
                      </div>
                      <a className="news-card__link" target="_blank" href={card.url}>{_.unescape(card.title)}</a>
                      {/*<p className="news-card__text m-0">{_.unescape(card.description)}</p>*/}
                    </div>
                    {/*<div className="news-card__foot">
                      <div className="news-card__rating">
                        <span>Rating:</span>
                        <div className="stars">
                          <div className="stars__empty">
                            <div className={`stars__fill stars__fill_${card.rating}`} />
                          </div>
                        </div>
                      </div>
                    </div>*/}
                  </div>
                </div>
              )) :
              widgetNews.map(card => (
                <div className="news-card row no-gutters" key={card.feed.action_id}>
                  <div className="news-card__wrap-image">
                    <img
                      className={card.feed.subject.image_profile ? "news-card__image" : 'news-card__image news-card__image_bordered'}
                      src={card.feed.subject.image_profile || nophotoUser}
                      alt="user photo"
                    />
                  </div>
                  <div className="col news-card__body">
                    <div className="news-card__head">
                      <div>
                        <span className="news-card__time">
                          <Moment date={card.feed.subject.modified_date} format="MM-DD-YYYY" />
                        </span>
                      </div>
                      <div>
                        <p className="news-card__title m-0">{card.feed.subject.displayname}</p>
                        <p className="news-card__text m-0">
                          {_.unescape(card.feed.subject.status) || _.unescape(card.feed.main_content)}
                        </p>
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
