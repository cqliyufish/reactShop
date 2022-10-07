import Home from "components/routes/home/home.component";
import Navigation from "components/routes/navigation/navigation.component";
import Shop from "components/routes/shop/shop.component";
import Authentication from "components/routes/authentication/authentication.component";
import { Route, Routes, Outlet } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
