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

export type AirportDto = {
  __typename?: "AirportDto";
  code?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
};

export type ClientDto = {
  __typename?: "ClientDto";
  firstName?: Maybe<Scalars["String"]>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars["ID"]>;
  lastName?: Maybe<Scalars["String"]>;
  loyaltyProgram?: Maybe<LoyaltyProgram>;
};

export type ClientDtoInput = {
  firstName?: InputMaybe<Scalars["String"]>;
  gender?: InputMaybe<Gender>;
  id?: InputMaybe<Scalars["ID"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  loyaltyProgram?: InputMaybe<LoyaltyProgramInput>;
};

export type ClientFilterInput = {
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

export type FlightDto = {
  __typename?: "FlightDto";
  airlineName?: Maybe<Scalars["String"]>;
  fromAirport?: Maybe<AirportDto>;
  id?: Maybe<Scalars["Long"]>;
  number?: Maybe<Scalars["Int"]>;
  toAirport?: Maybe<AirportDto>;
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

export type Query = {
  __typename?: "Query";
  airportList: Array<Maybe<AirportDto>>;
  checkAuthenticated?: Maybe<Scalars["Void"]>;
  client: ClientDto;
  clientList: Array<Maybe<ClientDto>>;
  flightList: Array<Maybe<FlightDto>>;
  loyaltyProgram: LoyaltyProgram;
  loyaltyProgramList: Array<Maybe<LoyaltyProgram>>;
  ticket: TicketDto;
  ticketList: TicketDtoResultPage;
  userInfo?: Maybe<UserInfo>;
  userPermissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryClientArgs = {
  id: Scalars["ID"];
};

export type QueryClientListArgs = {
  filter?: InputMaybe<ClientFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<ClientOrderByInput>>>;
};

export type QueryFlightListArgs = {
  dateMax: Scalars["Date"];
  dateMin: Scalars["Date"];
  from: Scalars["Int"];
  to: Scalars["Int"];
};

export type QueryLoyaltyProgramArgs = {
  id: Scalars["ID"];
};

export type QueryTicketArgs = {
  id: Scalars["ID"];
};

export type QueryTicketListArgs = {
  page?: InputMaybe<OffsetPageInput>;
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type TicketDto = {
  __typename?: "TicketDto";
  client?: Maybe<ClientDto>;
  createdBy?: Maybe<Scalars["String"]>;
  createdDate?: Maybe<Scalars["LocalDateTime"]>;
  flight?: Maybe<FlightDto>;
  id?: Maybe<Scalars["ID"]>;
  lastModifiedBy?: Maybe<Scalars["String"]>;
  lastModifiedDate?: Maybe<Scalars["LocalDateTime"]>;
  price?: Maybe<Scalars["BigDecimal"]>;
};

export type TicketDtoResultPage = {
  __typename?: "TicketDtoResultPage";
  content?: Maybe<Array<Maybe<TicketDto>>>;
  totalElements: Scalars["Long"];
};

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
}>;

export type ClientListQuery = {
  __typename?: "Query";
  clientList: Array<{
    __typename?: "ClientDto";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    gender?: Gender | null;
    loyaltyProgram?: {
      __typename?: "LoyaltyProgram";
      id?: string | null;
      name?: string | null;
      discountPercent?: any | null;
    } | null;
  } | null>;
};

export type DeleteClientMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteClientMutation = {
  __typename?: "Mutation";
  deleteClient?: any | null;
};

export type FlightList_FlightSearchQueryVariables = Exact<{
  from: Scalars["Int"];
  to: Scalars["Int"];
  dateMin: Scalars["Date"];
  dateMax: Scalars["Date"];
}>;

export type FlightList_FlightSearchQuery = {
  __typename?: "Query";
  flightList: Array<{
    __typename?: "FlightDto";
    id?: any | null;
    number?: number | null;
    airlineName?: string | null;
    fromAirport?: {
      __typename?: "AirportDto";
      id?: number | null;
      name?: string | null;
      code?: string | null;
    } | null;
    toAirport?: {
      __typename?: "AirportDto";
      id?: number | null;
      name?: string | null;
      code?: string | null;
    } | null;
  } | null>;
};

export type TicketList_TicketListQueryVariables = Exact<{
  page?: InputMaybe<OffsetPageInput>;
}>;

export type TicketList_TicketListQuery = {
  __typename?: "Query";
  ticketList: {
    __typename?: "TicketDtoResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "TicketDto";
      id?: string | null;
      price?: any | null;
      createdBy?: string | null;
      createdDate?: any | null;
      lastModifiedBy?: string | null;
      lastModifiedDate?: any | null;
      client?: {
        __typename?: "ClientDto";
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        gender?: Gender | null;
      } | null;
      flight?: {
        __typename?: "FlightDto";
        id?: any | null;
        number?: number | null;
        airlineName?: string | null;
      } | null;
    } | null> | null;
  };
};

export type TicketQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TicketQuery = {
  __typename?: "Query";
  ticket: {
    __typename?: "TicketDto";
    id?: string | null;
    price?: any | null;
    createdBy?: string | null;
    createdDate?: any | null;
    lastModifiedBy?: string | null;
    lastModifiedDate?: any | null;
    client?: {
      __typename?: "ClientDto";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      gender?: Gender | null;
    } | null;
    flight?: {
      __typename?: "FlightDto";
      id?: any | null;
      number?: number | null;
      airlineName?: string | null;
    } | null;
  };
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
                { kind: "Field", name: { kind: "Name", value: "gender" } },
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
                { kind: "Field", name: { kind: "Name", value: "gender" } },
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
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
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
                { kind: "Field", name: { kind: "Name", value: "gender" } },
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
export const FlightList_FlightSearchDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FlightList_FlightSearch" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "from" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "to" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "dateMin" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Date" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "dateMax" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Date" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "flightList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "from" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "from" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "to" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "to" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dateMin" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "dateMin" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dateMax" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "dateMax" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "number" } },
                { kind: "Field", name: { kind: "Name", value: "airlineName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fromAirport" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "toAirport" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
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
  FlightList_FlightSearchQuery,
  FlightList_FlightSearchQueryVariables
>;
export const TicketList_TicketListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TicketList_TicketList" },
      variableDefinitions: [
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
            name: { kind: "Name", value: "ticketList" },
            arguments: [
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
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdBy" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastModifiedBy" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastModifiedDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "client" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "gender" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "flight" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "number" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "airlineName" },
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
} as unknown as DocumentNode<
  TicketList_TicketListQuery,
  TicketList_TicketListQueryVariables
>;
export const TicketDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Ticket" },
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
            name: { kind: "Name", value: "ticket" },
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
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "createdBy" } },
                { kind: "Field", name: { kind: "Name", value: "createdDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastModifiedBy" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastModifiedDate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "client" },
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gender" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "flight" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "number" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "airlineName" },
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
} as unknown as DocumentNode<TicketQuery, TicketQueryVariables>;
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
