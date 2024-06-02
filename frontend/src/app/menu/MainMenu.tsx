import { WebAsset } from "@mui/icons-material";
import { Menu } from "react-admin";
import { MenuItemSecured } from "../../core/security/components/MenuItemSecured";
import { MenuResourceItemSecured } from "../../core/security/components/MenuResourceItemSecured";

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
      <MenuResourceItemSecured name="ClientDto" />
      <MenuResourceItemSecured name="TicketDto" />
    </Menu>
  );
};
