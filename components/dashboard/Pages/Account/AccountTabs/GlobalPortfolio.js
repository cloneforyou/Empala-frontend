import React, { Component } from 'react';
import EmpalaInput from '../../../../registration/EmpalaInput';
import { Global, GlobalPortfolioData } from '../../../../../localdata/globalPortfolio';


export default class GlobalPortfolio extends Component {
  render() {
    return (
      <div className="global-portfolio">
        <div className="global-portfolio__container">
          <div className="global-portfolio__container_payments">
            <div className="global-portfolio__input-group vertical-align_center">
              {<EmpalaInput {...Global} />}
            </div>
            <div className="input-group__container">
              <div className="global-portfolio__input-group d-flex flex-wrap">
                {GlobalPortfolioData.map(item => (
                  <EmpalaInput{...{
                    item,
                    key: item.id,
                    label: item.label,
                    notCol: item.notCol,
                  }}
                  />
                ))}
              </div>
            </div>
            <div className="vertical-align_center global-portfolio__button_width">
             <button>Found account</button>
            </div>
          </div>
          <div className="global-portfolio__container_graphics">
            <div className="graphic__wrapper">Graphics 1</div>
            <div className="graphic__wrapper">Graphics 2</div>
            <div className="graphic__wrapper">Graphics 3</div>
            <div className="graphic__wrapper">Graphics 4</div>
          </div>
        </div>
      </div>
    );
  }
};
