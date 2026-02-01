import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import MyPage from "./pages/MyPage";
import Transactions from "./pages/Transactions";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/mypage" element={<MyPage />} /> */}
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
