
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Detail from "./components/detail.jsx";
import Login from "./components/login.jsx";


// Separate AppContent for routing + header control
const AppContent = () => {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/detail"); // 🔥 condition to hide header

  return (
    <div>
      {/* Header visible only when NOT in detail page */}
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

