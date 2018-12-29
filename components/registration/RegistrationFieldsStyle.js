import {
  ALTO,
  BLACK,
  DARK_BLUE,
  GREEN,
  IRON,
  LIGHT_GREY,
  MAIN_COLOR_TEXT_GRAY,
  TORCH_RED,
  WHITE,
  DARK,
} from '../../constants/colors';

const style = {
  inputStyleLightTheme: {
    color: MAIN_COLOR_TEXT_GRAY,
    height: '33px',
    borderRadius: '5px',
    paddingLeft: '10px',
    boxShadow: '2px 4px 20px 0 rgba(0, 0, 0, 0.15)',
    marginBottom: '10px',
  },
  inputStyleDarkTheme: {
    color: WHITE,
    backgroundColor: DARK_BLUE,
    height: '33px',
    borderRadius: '5px',
    paddingLeft: '10px',
    boxShadow: '2px 4px 20px 0 rgba(0, 0, 0, 0.15)',
  },
  inputStyleDisabledLight: {
    color: IRON,
    height: '33px',
    borderRadius: '5px',
    paddingLeft: '10px',
    boxShadow: '2px 4px 20px 0 rgba(0, 0, 0, 0.15)',
  },
  inputStyleDisabledDark: {
    color: LIGHT_GREY,
    backgroundColor: DARK_BLUE,
    height: '33px',
    borderRadius: '5px',
    paddingLeft: '10px',
    boxShadow: '2px 4px 20px 0 rgba(0, 0, 0, 0.15)',
    marginBottom: '10px',
  },
  underlineStyle: {
    borderBottom: 'none',
  },
  hintStyleLightTheme: {
    color: LIGHT_GREY,
    paddingLeft: '10px',
    bottom: '4px',
  },
  hintStyleDarkTheme: {
    color: WHITE,
    paddingLeft: '10px',
    bottom: '4px',
  },
  floatingLabelStyle: {
    color: GREEN,
    fontSize: '11px',
    marginBottom: '5px',
  },
  textFieldStyle: {
    width: '100%',
    fontFamily: 'Proxima Nova',
  },
  selectFieldStyle: {
    width: '100%',
    margin: 0,
    fontFamily: 'Proxima Nova',
  },
  labelStyleLightTheme: {
    height: '33px',
    lineHeight: '33px',
    top: '0',
    color: MAIN_COLOR_TEXT_GRAY,
  },
  labelStyleDisabled: {
    color: IRON,
  },
  labelStyleDarkTheme: {
    height: '33px',
    lineHeight: '33px',
    top: '0',
    color: ALTO,
  },
  calendarIcon: {
    position: 'absolute',
    top: '9px',
    right: '12px',
    color: GREEN,
  },
  menuItemStyleLight: {
    color: MAIN_COLOR_TEXT_GRAY,
  },
  menuItemStyleDark: {
    color: WHITE,
  },
  selectedMenuItemStyle: {
    color: GREEN,
  },
  iconSelectStyle: {
    height: '33px',
    width: '40px',
    padding: '6px 0 0 7px',
    fill: MAIN_COLOR_TEXT_GRAY,
  },
  selectMenuStyle: {
    menuStyle: {
      background: DARK,
    },
  },
  panoramaFishEyeIcon: {
    height: '25px',
    width: '25px',
    fill: MAIN_COLOR_TEXT_GRAY,
  },
  checkCircleIcon: {
    height: '25px',
    width: '25px',
    fill: GREEN,
  },
  inputSwitchesStyle: {
    height: '25px',
    width: '25px',
  },
  labelCheckboxStyle: {
    fontSize: '18px',
    fontFamily: 'Proxima Nova',
    color: MAIN_COLOR_TEXT_GRAY,
  },
  labelActiveCheckboxStyle: {
    color: GREEN,
  },
  checkBoxStyle: {
    marginBottom: '20px',
  },
  cancelBtn: {
    backgroundColor: TORCH_RED,
    width: '130px',
    height: '48px',
    lineHeight: '15px',
    verticalAlign: 'top',
    margin: '0 20px',
  },
  returnBtn: {
    backgroundColor: GREEN,
    width: '130px',
    height: '48px',
    lineHeight: '15px',
    verticalAlign: 'top',
    margin: '0 20px',
  },
  labelCancelBtn: {
    color: WHITE,
    fontSize: '12px',
    textAlign: 'center',
    padding: 0,
  },
  labelReturnBtn: {
    color: WHITE,
    fontSize: '12px',
  },
  actionsContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  contentStyle: {
    textAlign: 'center',
    border: `1px solid ${BLACK}`,
    width: '66%',
    minWidth: '600px',
  },
  overlayDialogStyle: {
    backgroundColor: 'transparent',
  },
  sucessWording: {
    fontSize: '18px',
    lineHeight: 2.5,
    marginBottom: '35px',
  },
  dataPickerTextFieldStyle: {
    width: '100%',
    color: MAIN_COLOR_TEXT_GRAY,
    fontFamily: 'Proxima Nova',
  },
  registrationModalLogo: {
    width: '125px',
    marginBottom: '35px',
  },
  cancelResultBtn: {
    backgroundColor: GREEN,
    width: '141px',
    height: '31px',
    marginBottom: '50px',
    borderRadius: '5px',
    lineHeight: '16.5px',
  },
  labelResultBtn: {
    color: WHITE,
    fontSize: '16px',
  },
};

export default style;
