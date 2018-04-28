import { getTabContentByTabName } from "../../utils/registrationUtils";



const ContentFillingInformation = (props) => {
  console.log('ContentFillingInformatio -----,,,.,.,..', props)
  const tabName = props.url ? props.url.query.name : 'member';
  const tabNumber= props.url ? +props.url.query.tabNumber-1 : 1;
  console.log('========================', tabName, tabNumber)
  return (
    <div className=''>
      {getTabContentByTabName(tabName, tabNumber).tabContent}
    </div>
  )
};

export default ContentFillingInformation