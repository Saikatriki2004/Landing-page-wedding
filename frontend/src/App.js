import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import OmkarnathLanding from "./pages/OmkarnathLanding";
import StyleGuideDemo from "./StyleGuideDemo";
import "./styles/artworld.css";
import "./index.css";

function App() {
  return (
    <div className="bg-[color:var(--omk-charcoal)] text-[color:var(--omk-ivory)] min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OmkarnathLanding />} />
          <Route path="/style-guide" element={<StyleGuideDemo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;