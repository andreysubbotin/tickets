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

export type FileUploadResponse = {
  __typename?: "FileUploadResponse";
  fileId: Scalars["String"];
  uploadUrl: Scalars["Url"];
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  checkAuthenticated?: Maybe<Scalars["Void"]>;
  userInfo?: Maybe<UserInfo>;
  userPermissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type UserInfo = {
  __typename?: "UserInfo";
  avatar?: Maybe<Scalars["String"]>;
  fullName?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
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
