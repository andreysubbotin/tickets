import { Menu, MenuItemLinkProps } from "react-admin";
import { useACL } from "../useACL";

export type MenuItemSecuredProps = MenuItemLinkProps & {
  name: string;
  placeholder?: string;
};

export const MenuItemSecured = (props: MenuItemSecuredProps) => {
  const { enabled } = useACL(props.name);
  const { name, ...menuProps } = props;
  return enabled ? <Menu.Item {...{ placeholder: "", ...menuProps }} /> : null;
};
