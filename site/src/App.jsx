import { Routes, Route } from "react-router-dom";
import AppShell from "./app/AppShell.jsx";
import Home from "./app/routes/Home.jsx";
import Documentation from "./app/routes/Documentation.jsx";
import DocDetail from "./app/routes/DocDetail.jsx";
import SystemExplorer from "./app/routes/SystemExplorer.jsx";
import Pricing from "./app/routes/Pricing.jsx";
import Contact from "./app/routes/Contact.jsx";
import Signup from "./app/routes/Signup.jsx";
import Investors from "./app/routes/Investors.jsx";
import SouthLawnPricing from "./app/routes/SouthLawnPricing.jsx";
import SouthLawnLanding from "./app/SouthLawnLanding.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import SouthLawnInvestors from "./app/routes/SouthLawnInvestors.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="docs/:docId" element={<DocDetail />} />
          <Route path="system" element={<SystemExplorer />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="investors" element={<Investors />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
          <Route path="southlawn" element={<SouthLawnLanding />} />
          <Route path="southlawn/pricing" element={<SouthLawnPricing />} />
          <Route path="southlawn/docs" element={<Documentation context="SL" />} />
          <Route path="southlawn/system" element={<SystemExplorer context="SL" />} />
          <Route path="southlawn/investors" element={<SouthLawnInvestors />} />
        </Route>
      </Routes>
    </>
  );
}