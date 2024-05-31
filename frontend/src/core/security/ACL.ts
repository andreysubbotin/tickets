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
    LoyaltyProgram: {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true
    },
    ClientDto: {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true
    },
    TicketDto: {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true
    },
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
    LoyaltyProgram: {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true
    },
    ClientDto: {
      enabled: true,
      list: true,
      create: true,
      edit: true,
      show: true,
      delete: true
    },
    TicketDto: {
      enabled: true,
      list: true,
      create: false,
      edit: false,
      show: true,
      delete: false
    },
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
