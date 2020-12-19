import React, { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronsLeft, FiPower, FiSettings } from 'react-icons/fi';
import { Container } from './styles';
import logoImg from '../../assets/logo-light.svg';

export interface Props extends HTMLAttributes<HTMLDivElement> {
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

const MainNav: React.FC<Props> = props => {
  const {
    icons = false,
    returnHref = null,
    noBackground = false,
    ...rest
  } = props;

  return (
    <Container
      $icons={icons}
      $returnHtref={returnHref}
      $noBackground={noBackground}
      {...rest}
    >
      <span className="content">
        <img src={logoImg} alt="Dbug Logo" />

        <span className="controls">
          <Link to="/settings" className="settings">
            <FiSettings />
          </Link>

          <Link to="/signout" className="power">
            <FiPower />
          </Link>

          <Link to={returnHref || '#'} className="back">
            <FiChevronsLeft />
          </Link>
        </span>
      </span>
    </Container>
  );
};

export default MainNav;
