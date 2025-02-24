import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchInventory } from "./utils/api";
import { setProducts } from "./redux/inventorySlice";
import Navbar from "./components/Navbar";
import AdminView from "./pages/AdminView";
import UserView from "./pages/UserView";
import { v4 as uuidv4 } from "uuid";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

import "./App.css";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchInventory().then((data) => {
      const updatedData = data?.map((item: any) => ({
        ...item,
        price: item.price?.includes("$")
          ? Number(item.price?.slice(1))
          : Number(item.price),
        value: item.value?.includes("$")
          ? Number(item.value?.slice(1))
          : Number(item.value),
        disabled: false,
        id: uuidv4(),
      }));
      dispatch(setProducts(updatedData));
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar toggleView={() => setIsAdmin(!isAdmin)} isAdmin={isAdmin} />
      {isAdmin ? <AdminView /> : <UserView />}
    </ThemeProvider>
  );
};

export default App;
