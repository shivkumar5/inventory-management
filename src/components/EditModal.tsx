import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/inventorySlice";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { Product } from "../types";

const style = {
  color: "text.primary",
  paddding: "20px",
};

const IputFieldWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "240px",
});

const EditModal: FC<any> = ({ open, handleClose, product }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      ...product,
    },
  });

  const handleSave = (data: Product) => {
    const updatedProduct = {
      ...data,
      value: Number(data.price) * Number(data.quantity),
    };
    dispatch(updateProduct(updatedProduct));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown
      hideBackdrop
      sx={{
        display: "flex",
        justifyContent: "space-between",
        ...style,
      }}
    >
      <Box padding={"20px"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <DialogTitle>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Product
            </Typography>
            <Typography>{product?.name}</Typography>
          </DialogTitle>
          <IconButton
            sx={{
              width: "48px",
              height: "48px",
            }}
            onClick={handleClose}
          >
            X
          </IconButton>
        </Box>
        <DialogContent
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <IputFieldWrapper>
            <label htmlFor="category">Category</label>
            <Controller
              name="category"
              control={control}
              render={({
                field,
              }: {
                field: ControllerRenderProps<Product, "category">;
              }) => (
                <TextField
                  {...field}
                  id="category"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />
          </IputFieldWrapper>
          <IputFieldWrapper>
            <label htmlFor="price">Price</label>
            <Controller
              name="price"
              control={control}
              render={({
                field,
              }: {
                field: ControllerRenderProps<Product, "price">;
              }) => (
                <TextField
                  {...field}
                  id="price"
                  type="number"
                  onChange={(e) => {
                    const numericValue = Number(e.target.value) || 0;
                    field.onChange(numericValue);
                    setValue(
                      "value",
                      Number(e.target.value) * Number(product?.quantity)
                    );
                  }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </IputFieldWrapper>
          <IputFieldWrapper>
            <label htmlFor="quantity">Quantity</label>
            <Controller
              name="quantity"
              control={control}
              render={({
                field,
              }: {
                field: ControllerRenderProps<Product, "quantity">;
              }) => (
                <TextField
                  {...field}
                  type="number"
                  id="quantity"
                  onChange={(e) => {
                    const numericValue = Number(e.target.value) || 0;
                    field.onChange(numericValue);
                    setValue(
                      "value",
                      Number(e.target.value) * Number(product?.price)
                    );
                  }}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                />
              )}
            />
          </IputFieldWrapper>
          <IputFieldWrapper>
            <label htmlFor="value">Value</label>
            <Controller
              name="value"
              control={control}
              render={({
                field,
              }: {
                field: ControllerRenderProps<Product, "value">;
              }) => (
                <TextField
                  {...field}
                  id="value"
                  disabled
                  error={!!errors.value}
                  helperText={errors.value?.message}
                />
              )}
            />
          </IputFieldWrapper>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit(handleSave)}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditModal;
