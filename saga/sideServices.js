import { put } from 'redux-saga/effects';
import { js2xml, xml2js } from 'xml-js';
import {setFieldInvalid, setFieldValid, setInputFieldValueById} from '../actions/registration';
import { statesAbbvs } from '../localdata/usStatesList';

export function* getAddressInfoByZIP({ fieldId, zipCode }) {
  const urlBase = 'http://production.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=';
  const clientId = '018EMPAL1274';
  const data = {
    elements: [
      {
        type: 'element',
        name: 'CityStateLookupRequest',
        attributes: { USERID: clientId },
        elements: [
          {
            type: 'element',
            name: 'ZipCode',
            attributes: { ID: 0 },
            elements: [
              {
                type: 'element',
                name: 'Zip5',
                elements: [
                  {
                    type: 'text',
                    text: zipCode,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const url = `${urlBase}${js2xml(data)}`;
  try {
    const info = {};
    yield fetch(url).then(res => res.text()
      .then((text) => {
        const result = xml2js(text, { compact: true }).CityStateLookupResponse.ZipCode;
        // console.log('**** CITY *****', result);
        if (!result.Error) {
          info.city = result.City._text;
          info.state = statesAbbvs[result.State._text];
        } info.error = result.Error;
      }));
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
      yield put(setFieldValid(fieldId));
    } else {
      yield put(setFieldInvalid(fieldId, 'Invalid ZIP-code'));
    }
  } catch (err) {
    console.log(err);
  }
}
