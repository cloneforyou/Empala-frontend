const noLabelFields = [
  'member_basic_information_suffix',
];

export default function fieldNeedsLabel(fieldID) {
  return !noLabelFields.includes(fieldID);
}
