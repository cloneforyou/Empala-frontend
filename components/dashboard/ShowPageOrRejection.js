import React from 'react';
import RejectionPage from './RejectionPage';

/* Renders a Component or rejection page based on
   available pages list for member and section(page) name */
const ShowPageOrRejection = ({ sectionName, allowedSections, ...props }, Component) => {
  if (!(sectionName && allowedSections)) return <RejectionPage />;
  if (allowedSections.includes(sectionName)) return <Component {...props} />;
  return <RejectionPage />;
};

export default ShowPageOrRejection;
