import { WebAsset } from "@mui/icons-material";
import { Menu } from "react-admin";
import { MenuItemSecured } from "../../core/security/components/MenuItemSecured";

export const MainMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <MenuItemSecured
        name="FlightSearch"
        to="flight-search"
        primaryText="pages.FlightSearch"
        leftIcon={<WebAsset />}
      />
    </Menu>
  );
};
