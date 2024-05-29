/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type ClientDto = {
  __typename?: "ClientDto";
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars["ID"]>;
  lastName?: Maybe<Scalars["String"]>;
  loyaltyProgram?: Maybe<LoyaltyProgram>;
};

export type ClientDtoInput = {
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  gender?: InputMaybe<Gender>;
  id?: InputMaybe<Scalars["ID"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  loyaltyProgram?: InputMaybe<LoyaltyProgramInput>;
};

export type ClientDtoResultPage = {
  __typename?: "ClientDtoResultPage";
  content?: Maybe<Array<Maybe<ClientDto>>>;
  totalElements: Scalars["Long"];
};

export type ClientFilterInput = {
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
};

export type ClientOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<ClientOrderByProperty>;
};

export enum ClientOrderByProperty {
  FirstName = "FIRST_NAME",
  LastName = "LAST_NAME",
}

export type FileUploadResponse = {
  __typename?: "FileUploadResponse";
  fileId: Scalars["String"];
  uploadUrl: Scalars["Url"];
};

export enum Gender {
  Female = "FEMALE",
  Male = "MALE",
}

export type LoyaltyProgram = {
  __typename?: "LoyaltyProgram";
  discountPercent?: Maybe<Scalars["BigDecimal"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type LoyaltyProgramInput = {
  discountPercent?: InputMaybe<Scalars["BigDecimal"]>;
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  deleteClient?: Maybe<Scalars["Void"]>;
  deleteLoyaltyProgram?: Maybe<Scalars["Void"]>;
  updateClient: ClientDto;
  updateLoyaltyProgram: LoyaltyProgram;
};

export type MutationDeleteClientArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteLoyaltyProgramArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateClientArgs = {
  input: ClientDtoInput;
};

export type MutationUpdateLoyaltyProgramArgs = {
  input: LoyaltyProgramInput;
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

/** Query root */
export type Query = {
  __typename?: "Query";
  checkAuthenticated?: Maybe<Scalars["Void"]>;
  client: ClientDto;
  clientList: ClientDtoResultPage;
  loyaltyProgram: LoyaltyProgram;
  loyaltyProgramList: Array<Maybe<LoyaltyProgram>>;
  userInfo?: Maybe<UserInfo>;
  userPermissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

/** Query root */
export type QueryClientArgs = {
  id: Scalars["ID"];
};

/** Query root */
export type QueryClientListArgs = {
  filter?: InputMaybe<ClientFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<ClientOrderByInput>>>;
};

/** Query root */
export type QueryLoyaltyProgramArgs = {
  id: Scalars["ID"];
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

/** Contains information about user */
export type UserInfo = {
  __typename?: "UserInfo";
  avatar?: Maybe<Scalars["String"]>;
  fullName?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdateClientMutationVariables = Exact<{
  input: ClientDtoInput;
}>;

export type UpdateClientMutation = {
  __typename?: "Mutation";
  updateClient: {
    __typename?: "ClientDto";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    gender?: Gender | null;
    loyaltyProgram?: {
      __typename?: "LoyaltyProgram";
      id?: string | null;
      name?: string | null;
      discountPercent?: any | null;
    } | null;
  };
};

export type ClientQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ClientQuery = {
  __typename?: "Query";
  client: {
    __typename?: "ClientDto";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    gender?: Gender | null;
    loyaltyProgram?: {
      __typename?: "LoyaltyProgram";
      id?: string | null;
      name?: string | null;
      discountPercent?: any | null;
    } | null;
  };
};

export type ClientListQueryVariables = Exact<{
  filter?: InputMaybe<ClientFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<ClientOrderByInput>> | InputMaybe<ClientOrderByInput>
  >;
  page?: InputMaybe<OffsetPageInput>;
}>;

export type ClientListQuery = {
  __typename?: "Query";
  clientList: {
    __typename?: "ClientDtoResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "ClientDto";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      gender?: Gender | null;
      loyaltyProgram?: {
        __typename?: "LoyaltyProgram";
        id?: string | null;
        name?: string | null;
        discountPercent?: any | null;
      } | null;
    } | null> | null;
  };
};

export type DeleteClientMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteClientMutation = {
  __typename?: "Mutation";
  deleteClient?: any | null;
};

export type UpdateLoyaltyProgramMutationVariables = Exact<{
  input: LoyaltyProgramInput;
}>;

export type UpdateLoyaltyProgramMutation = {
  __typename?: "Mutation";
  updateLoyaltyProgram: {
    __typename?: "LoyaltyProgram";
    id?: string | null;
    name?: string | null;
    discountPercent?: any | null;
  };
};

export type LoyaltyProgramQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type LoyaltyProgramQuery = {
  __typename?: "Query";
  loyaltyProgram: {
    __typename?: "LoyaltyProgram";
    id?: string | null;
    name?: string | null;
    discountPercent?: any | null;
  };
};

export type LoyaltyProgramListQueryVariables = Exact<{ [key: string]: never }>;

export type LoyaltyProgramListQuery = {
  __typename?: "Query";
  loyaltyProgramList: Array<{
    __typename?: "LoyaltyProgram";
    id?: string | null;
    name?: string | null;
    discountPercent?: any | null;
  } | null>;
};

export type DeleteLoyaltyProgramMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteLoyaltyProgramMutation = {
  __typename?: "Mutation";
  deleteLoyaltyProgram?: any | null;
};

export type UserInfoQueryVariables = Exact<{ [key: string]: never }>;

export type UserInfoQuery = {
  __typename?: "Query";
  userInfo?: {
    __typename?: "UserInfo";
    id: string;
    fullName?: string | null;
    avatar?: string | null;
  } | null;
};

export type CheckAuthenticatedQueryVariables = Exact<{ [key: string]: never }>;

export type CheckAuthenticatedQuery = {
  __typename?: "Query";
  checkAuthenticated?: any | null;
};

export type UserPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type UserPermissionsQuery = {
  __typename?: "Query";
  userPermissions?: Array<string | null> | null;
};

export const UpdateClientDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateClient" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ClientDtoInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateClient" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "loyaltyProgram" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "discountPercent" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateClientMutation,
  UpdateClientMutationVariables
>;
export const ClientDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Client" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "client" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "loyaltyProgram" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "discountPercent" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClientQuery, ClientQueryVariables>;
export const ClientListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ClientList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "ClientFilterInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ClientOrderByInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "clientList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gender" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "loyaltyProgram" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "discountPercent" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClientListQuery, ClientListQueryVariables>;
export const DeleteClientDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteClient" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteClient" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteClientMutation,
  DeleteClientMutationVariables
>;
export const UpdateLoyaltyProgramDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateLoyaltyProgram" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoyaltyProgramInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateLoyaltyProgram" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "discountPercent" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateLoyaltyProgramMutation,
  UpdateLoyaltyProgramMutationVariables
>;
export const LoyaltyProgramDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LoyaltyProgram" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "loyaltyProgram" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "discountPercent" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoyaltyProgramQuery, LoyaltyProgramQueryVariables>;
export const LoyaltyProgramListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LoyaltyProgramList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "loyaltyProgramList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "discountPercent" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  LoyaltyProgramListQuery,
  LoyaltyProgramListQueryVariables
>;
export const DeleteLoyaltyProgramDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteLoyaltyProgram" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteLoyaltyProgram" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteLoyaltyProgramMutation,
  DeleteLoyaltyProgramMutationVariables
>;
export const UserInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userInfo" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userInfo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "avatar" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;
export const CheckAuthenticatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "checkAuthenticated" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "checkAuthenticated" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CheckAuthenticatedQuery,
  CheckAuthenticatedQueryVariables
>;
export const UserPermissionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userPermissions" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "userPermissions" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserPermissionsQuery,
  UserPermissionsQueryVariables
>;
