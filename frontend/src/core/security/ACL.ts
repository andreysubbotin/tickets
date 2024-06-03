export type AclType = Record<string, AclRoleResource>;
export type AclRoleResource = Record<string, ResourcePermission>;

type ResourcePermission = {
  enabled?: boolean;
  list?: boolean;
  create?: boolean;
  edit?: boolean;
  show?: boolean;
  delete?: boolean;
} & Record<string, boolean>; // type extended for custom permissions

export const ACL: AclType = {
  "ROLE_BOOKER": {
    FlightSearch: {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true
    }
  },
  "ROLE_VIEWER": {
    FlightSearch: {
      enabled: false,
      list: false,
      create: false,
      edit: false,
      show: false,
      delete: false
    }
  }
};
