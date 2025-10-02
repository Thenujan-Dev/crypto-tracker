import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import SingleCoin from "./pages/SingleCoin";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-linear-to-t bg-[#0A088B] from-black ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/coin/:id" element={<SingleCoin />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
