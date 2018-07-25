import { GREEN, MAIN_COLOR_TEXT_GRAY, LIGHT_GREY, IRON, ALTO, WHITE, TORCH_RED, BLACK } from '../../constants/colors';


const style = {
  inputStyle: {
    color: MAIN_COLOR_TEXT_GRAY,
  },
  inputStyleDisabled: {
    color: IRON,
  },
  underlineStyle: {
    borderBottom: `2px solid ${ALTO}`,
  },
  underlineErrorStyle: {
    borderBottom: '2px solid red',
  },
  underlineFocusStyle: {
    borderBottom: `2px solid ${GREEN}`,
  },
  hintStyle: {
    color: LIGHT_GREY,
  },
  floatingLabelStyle: {
    color: GREEN,
    fontSize: '14px',
  },
  textFieldStyle: {
    width: '100%',
    fontSize: '14px',
    // color: '#212529',
  },
  selectFieldStyle: {
    width: '100%',
    margin: 0,
    fontSize: '14px',
  },
  calendarIcon: {
    position: 'absolute',
    top: '20px',
    right: '0',
    color: GREEN,
  },
  menuItemStyle: {
    color: MAIN_COLOR_TEXT_GRAY,
  },
  selectedMenuItemStyle: {
    color: GREEN,
  },
  iconSelectStyle: {
    right: '-18px',
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
