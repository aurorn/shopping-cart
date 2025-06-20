import { Link } from "react-router";
import useSticky from "../modules/UseSticky";
import styled from "styled-components";
import { BsCartFill } from "react-icons/bs";
import title from "../assets/Aurornisgames.png";

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color:rgb(97, 211, 103);
    `;
    
const Navbar = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color:rgb(32, 32, 32);
    transition: all 0.1s ease-in-out;
    
    &.sticky {
        position: fixed;
        top: 0;
        z-index: 12;
        padding: 10px 0 10px 0;
    }
    `;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 96px;
    img {
        width: 160px;
        height: auto;
        margin: 0 20px;
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

const Search = styled.div`
    display: none;
    position: absolute;
    margin-left: 20px;
    left: 0;
    input {
        padding: 5px;
        border: 1px solid #ccc;
        margin-right: 10px;
        position: end;
    }
        input:focus {
            outline: none;
            border-color: rgb(104, 104, 104);
        }
    button {
        padding: 5px 10px;
        border: none;
        
        background-color: rgb(104, 104, 104);
        color: white;
        cursor: pointer;
        &:hover {
            background-color: rgb(65, 64, 64);
        }
    }
`;  

const CartBtn = styled.div`
    position: absolute;
    right: 0;
    margin-right: 20px;
    &.sticky {
`;

const Header = () => {
    const { stickyRef, sticky } = useSticky();
    return (
        <Wrapper>
            <div className="header">
                <div className="logo">

                </div>

                <Title>
                    <img src={title} alt="Aurornis Games Logo" />
                </Title>

                <div className="cart btn">

                </div>
            </div>
            <Navbar ref={stickyRef} className={sticky ? "sticky" : ""}>
                <Navbtns>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </Navbtns>
                <Search>
                    <input type="text" placeholder="Search..." />
                    
                </Search>
                <CartBtn>
                    <Link to="/cart">
                        <BsCartFill size={36} color="white" />
                    </Link>
                </CartBtn>
            </Navbar>
        </Wrapper>
    )
}

export default Header;