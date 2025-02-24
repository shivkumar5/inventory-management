import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { Product } from "../types";
import { useDispatch } from "react-redux";
import { deleteProduct, disableProduct } from "../redux/inventorySlice";
import EditModal from "./EditModal";

interface Props {
  products: Product[];
  isAdmin: boolean;
}

const ProductTable: React.FC<Props> = ({ products, isAdmin }) => {
  const [editEnabled, setEditEnabled] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const showEditModal = (product: Product) => {
    setEditEnabled(true);
    setEditProduct(product);
  };

  const dispatch = useDispatch();

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", maxWidth: "100%" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Value</TableCell>
              {isAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                style={{ opacity: product.disabled ? 0.5 : 1 }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.value}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <IconButton
                      disabled={product.disabled}
                      onClick={() => {
                        showEditModal(product);
                      }}
                    >
                      <Edit color="success" />
                    </IconButton>
                    <IconButton
                      onClick={() => dispatch(disableProduct(product.id))}
                      disabled={product.disabled}
                    >
                      <Visibility color="secondary" />
                    </IconButton>
                    <IconButton
                      disabled={product.disabled}
                      onClick={() => dispatch(deleteProduct(product.id))}
                    >
                      <Delete
                        sx={{
                          color: "red",
                        }}
                      />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editEnabled && editProduct && (
        <EditModal
          open={editEnabled}
          product={editProduct}
          handleClose={() => {
            setEditEnabled(false);
            setEditProduct(null);
          }}
        />
      )}
    </>
  );
};

export default ProductTable;
