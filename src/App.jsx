import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSideBar from './modules/CartSideBar';
import { theme } from './Styles/theme';
import { ThemeProvider } from 'styled-components';
import { CartProvider } from './context/CartProvider';

const FrontPage = lazy(() => import('./components/FrontPage'));
const GamePage = lazy(() => import('./components/GamePage'));

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CartProvider>
          <Header onCartClick={() => setCartOpen(true)} />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={<FrontPage setCart={setCart} cart={cart} />}
              />
              <Route path="/game/:id" element={<GamePage />} />
            </Routes>
          </Suspense>
          <CartSideBar
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
          />
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
