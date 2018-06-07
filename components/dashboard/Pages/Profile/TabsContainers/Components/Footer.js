import React, { PureComponent } from 'react';

class Footer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { deleteAccountBtnIsShow } = this.props;
    return (
      <div className="tab-container__foot buttons-row">
        <div className="buttons-row__right">
          {
            deleteAccountBtnIsShow && <button className="profile-btn profile-btn_red">Delete Account</button>
          }
        </div>
        <div className="buttons-row__left">
          <button className="default-btn">Cancel</button>
          <button className="profile-btn profile-btn_green">Save</button>
        </div>
      </div>
    );
  }
}

export default Footer;
