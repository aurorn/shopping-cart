import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'

const FrontPage = lazy(() => import("./components/FrontPage"));
const GamePage = lazy(() => import("./components/GamePage"));

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/game/:id" element={<GamePage />} />
        </Routes>
      </Suspense>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;