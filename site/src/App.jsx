import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import AppShell from "./app/AppShell.jsx";
import Home from "./app/routes/Home.jsx";
import Documentation from "./app/routes/Documentation.jsx";
import ProductCanvas from "./app/ProductCanvas.jsx";
import DocDetail from "./app/routes/DocDetail.jsx";
import SystemExplorer from "./app/routes/SystemExplorer.jsx";
import Pricing from "./app/routes/Pricing.jsx";
import Contact from "./app/routes/Contact.jsx";
import Signup from "./app/routes/Signup.jsx";
import Login from "./app/routes/Login.jsx";
import Investors from "./app/routes/Investors.jsx";
import SouthLawnPricing from "./app/routes/SouthLawnPricing.jsx";
import SouthLawnLanding from "./app/SouthLawnLanding.jsx";
import WSPLanding from "./app/WSPLanding.jsx";
import WSPPricing from "./app/routes/WSPPricing.jsx";
import WSPInvestors from "./app/routes/WSPInvestors.jsx";
import WSPContact from "./app/routes/WSPContact.jsx";
import Account from "./app/routes/Account.jsx";
import Checkout from "./app/routes/Checkout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import IdeRoute from "./app/routes/IdeRoute.jsx";
import EngineRoute from "./app/routes/EngineRoute.jsx";
import OSIdeation from "./app/routes/OSIdeation.jsx";
import Marketplace from "./app/routes/Marketplace.jsx";
import ProjectMint from "./app/routes/ProjectMint.jsx";
import Features from "./app/routes/Features.jsx";
import Education from "./app/routes/Education.jsx";
import ExternalApi from "./app/routes/ExternalApi.jsx";

import SouthLawnInvestors from "./app/routes/SouthLawnInvestors.jsx";
import SouthLawnThesis from "./app/routes/SouthLawnThesis.jsx";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/southlawn")) {
      document.title = "South Lawn RE Holdings";
    } else if (location.pathname.startsWith("/wsp")) {
      document.title = "Wall Street Pro";
    } else {
      document.title = "Northfield Solidarity";
    }
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="docs/:docId" element={<DocDetail />} />
          <Route path="system" element={<SystemExplorer />} />
          <Route path="features" element={<Features />} />
          <Route path="education" element={<Education />} />
          <Route path="api" element={<ExternalApi />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="investors" element={<Investors />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
          <Route path="account" element={<Account />} /> {/* Added Route for Account */}
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="platform" element={<ProductCanvas />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="project/MINT" element={<ProjectMint />} />
          <Route path="ide" element={<IdeRoute />} />
          <Route path="os-ideation" element={<OSIdeation />} />
          <Route path="engine/:code" element={<EngineRoute />} />
          <Route path="southlawn" element={<SouthLawnLanding />} />
          <Route path="southlawn/pricing" element={<SouthLawnPricing />} />
          <Route path="southlawn/thesis" element={<SouthLawnThesis />} />
          <Route path="southlawn/docs" element={<Documentation context="SL" />} />
          <Route path="southlawn/system" element={<SystemExplorer context="SL" />} />
          <Route path="southlawn/investors" element={<SouthLawnInvestors />} />
          <Route path="wsp" element={<WSPLanding />} />
          <Route path="wsp/pricing" element={<WSPPricing />} />
          <Route path="wsp/investors" element={<WSPInvestors />} />
          <Route path="wsp/docs" element={<Documentation context="WSP" />} />
          <Route path="wsp/system" element={<SystemExplorer context="WSP" />} />
          <Route path="wsp/contact" element={<WSPContact />} />
        </Route>
      </Routes>
    </>
  );
}