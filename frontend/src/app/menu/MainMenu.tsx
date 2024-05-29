import { Menu } from "react-admin";
import { MenuResourceItemSecured } from "../../core/security/components/MenuResourceItemSecured";

export const MainMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <MenuResourceItemSecured name="LoyaltyProgram" />
      <MenuResourceItemSecured name="ClientDto" />
    </Menu>
  );
};
