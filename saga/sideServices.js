import {call, put, takeLatest, select, takeEvery, all} from 'redux-saga/effects';
import {js2xml, xml2js} from "xml-js";
import {setInputFieldValueById} from "../actions/registration";

const statesAbbvs = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FM: 'Federated Stated of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  // AA: 'Armed Forces Americas',
  // AE: 'Armed Forces Africa',
  // AE: 'Armed Forces Canada',
  // AE: 'Armed Forces Europe',
  // AE: 'Armed Forces Middle East',
  // AP: 'Armed Forces Pacific',
};

export function* getAddressInfoByZIP({fieldId, zipCode}) {
  const urlBase = 'http://production.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=';
  const clientId = '018EMPAL1274';
  const data = {
    "elements": [
      {
        "type": "element",
        "name": "CityStateLookupRequest",
        "attributes": {USERID: clientId},
        "elements": [
          {
            "type": "element",
            "name": "ZipCode",
            'attributes': {ID: 0},
            "elements": [
              {
                "type": "element",
                "name": "Zip5",
                "elements": [
                  {
                    "type": "text",
                    "text": zipCode
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  const url = `${urlBase}${js2xml(data)}`;
  try {
    const info = {};
    yield fetch(url).then(
        (res) => res.text()
            .then((text) => {
              const result = xml2js(text, {compact: true}).CityStateLookupResponse.ZipCode;
              // console.log('**** CITY *****', result);
              if (!result.Error) {
                    info.city = result.City._text;
                    info.state = statesAbbvs[result.State._text];
              } info.error = result.Error
            }
            ));
    if (!info.error) {
      if (fieldId === 'identity_zip_code') {
        yield put(setInputFieldValueById('identity_residential_address_residential_address_state', info.state));
        yield put(setInputFieldValueById('identity_residential_address_residential_address_city', info.city));
      } else if (fieldId === 'identity_mailing_address_zip_code') {
        yield put(setInputFieldValueById('identity_mailing_address_state', info.state));
        yield put(setInputFieldValueById('identity_mailing_address_city', info.city));
      } else if (fieldId === 'profile_employment_zip_code') {
        yield put(setInputFieldValueById('profile_employment_state', info.state));
        yield put(setInputFieldValueById('profile_employment_city', info.city));
      }
    }
  }
  catch (err) {
    console.log(err)
  }

}
