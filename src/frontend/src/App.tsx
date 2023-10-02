import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useDocumentTitle from "react-document-title";
import FormOrga from "./pages/formOrga";
import FormPers from "./pages/formPers";
import FormContainer from "./pages/formContainer";
// import Login from "./services/auth/login";
// import './App.css';
function App() {
  
  return (
    <div className="App">
      {/* Render Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/form" element={<FormContainer />} />
          <Route path="/IndividualForm" element={<FormPers />} />
          <Route path="/OrganizationForm" element={<FormOrga />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
