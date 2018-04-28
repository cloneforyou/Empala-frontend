import React from 'react';
import EmpalaInput from '../EmpalaInput';
import { dataFields } from '../../../localdata/memberPageData';


export default class MemberInfoForm extends React.Component {

  render() {
      return (
        <form>
          {dataFields[this.props.page].map((item) =>
            <EmpalaInput
              key={item.id}
              id={item.id}
              type={item.type}
              label={item.label}
              placeholder={item.placeholder}
            />
) }
        </form>
      )
  }
}
