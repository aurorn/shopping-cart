import { Link } from 'react-router';
import useSticky from '../modules/UseSticky';
import styled from 'styled-components';
import { BsCartFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import title from '../assets/Aurornisgames.png';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useState } from 'react';

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

  @media (max-width: 768px) {
    height: 5svh;
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

  @media (max-width: 768px) {
    img {
      width: 16svw;
      margin: 0;
    }
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
      font-size: 1em;

      &:hover {
        color: #ccc;
        text-decoration: underline;
        text-underline-offset: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CartBtn = styled.div`
  position: absolute;
  right: 0;
  margin-right: 20px;
  cursor: pointer;

  .cart-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: red;
    color: white;
    font-size: 12px;
    font-weight: bold;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .cart-badge {
      width: 14px;
      height: 14px;
    }
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const DropdownMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(${props => (props.$isOpen ? '0' : '-20px')});
    background: ${({ theme }) => theme.background};
    min-width: 200px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    opacity: ${props => (props.$isOpen ? '1' : '0')};
    pointer-events: ${props => (props.$isOpen ? 'all' : 'none')};
    transition: all 0.3s ease-in-out;
    z-index: 22;
    border-radius: 4px;
    list-style: none;
    
    }
  }
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  color: ${({ theme }) => theme.primaryFontColor};
  transition: all 0.2s;
  cursor: pointer;
  font-size: 0.9em;

  a {
    color: white;
    text-decoration: none;
    font-size: 1em;
  }

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.background};
  }
`;

const Header = ({ onCartClick }) => {
  const { stickyRef, sticky } = useSticky();
  const { cartItems } = useContext(CartContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <Wrapper>
      <Navbar ref={stickyRef} className={sticky ? 'sticky' : ''}>
        <Title>
          <Link to="/">
            <img src={title} alt="Aurornis Games Logo" />
          </Link>
        </Title>
        <LogoWrapper>
          <RxHamburgerMenu
            size={24}
            color="white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <DropdownMenu $isOpen={isDropdownOpen}>
            <DropdownItem>
              <Link to="/">Home</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/about">About</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/contact">Contact</Link>
            </DropdownItem>
          </DropdownMenu>
        </LogoWrapper>
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
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </CartBtn>
      </Navbar>
    </Wrapper>
  );
};

export default Header;
