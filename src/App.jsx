import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import CartSideBar from './modules/CartSideBar'
import { theme } from "./Styles/theme";
import { ThemeProvider } from "styled-components";

const FrontPage = lazy(() => import("./components/FrontPage"));
const GamePage = lazy(() => import("./components/GamePage"));

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header onCartClick={() => setCartOpen(true)} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/game/:id" element={<GamePage />} />
          </Routes>
        </Suspense>
        <CartSideBar open={cartOpen} onClose={() => setCartOpen(false)}>
          
        </CartSideBar>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;