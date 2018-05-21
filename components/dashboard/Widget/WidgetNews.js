import React, { Component } from 'react';
import Moment from 'react-moment';

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
  }

  render() {
    const { widget } = this.props;
    const { menuIsOpen } = this.state;
    return (
      <div className={`widget-col col-lg-${widget.col}`} key={widget.id}>
        <div className="widget" style={{ height: `${widget.height}px` }}>
          <div className="widget__head">
            <h3 className="widget__title">{widget.title}</h3>
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
            {
              widget.news.map(card => (
                <div className="news-card row no-gutters" key={card.id}>
                  <div
                    className={widget.type === 'All' ?
                      'news-card__wrap-image news-card__wrap-image_rectangle' :
                      'news-card__wrap-image news-card__wrap-image_square'
                    }
                  >
                    <img
                      className="news-card__image"
                      src={`../../../static/images/${card.image}`}
                      alt={card.title}
                    />
                  </div>
                  <div className="col news-card__body">
                    <div className="news-card__head">
                      <div>
                        {
                          card.creator && <a className="news-card__creator" href="#">{card.creator}</a>
                        }
                        <span className="news-card__time">
                          {
                            widget.type === 'All' ?
                              <Moment date={card.date} fromNow /> :
                              <Moment date={card.date} format="DD-MM-YYY" />
                          }

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
