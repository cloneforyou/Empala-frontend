import {GREEN, MAIN_COLOR_TEXT_GRAY, LIGHT_GREY, IRON, ALTO} from '../../constants/colors'


const style = {
  inputStyle: {
    color: MAIN_COLOR_TEXT_GRAY
  },
  inputStyleDisabled: {
    color: IRON,
  },
  underlineStyle: {
    borderBottom: `2px solid ${ALTO}`,
  },
  underlineFocusStyle: {
    borderBottom: `2px solid ${GREEN}`,
  },
  underlineDisabledStyle: {
    borderBottom: `2px dotted ${IRON}`,
  },
  hintStyle: {
    color: LIGHT_GREY,
  },
  floatingLabelStyle: {
    color: GREEN,
  },
  textFieldStyle: {
    width: '100%',
  },
  selectFieldStyle: {
    width: '100%',
    margin: 0,
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
    color: MAIN_COLOR_TEXT_GRAY,
  },
  checkBoxStyle: {
    marginBottom: '20px',
  }
};

export default style;