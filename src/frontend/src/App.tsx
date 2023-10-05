import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormOrga from "./pages/formOrga";
import FormPers from "./pages/formPers";
import FormContainer from "./pages/formContainer";
import Tester from "./pages/test";

export function AppWithoutRouter() {
  return (
    <div className="App">
      <Routes>
        <Route path="/tester" element={<Tester />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWithoutRouter />
    </BrowserRouter>
  );
}

export default App;


