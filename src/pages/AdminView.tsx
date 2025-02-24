import React from "react";
import Dashboard from "../components/Dashboard";
import ProductTable from "../components/ProductTable";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box } from "@mui/material";

const AdminView: React.FC = () => {
  const products = useSelector((state: RootState) => state.inventory.products);
  return (
    <Box style={{ padding: "20px" }}>
      <Dashboard />
      <ProductTable products={products} isAdmin={true} />
    </Box>
  );
};

export default AdminView;
