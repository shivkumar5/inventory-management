import React from "react";
import { Switch, Stack, Typography, styled, Box } from "@mui/material";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#dffe56",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#177ddc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
}));

const Navbar: React.FC<{ toggleView: () => void; isAdmin: boolean }> = ({
  toggleView,
  isAdmin,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography color="text.primary">Admin</Typography>
        <AntSwitch
          onChange={toggleView}
          defaultChecked
          inputProps={{ "aria-label": "ant design" }}
        />
        <Typography color="text.primary">User</Typography>
      </Stack>
    </Box>
  );
};

export default Navbar;
