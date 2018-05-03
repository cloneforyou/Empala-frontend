import { getTabContentByTabName } from "../../utils/registrationUtils";



const ContentFillingInformation = (props) => {
  const tabName = props.url ? props.url.query.name : 'member';
  const tabNumber= props.url ? +props.url.query.tabNumber-1 : 1;
  
  return (
    <div >
      {getTabContentByTabName(tabName, tabNumber).tabContent}
    </div>
  )
};

export default ContentFillingInformation