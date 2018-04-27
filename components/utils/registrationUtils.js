import UploadUserFile from "../registration/UploadUserFile";
import EmpalaInput from "../registration/member/input";

const menuItems = {
  member: [
    {title: 'Upload your picture', key: 'picture', completed: false, active: false},
    {title: 'Basic information', key: 'basic-info', completed: false, active: false},
    {title: 'Contact information', key: 'contact-info', completed: false, active: true},
    {title: 'Home address', key: 'home-address', completed: false, active: false},
    {title: 'Username and password', key: 'name-password', completed: false, active: false},
    {title: 'Confirmation', key: 'confirmation', completed: false, active: false},

  ],
  identity: [
    {title: 'Upload your identification document', key: 'documents', completed: false, active: false},
    {title: 'DOB and SSN', key: 'dob-ssn', completed: false, active: false},
    {title: 'Investment Experience', key: 'investment', completed: false, active: false},
    {title: 'Employment Status', key: 'employment-status', completed: false, active: false},
    {title: 'Work address', key: 'work-address', completed: false, active: false},

  ],
  account: [
    {title: 'Bank', key: 'bank', completed: false, active: false},
    {title: 'Deposit', key: 'deposit', completed: false, active: false},
  ],
  approvals: [
    {title: 'Approvals', key: 'approvals', completed: false, active: false},
  ],
};

function mapDataToInputs(data) {
  return data.map((item) => (<div>
    <EmpalaInput
      key={item.id}
      id={item.id}
      type={item.type}
      label={item.label}
      placeholder={item.placeholder}
    />
  </div>));
}

const tabContent = {
  member: [
    <UploadUserFile/>,
    mapDataToInputs([
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'Estella',
      },
      {
        id: 'last-name',
        type: 'text',
        label: 'Last name',
        placeholder: 'Robbins',
      },
    ]),
    mapDataToInputs([
      {
        id: 'email',
        type: 'email',
        label: 'E-mail',
        placeholder: 'Estella',
      },
      {
        id: 'mobile',
        type: 'text',
        label: 'Mobile phone',
        placeholder: '+44 999999999',
      },
    ]),
    mapDataToInputs([
        {
          id: 'Home address-line1',
          type: 'text',
          label: 'address-line1',
          placeholder: '898 Candido Hollow',
        },
        {
          id: 'Home address-line2',
          type: 'text',
          label: 'address-line2',
          placeholder: 'Jacobson Cape',
        },
      {
        id: 'city',
        type: 'text',
        placeholder: 'City',
      },
      {
        id: 'Home address-line2',
        type: 'number',
        placeholder: 'Zip code',
      },
      {
        id: 'country',
        type: 'text',
        placeholder: 'Country',
      },
      ]),
  ],
  identity: [
    'identity',
    'identity',
  ],
  account: [
    'account',
  ],
  approvals: [
    'approvals',
  ],
};

export function getMenuItemsByTabName(tabName) {
  switch (tabName) {
    case 'member':
      return menuItems.member;
    case 'identity':
      return menuItems.identity;
    case 'account':
      return menuItems.account;
    case 'approvals':
      return menuItems.approvals;
  }
}


export function getTabContentByTabName(tabName, itemNumber) {
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', tabName)
  switch (tabName) {
    case 'member':
      return {
        menuItems: menuItems.member,
        tabContent: tabContent.member[itemNumber],
      };
    case 'identity':
      return {
        menuItems: menuItems.identity,
        tabContent: tabContent.member[itemNumber],
      };
    case 'account':
      return {
        menuItems: menuItems.account,
        tabContent: tabContent.member[itemNumber],
      };
    case 'approvals':
      return {
        menuItems: menuItems.approvals,
        tabContent: tabContent.member[itemNumber],
      };

  }

}
