import { Link } from 'react-router';
import useSticky from '../modules/UseSticky';
import styled from 'styled-components';
import { BsCartFill } from 'react-icons/bs';
import title from '../assets/Aurornisgames.png';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Navbar = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  transition: all 0.1s ease-in-out;

  &.sticky {
    position: fixed;
    top: 0;
    z-index: 10;
    padding: 10px 0 10px 0;
    background-color: rgba(18, 18, 18, 0.49);
  }
`;

const Title = styled.div`
  position: absolute;
  left: 0;
  padding-left: 10px;
  img {
    width: 100px;
    height: auto;
    margin: 0 20px;
    filter: invert(1);
  }

  & img:hover {
    scale: 1.1;
    transition: 0.1s ease-in-out;
  }
`;

const Navbtns = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  margin: 0;
  padding: 20px;
  li {
    margin: 0 20px;
    a {
      color: white;
      text-decoration: none;
      font-size: 18px;
      &:hover {
        color: #ccc;
        text-decoration: underline;
        text-underline-offset: 10px;
      }
    }
  }
`;

const CartBtn = styled.div`
    position: absolute;
    right: 0;
    margin-right: 20px;
    cursor: pointer;

    &.sticky {
`;

const Header = ({ onCartClick }) => {
  const { stickyRef, sticky } = useSticky();
  return (
    <Wrapper>
      <Navbar ref={stickyRef} className={sticky ? 'sticky' : ''}>
        <Title>
          <img src={title} alt="Aurornis Games Logo" />
        </Title>
        <Navbtns>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </Navbtns>
        <CartBtn onClick={onCartClick}>
          <BsCartFill size={36} color="white" />
        </CartBtn>
      </Navbar>
    </Wrapper>
  );
};

export default Header;
