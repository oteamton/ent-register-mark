import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import FormOrga from "./pages/formOrga";
import FormPers from "./pages/formPers";
import FormContainer from "./pages/formContainer";
import ThankYou from "./pages/thank";

import Footer from "./components/footer";
export function AppWithoutRouter() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}>
      <div className="App">
        <Routes>
          <Route path="/OrganizationForm" element={<FormOrga />} />
          <Route path="/IndividualForm" element={<FormPers />} />
          <Route path="/" element={<FormContainer />} />
          <Route path="/thank" element={<ThankYou />} />
        </Routes>
      </div>
      <Footer startText="Copyright © 2023 Engagement Thailand" endText="Powered by SWU" />
    </GoogleReCaptchaProvider>
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


