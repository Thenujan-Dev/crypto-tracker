import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CoinProvider } from "./context/coinContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CoinProvider>
      <App />
    </CoinProvider>
  </BrowserRouter>
);
