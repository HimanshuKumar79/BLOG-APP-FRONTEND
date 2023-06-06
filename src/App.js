import { BrowserRouter } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster />
        <NavBar />
        <BottomNav />
        <HomePage />
      </BrowserRouter>
    </div>
  );
}

export default App;
