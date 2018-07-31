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
} from '../../constants/colors';

const style = {
  inputStyleLightTheme: {
    color: MAIN_COLOR_TEXT_GRAY,
    height: '33px',
    borderRadius: '5px',
    paddingLeft: '10px',
    boxShadow: '2px 4px 20px 0 rgba(0, 0, 0, 0.15)',
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
    fontSize: '14px',
  },
  selectFieldStyle: {
    width: '100%',
    margin: 0,
    fontSize: '14px',
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
  menuItemStyle: {
    color: MAIN_COLOR_TEXT_GRAY,
  },
  selectedMenuItemStyle: {
    color: GREEN,
  },
  iconSelectStyle: {
    height: '33px',
    padding: '6px 0 0 7px',
    fill: MAIN_COLOR_TEXT_GRAY,
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
    fontSize: '16px',
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
    width: '600px',
  },
  overlayDialogStyle: {
    backgroundColor: 'transparent',
  },
};

export default style;
