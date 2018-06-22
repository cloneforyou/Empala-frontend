import React, { Component } from 'react';
import Moment from 'react-moment';
import nophotoUser from '../../../static/images/nophoto_user.png';

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
    return (
      <div className={`widget-col col-lg-${widget.id === 'external_news' ? 5 : 3}`} key={widget.id}>
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
                <div className="news-card row no-gutters" key={card.id}>
                  <div className="news-card__wrap-image">
                    <a target="_blank" href={card.link}>
                      <img
                        className="news-card__image"
                        src={card.image_link}
                        alt={card.title}
                      />
                    </a>
                  </div>
                  <div className="col news-card__body">
                    <div className="news-card__head">
                      <div>
                        {
                          card.origin_title &&
                          <a className="news-card__creator" target="_blank"
                             href={card.origin_link}>{card.origin_title}</a>
                        }
                        <span className="news-card__time">
                            <Moment date={card.pubDate} fromNow />
                        </span>
                      </div>
                      <a className="news-card__link" target="_blank" href={card.link}>{card.title}</a>
                      <p className="m-0">{card.description}</p>
                    </div>
                    {/*<div className="news-card__foot">*/}
                    {/*<div className="news-card__rating">*/}
                    {/*<span>Rating:</span>*/}
                    {/*<div className="stars">*/}
                    {/*<div className="stars__empty">*/}
                    {/*<div className={`stars__fill stars__fill_${card.rating}`} />*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                  </div>
                </div>
              )) :
              widgetNews.map(card => (
                <div className="news-card row no-gutters" key={card.feed.action_id}>
                  <div className="news-card__wrap-image">
                    { card.feed.subject.image_profile ?
                      <img
                        className="news-card__image"
                        src={card.feed.subject.image_profile}
                        alt=""
                      /> :
                    <img
                      className="news-card__image"
                      src={nophotoUser}
                      alt=""
                    /> }
                  </div>
                  <div className="col news-card__body">
                    <div className="news-card__head">
                      <div>
                        <span className="news-card__time">
                          <Moment date={card.feed.subject.modified_date} format="MM-DD-YYYY" />
                        </span>
                      </div>
                      <p className="news-card__title">{card.feed.main_content}</p>
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
