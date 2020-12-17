import React from 'react';

export interface Props {
  /*
    shows the main navigation icons of the bar
  */
  icons?: boolean;
  /*
    set this to an href value to display a return arrow to that href
  */
  returnHref?: string | null;
  /*
    true if this bar's background is fully transparent
  */
  noBackground?: boolean;
}

const MainNav: React.FC<Props> = () => {
  // const { icons = false, returnHref = null, noBackground = false } = props;
  return <p>MainNav</p>;
};

export default MainNav;
