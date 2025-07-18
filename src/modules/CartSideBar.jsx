import styled from 'styled-components';
import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

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

const CloseCartBarBtn = styled.button`
  align-self: flex-end;
  background: none;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CheckoutBtn = styled.button`
  
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
  max-height: 70%;
  width: 80%;
  padding: 20px;
  background-color: rgba(15, 15, 15, 1);
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.54);
  overflow: auto;
  overflow-x: hidden;
`;

const CartItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    
`
const CartItemImg = styled.img`
   min-width: 86px;
   height: 64px;
   border-radius: 4px;
   object-fit:cover;
`
const CartItemText = styled.div`
    align-items: center;
    display: flex;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const CartItemTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 100%;
`

const CartItemDivider = styled.div`
  width: 90%;
  height: 1px;
  background: ${({ theme }) => theme.dividerColor || '#444'};
  margin-top: 10px;
  margin-bottom: 10px;
  opacity: 0.5;
`;

const CartItemDelBtn = styled.div`
  width: 75px;
  height: 25px;
  color: #fff;
  background-color: transparent;
  display: flex;
  align-self: flex-end;
  border: none;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background: ${({theme}) => theme.accent};
    color:rgb(0, 0, 0);
    
  }

`
const CartBotRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const CartItemTotalPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 16px;
  color: ${({ theme }) => theme.primaryFontColor};
`;

const ClearCart = styled.button`
  
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
`

const BotBtnWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 100%;
`


const CartSideBar = ({ open, onClose}) => {
  const { cartItems, getCartTotal, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = getCartTotal().toFixed(2);

  return (
    <>
      <Overlay open={open} onClick={onClose} />
      <CartSideBarWrapper open={open}>
        <CloseCartBarBtn onClick={onClose}>×</CloseCartBarBtn>
        <CartTitle>Cart:</CartTitle>
        <CartItemsBox>
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <React.Fragment key={item.id}>
                <CartItemWrapper>
                  <CartItemImg src={item.image} alt={item.name} />
                  <CartItemTextWrapper>
                    <CartItemText>{item.name.substring(0, 17)}...</CartItemText>
                    <CartBotRowWrapper>
                      <CartItemText>
                        ${item.price} × {item.quantity}
                      </CartItemText>
                      <CartItemDelBtn onClick={() => removeFromCart(item)}>
                        Delete
                      </CartItemDelBtn>
                    </CartBotRowWrapper>
                  </CartItemTextWrapper>
                </CartItemWrapper>
                {idx < cartItems.length - 1 && <CartItemDivider />}
              </React.Fragment>
            ))
          ) : (
            <div>Your cart is empty.</div>
          )}
        </CartItemsBox>
        <CartItemTotalPrice>Total: ${totalPrice}</CartItemTotalPrice>
        <BotBtnWrapper>
          <ClearCart onClick={() => clearCart()}>Clear</ClearCart>
          <CheckoutBtn>Checkout</CheckoutBtn>
        </BotBtnWrapper>
      </CartSideBarWrapper>
    </>
  );
};


export default CartSideBar;
