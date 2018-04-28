import Link from 'next/link';

const LeafLink = (props) => (
  <Link as={`/registration/${props.name}/${props.tabNumber}`}
        href={`/registration?name=${props.name}&tabNumber=${props.tabNumber}`}>
    {props.children}
  </Link>
);

const Button = (props) => (
  <div className='buttons__container'>
    <LeafLink
      name={ props.url? props.url.query.name : 'member'}
      tabNumber={props.url ? +props.url.query.tabNumber -1 : 1} >
    <button type='button' className='btn--navigate btn--prev'>&larr;</button>
    </LeafLink>
    <LeafLink
    name={ props.url? props.url.query.name : 'member'}
    tabNumber={props.url ? +props.url.query.tabNumber +1 : 1} >
    <button type='button' className='btn--navigate btn--next'>&rarr;</button>
  </LeafLink>
  </div>
);

export default Button
