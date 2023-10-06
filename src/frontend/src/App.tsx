import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormOrga from "./pages/formOrga";
import FormPers from "./pages/formPers";
import FormContainer from "./pages/formContainer";

export function AppWithoutRouter() {
  return (
    <div className="App">
      <Routes>
        <Route path="/OrganizationForm" element={<FormOrga />} />
        <Route path="/IndividualForm" element={<FormPers />} />
        <Route path="/" element={<FormContainer />} />
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


