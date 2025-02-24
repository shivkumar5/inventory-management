import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Card,
  CardContent,
  Typography,
  Grid2 as Grid,
  Box,
} from "@mui/material";
import {
  CategoryRounded,
  CurrencyExchangeRounded,
  RemoveShoppingCartRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";

const Dashboard: React.FC = () => {
  const products = useSelector((state: RootState) => state.inventory.products);
  const totalProducts = products.length;
  const totalStoreValue = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );
  const outOfStock = products.filter((p) => p.quantity === 0).length;
  const categories = new Set(products.map((p) => p.category)).size;

  return (
    <Grid container spacing={2} sx={{ paddingY: 2 }}>
      <Grid size={{ xs: 12, md: 3, sm: 6 }}>
        <Card sx={{ backgroundColor: "#203424" }}>
          <CardContent sx={{ display: "flex", gap: "20px" }}>
            <ShoppingCartRounded />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Total Products</Typography>
              <Typography variant="h5">{totalProducts}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3, sm: 6 }}>
        <Card sx={{ backgroundColor: "#203424" }}>
          <CardContent sx={{ display: "flex", gap: "20px" }}>
            <CurrencyExchangeRounded />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Total Store Value</Typography>
              <Typography variant="h5">
                ${totalStoreValue.toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3, sm: 6 }}>
        <Card sx={{ backgroundColor: "#203424" }}>
          <CardContent sx={{ display: "flex", gap: "20px" }}>
            <RemoveShoppingCartRounded />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Out of Stock</Typography>
              <Typography variant="h5">{outOfStock}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3, sm: 6 }}>
        <Card sx={{ backgroundColor: "#203424" }}>
          <CardContent sx={{ display: "flex", gap: "20px" }}>
            <CategoryRounded />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Categories</Typography>
              <Typography variant="h5">{categories}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
