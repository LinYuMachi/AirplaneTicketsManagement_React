import {useEffect, useState} from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PermissionUtils from "../../utils/PermissionUtils";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const [username, setUsername] = useState("");
  useEffect(() => {
    PermissionUtils.getUsername().then(username => setUsername(username))
  }, []);

  PermissionUtils.listenPermissionEvents(setUsername);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  牛
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  管理员
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : " 10%"}>
            <Item
                title="面板"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />

{/***  Later Implementation to set check user level to display team data  ****/}

            <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px"}}
            >
                用户
            </Typography>

            <Item
                title="管理用户"
                to="/team"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            {/*<Item
                title="Contacts Information"
                to="/contacts"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="Invoices Balances"
                to="/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            /> */}
            <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px"}}
            >
                航班/订单
            </Typography>
            {/* <Item
                title="Entry Form"
                to="/form"
                icon={<AirplaneTicketOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            /> */}
            <Item
                title="管理航班"
                to="/flights"
                icon={<AirplaneTicketOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="管理订单"
                to="/tickets"
                icon={<ContentPasteSearchOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            {/* <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarMonthOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="FAQ"
                to="/faq"
                icon={<HelpOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            /> */}
            <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px"}}
            >
                图表
            </Typography>
            <Item
                title="Bar Chart"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="Line Chart"
                to="/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="Geography Chart"
                to="/geography"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
