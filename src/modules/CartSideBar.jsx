import styled from 'styled-components';

const Overlay = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  transition: background 0.3s;
`;

const CartTitle = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.primaryFontColor};
`;

const CheckoutBtn = styled.button`
  position: absolute;
  bottom: 0;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 96px;
  align-self: center;
  font-size: 14px;
  border-radius: 3px;
  border: none;
  background-color: ${({ theme }) => theme.accent};

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

const CartSideBarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: #fff;
  z-index: 10;
  display: flex;
  flex-direction: column;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.3);
  padding: 24px 16px;
`;

const CartItemsBox = styled.div`
  position: fixed;
  top: 0;
`;

const CartSideBar = ({ open, onClose, children }) => (
  <>
    <Overlay open={open} onClick={onClose} />
    <CartSideBarWrapper open={open}>
      <button
        onClick={onClose}
        style={{
          alignSelf: 'flex-end',
          background: 'none',
          color: '#fff',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
        }}
      >
        ×
      </button>
      <CartTitle>Cart:</CartTitle> {/*Style this later*/}
      <CartItemsBox>
        {children}
        {/*<p>Price:</p>
        <p>Tax:</p>
        <p>Total:</p>*/
        /*Attach these <p> tags to the id's added to cart*/}
      </CartItemsBox>
      <CheckoutBtn>Checkout</CheckoutBtn>{' '}
      {/*Style this later with link the checkout page*/}
    </CartSideBarWrapper>
  </>
);

export default CartSideBar;
