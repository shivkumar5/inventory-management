import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },

  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "4px",
          height: "40px",
        },
        head: {
          color: "#c7e24f",
        },
      },
    },
  },
});

export default theme;
