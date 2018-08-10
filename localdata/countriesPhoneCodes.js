const countriesPhoneCodes = {
  Abkhazia: { name: 'Abkhazia', code: '+7 840' },
  Afghanistan: { name: 'Afghanistan', code: '+93' },
  Albania: { name: 'Albania', code: '+355' },
  Algeria: { name: 'Algeria', code: '+213' },
  'American Samoa': { name: 'American Samoa', code: '+1 684' },
  Andorra: { name: 'Andorra', code: '+376' },
  Angola: { name: 'Angola', code: '+244' },
  Anguilla: { name: 'Anguilla', code: '+1 264' },
  'Antigua and Barbuda': { name: 'Antigua and Barbuda', code: '+1 268' },
  Argentina: { name: 'Argentina', code: '+54' },
  Armenia: { name: 'Armenia', code: '+374' },
  Aruba: { name: 'Aruba', code: '+297' },
  Ascension: { name: 'Ascension', code: '+247' },
  Australia: { name: 'Australia', code: '+61' },
  'Australian External Territories': { name: 'Australian External Territories', code: '+672' },
  Austria: { name: 'Austria', code: '+43' },
  Azerbaijan: { name: 'Azerbaijan', code: '+994' },
  Bahamas: { name: 'Bahamas', code: '+1 242' },
  Bahrain: { name: 'Bahrain', code: '+973' },
  Bangladesh: { name: 'Bangladesh', code: '+880' },
  Barbados: { name: 'Barbados', code: '+1 246' },
  Barbuda: { name: 'Barbuda', code: '+1 268' },
  Belarus: { name: 'Belarus', code: '+375' },
  Belgium: { name: 'Belgium', code: '+32' },
  Belize: { name: 'Belize', code: '+501' },
  Benin: { name: 'Benin', code: '+229' },
  Bermuda: { name: 'Bermuda', code: '+1 441' },
  Bhutan: { name: 'Bhutan', code: '+975' },
  Bolivia: { name: 'Bolivia', code: '+591' },
  'Bosnia and Herzegovina': { name: 'Bosnia and Herzegovina', code: '+387' },
  Botswana: { name: 'Botswana', code: '+267' },
  Brazil: { name: 'Brazil', code: '+55' },
  'British Indian Ocean Territory': { name: 'British Indian Ocean Territory', code: '+246' },
  'British Virgin Islands': { name: 'British Virgin Islands', code: '+1 284' },
  Brunei: { name: 'Brunei', code: '+673' },
  Bulgaria: { name: 'Bulgaria', code: '+359' },
  'Burkina Faso': { name: 'Burkina Faso', code: '+226' },
  Burundi: { name: 'Burundi', code: '+257' },
  Cambodia: { name: 'Cambodia', code: '+855' },
  Cameroon: { name: 'Cameroon', code: '+237' },
  Canada: { name: 'Canada', code: '+1' },
  'Cape Verde': { name: 'Cape Verde', code: '+238' },
  'Cayman Islands': { name: 'Cayman Islands', code: '+ 345' },
  'Central African Republic': { name: 'Central African Republic', code: '+236' },
  Chad: { name: 'Chad', code: '+235' },
  Chile: { name: 'Chile', code: '+56' },
  China: { name: 'China', code: '+86' },
  'Christmas Island': { name: 'Christmas Island', code: '+61' },
  'Cocos-Keeling Islands': { name: 'Cocos-Keeling Islands', code: '+61' },
  Colombia: { name: 'Colombia', code: '+57' },
  Comoros: { name: 'Comoros', code: '+269' },
  Congo: { name: 'Congo', code: '+242' },
  'Congo, Dem. Rep. of (Zaire)': { name: 'Congo, Dem. Rep. of (Zaire)', code: '+243' },
  'Cook Islands': { name: 'Cook Islands', code: '+682' },
  'Costa Rica': { name: 'Costa Rica', code: '+506' },
  Croatia: { name: 'Croatia', code: '+385' },
  Cuba: { name: 'Cuba', code: '+53' },
  Curacao: { name: 'Curacao', code: '+599' },
  Cyprus: { name: 'Cyprus', code: '+537' },
  'Czech Republic': { name: 'Czech Republic', code: '+420' },
  Denmark: { name: 'Denmark', code: '+45' },
  'Diego Garcia': { name: 'Diego Garcia', code: '+246' },
  Djibouti: { name: 'Djibouti', code: '+253' },
  Dominica: { name: 'Dominica', code: '+1 767' },
  'Dominican Republic': { name: 'Dominican Republic', code: '+1 809' },
  'East Timor': { name: 'East Timor', code: '+670' },
  'Easter Island': { name: 'Easter Island', code: '+56' },
  Ecuador: { name: 'Ecuador', code: '+593' },
  Egypt: { name: 'Egypt', code: '+20' },
  'El Salvador': { name: 'El Salvador', code: '+503' },
  'Equatorial Guinea': { name: 'Equatorial Guinea', code: '+240' },
  Eritrea: { name: 'Eritrea', code: '+291' },
  Estonia: { name: 'Estonia', code: '+372' },
  Ethiopia: { name: 'Ethiopia', code: '+251' },
  'Falkland Islands': { name: 'Falkland Islands', code: '+500' },
  'Faroe Islands': { name: 'Faroe Islands', code: '+298' },
  Fiji: { name: 'Fiji', code: '+679' },
  Finland: { name: 'Finland', code: '+358' },
  France: { name: 'France', code: '+33' },
  'French Antilles': { name: 'French Antilles', code: '+596' },
  'French Guiana': { name: 'French Guiana', code: '+594' },
  'French Polynesia': { name: 'French Polynesia', code: '+689' },
  Gabon: { name: 'Gabon', code: '+241' },
  Gambia: { name: 'Gambia', code: '+220' },
  Georgia: { name: 'Georgia', code: '+995' },
  Germany: { name: 'Germany', code: '+49' },
  Ghana: { name: 'Ghana', code: '+233' },
  Gibraltar: { name: 'Gibraltar', code: '+350' },
  Greece: { name: 'Greece', code: '+30' },
  Greenland: { name: 'Greenland', code: '+299' },
  Grenada: { name: 'Grenada', code: '+1 473' },
  Guadeloupe: { name: 'Guadeloupe', code: '+590' },
  Guam: { name: 'Guam', code: '+1 671' },
  Guatemala: { name: 'Guatemala', code: '+502' },
  Guinea: { name: 'Guinea', code: '+224' },
  'Guinea-Bissau': { name: 'Guinea-Bissau', code: '+245' },
  Guyana: { name: 'Guyana', code: '+595' },
  Haiti: { name: 'Haiti', code: '+509' },
  Honduras: { name: 'Honduras', code: '+504' },
  'Hong Kong SAR China': { name: 'Hong Kong SAR China', code: '+852' },
  Hungary: { name: 'Hungary', code: '+36' },
  Iceland: { name: 'Iceland', code: '+354' },
  India: { name: 'India', code: '+91' },
  Indonesia: { name: 'Indonesia', code: '+62' },
  Iran: { name: 'Iran', code: '+98' },
  Iraq: { name: 'Iraq', code: '+964' },
  Ireland: { name: 'Ireland', code: '+353' },
  Israel: { name: 'Israel', code: '+972' },
  Italy: { name: 'Italy', code: '+39' },
  'Ivory Coast': { name: 'Ivory Coast', code: '+225' },
  Jamaica: { name: 'Jamaica', code: '+1 876' },
  Japan: { name: 'Japan', code: '+81' },
  Jordan: { name: 'Jordan', code: '+962' },
  Kazakhstan: { name: 'Kazakhstan', code: '+7 7' },
  Kenya: { name: 'Kenya', code: '+254' },
  Kiribati: { name: 'Kiribati', code: '+686' },
  Kuwait: { name: 'Kuwait', code: '+965' },
  Kyrgyzstan: { name: 'Kyrgyzstan', code: '+996' },
  Laos: { name: 'Laos', code: '+856' },
  Latvia: { name: 'Latvia', code: '+371' },
  Lebanon: { name: 'Lebanon', code: '+961' },
  Lesotho: { name: 'Lesotho', code: '+266' },
  Liberia: { name: 'Liberia', code: '+231' },
  Libya: { name: 'Libya', code: '+218' },
  Liechtenstein: { name: 'Liechtenstein', code: '+423' },
  Lithuania: { name: 'Lithuania', code: '+370' },
  Luxembourg: { name: 'Luxembourg', code: '+352' },
  'Macau SAR China': { name: 'Macau SAR China', code: '+853' },
  Macedonia: { name: 'Macedonia', code: '+389' },
  Madagascar: { name: 'Madagascar', code: '+261' },
  Malawi: { name: 'Malawi', code: '+265' },
  Malaysia: { name: 'Malaysia', code: '+60' },
  Maldives: { name: 'Maldives', code: '+960' },
  Mali: { name: 'Mali', code: '+223' },
  Malta: { name: 'Malta', code: '+356' },
  'Marshall Islands': { name: 'Marshall Islands', code: '+692' },
  Martinique: { name: 'Martinique', code: '+596' },
  Mauritania: { name: 'Mauritania', code: '+222' },
  Mauritius: { name: 'Mauritius', code: '+230' },
  Mayotte: { name: 'Mayotte', code: '+262' },
  Mexico: { name: 'Mexico', code: '+52' },
  Micronesia: { name: 'Micronesia', code: '+691' },
  'Midway Island': { name: 'Midway Island', code: '+1 808' },
  Moldova: { name: 'Moldova', code: '+373' },
  Monaco: { name: 'Monaco', code: '+377' },
  Mongolia: { name: 'Mongolia', code: '+976' },
  Montenegro: { name: 'Montenegro', code: '+382' },
  Montserrat: { name: 'Montserrat', code: '+1664' },
  Morocco: { name: 'Morocco', code: '+212' },
  Myanmar: { name: 'Myanmar', code: '+95' },
  Namibia: { name: 'Namibia', code: '+264' },
  Nauru: { name: 'Nauru', code: '+674' },
  Nepal: { name: 'Nepal', code: '+977' },
  Netherlands: { name: 'Netherlands', code: '+31' },
  'Netherlands Antilles': { name: 'Netherlands Antilles', code: '+599' },
  Nevis: { name: 'Nevis', code: '+1 869' },
  'New Caledonia': { name: 'New Caledonia', code: '+687' },
  'New Zealand': { name: 'New Zealand', code: '+64' },
  Nicaragua: { name: 'Nicaragua', code: '+505' },
  Niger: { name: 'Niger', code: '+227' },
  Nigeria: { name: 'Nigeria', code: '+234' },
  Niue: { name: 'Niue', code: '+683' },
  'Norfolk Island': { name: 'Norfolk Island', code: '+672' },
  'North Korea': { name: 'North Korea', code: '+850' },
  'Northern Mariana Islands': { name: 'Northern Mariana Islands', code: '+1 670' },
  Norway: { name: 'Norway', code: '+47' },
  Oman: { name: 'Oman', code: '+968' },
  Pakistan: { name: 'Pakistan', code: '+92' },
  Palau: { name: 'Palau', code: '+680' },
  'Palestinian Territory': { name: 'Palestinian Territory', code: '+970' },
  Panama: { name: 'Panama', code: '+507' },
  'Papua New Guinea': { name: 'Papua New Guinea', code: '+675' },
  Paraguay: { name: 'Paraguay', code: '+595' },
  Peru: { name: 'Peru', code: '+51' },
  Philippines: { name: 'Philippines', code: '+63' },
  Poland: { name: 'Poland', code: '+48' },
  Portugal: { name: 'Portugal', code: '+351' },
  'Puerto Rico': { name: 'Puerto Rico', code: '+1 787' },
  Qatar: { name: 'Qatar', code: '+974' },
  Reunion: { name: 'Reunion', code: '+262' },
  Romania: { name: 'Romania', code: '+40' },
  Russia: { name: 'Russia', code: '+7' },
  Rwanda: { name: 'Rwanda', code: '+250' },
  Samoa: { name: 'Samoa', code: '+685' },
  'San Marino': { name: 'San Marino', code: '+378' },
  'Saudi Arabia': { name: 'Saudi Arabia', code: '+966' },
  Senegal: { name: 'Senegal', code: '+221' },
  Serbia: { name: 'Serbia', code: '+381' },
  Seychelles: { name: 'Seychelles', code: '+248' },
  'Sierra Leone': { name: 'Sierra Leone', code: '+232' },
  Singapore: { name: 'Singapore', code: '+65' },
  Slovakia: { name: 'Slovakia', code: '+421' },
  Slovenia: { name: 'Slovenia', code: '+386' },
  'Solomon Islands': { name: 'Solomon Islands', code: '+677' },
  'South Africa': { name: 'South Africa', code: '+27' },
  'South Georgia and the South Sandwich Islands': {
    name: 'South Georgia and the South Sandwich Islands',
    code: '+500',
  },
  'South Korea': { name: 'South Korea', code: '+82' },
  Spain: { name: 'Spain', code: '+34' },
  'Sri Lanka': { name: 'Sri Lanka', code: '+94' },
  Sudan: { name: 'Sudan', code: '+249' },
  Suriname: { name: 'Suriname', code: '+597' },
  Swaziland: { name: 'Swaziland', code: '+268' },
  Sweden: { name: 'Sweden', code: '+46' },
  Switzerland: { name: 'Switzerland', code: '+41' },
  Syria: { name: 'Syria', code: '+963' },
  Taiwan: { name: 'Taiwan', code: '+886' },
  Tajikistan: { name: 'Tajikistan', code: '+992' },
  Tanzania: { name: 'Tanzania', code: '+255' },
  Thailand: { name: 'Thailand', code: '+66' },
  'Timor Leste': { name: 'Timor Leste', code: '+670' },
  Togo: { name: 'Togo', code: '+228' },
  Tokelau: { name: 'Tokelau', code: '+690' },
  Tonga: { name: 'Tonga', code: '+676' },
  'Trinidad and Tobago': { name: 'Trinidad and Tobago', code: '+1 868' },
  Tunisia: { name: 'Tunisia', code: '+216' },
  Turkey: { name: 'Turkey', code: '+90' },
  Turkmenistan: { name: 'Turkmenistan', code: '+993' },
  'Turks and Caicos Islands': { name: 'Turks and Caicos Islands', code: '+1 649' },
  Tuvalu: { name: 'Tuvalu', code: '+688' },
  'U.S. Virgin Islands': { name: 'U.S. Virgin Islands', code: '+1 340' },
  Uganda: { name: 'Uganda', code: '+256' },
  Ukraine: { name: 'Ukraine', code: '+380' },
  'United Arab Emirates': { name: 'United Arab Emirates', code: '+971' },
  'United Kingdom': { name: 'United Kingdom', code: '+44' },
  'United States': { name: 'United States', code: '+1', mask: '(999) 999-9999' },
  Uruguay: { name: 'Uruguay', code: '+598' },
  Uzbekistan: { name: 'Uzbekistan', code: '+998' },
  Vanuatu: { name: 'Vanuatu', code: '+678' },
  Venezuela: { name: 'Venezuela', code: '+58' },
  Vietnam: { name: 'Vietnam', code: '+84' },
  'Wake Island': { name: 'Wake Island', code: '+1 808' },
  'Wallis and Futuna': { name: 'Wallis and Futuna', code: '+681' },
  Yemen: { name: 'Yemen', code: '+967' },
  Zambia: { name: 'Zambia', code: '+260' },
  Zanzibar: { name: 'Zanzibar', code: '+255' },
  Zimbabwe: { name: 'Zimbabwe', code: '+263' },
};

export default countriesPhoneCodes;