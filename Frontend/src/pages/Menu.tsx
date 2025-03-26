import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SpaIcon from "@mui/icons-material/Spa";
import AppContext from "../AppContext";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const { isMenu, handleMenu } = useContext(AppContext);
  const navigate = useNavigate();

  const menuList = [
    "/",
    "/rent",
    "/details",
    "/customer",
    "/report",
    "/logout",
  ];

  const handleMenuPath = (path: string) => {
    navigate(path);
    handleMenu();
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {[
          "ระบบเช่ารถยนต์",
          "เช่ารถยนต์",
          "รายละเอียด รถยนต์",
          "ลูกค้า",
          "รายงาน",
          "ออกจากระบบ",
        ].map((text, i) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuPath(menuList[i])}>
              <ListItemIcon>
                {i === 0 ? (
                  <SpaIcon sx={{ color: "red", height: 80 }} />
                ) : (
                  <InboxIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleMenu}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="DashBoard" />
          </ListItemButton>
        </ListItem>
      </List> */}
    </Box>
  );

  return (
    <div>
      <Drawer open={isMenu} onClose={handleMenu}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Menu;
