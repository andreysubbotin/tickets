/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "mutation UpdateClient($input: ClientDtoInput!) {\n  updateClient(input: $input) {\n    id\n    firstName\n    lastName\n    email\n    gender\n  }\n}":
    types.UpdateClientDocument,
  "query Client($id: ID!) {\n  client(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    gender\n  }\n}":
    types.ClientDocument,
  "query ClientList(\n  $filter: ClientFilterInput\n  $sort: [ClientOrderByInput]\n  $page: OffsetPageInput\n) {\n  clientList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      id\n      firstName\n      lastName\n      email\n      gender\n    }\n    totalElements\n  }\n}":
    types.ClientListDocument,
  "mutation DeleteClient($id: ID!) {\n  deleteClient(id: $id) \n}":
    types.DeleteClientDocument,
  "\n  query userInfo {\n   userInfo {\n     id\n     fullName\n     avatar\n   }\n  }\n":
    types.UserInfoDocument,
  "\n query checkAuthenticated {\n   checkAuthenticated\n }\n":
    types.CheckAuthenticatedDocument,
  "\n  query userPermissions {\n   userPermissions\n  }\n":
    types.UserPermissionsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateClient($input: ClientDtoInput!) {\n  updateClient(input: $input) {\n    id\n    firstName\n    lastName\n    email\n    gender\n  }\n}",
): (typeof documents)["mutation UpdateClient($input: ClientDtoInput!) {\n  updateClient(input: $input) {\n    id\n    firstName\n    lastName\n    email\n    gender\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Client($id: ID!) {\n  client(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    gender\n  }\n}",
): (typeof documents)["query Client($id: ID!) {\n  client(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    gender\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query ClientList(\n  $filter: ClientFilterInput\n  $sort: [ClientOrderByInput]\n  $page: OffsetPageInput\n) {\n  clientList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      id\n      firstName\n      lastName\n      email\n      gender\n    }\n    totalElements\n  }\n}",
): (typeof documents)["query ClientList(\n  $filter: ClientFilterInput\n  $sort: [ClientOrderByInput]\n  $page: OffsetPageInput\n) {\n  clientList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      id\n      firstName\n      lastName\n      email\n      gender\n    }\n    totalElements\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteClient($id: ID!) {\n  deleteClient(id: $id) \n}",
): (typeof documents)["mutation DeleteClient($id: ID!) {\n  deleteClient(id: $id) \n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query userInfo {\n   userInfo {\n     id\n     fullName\n     avatar\n   }\n  }\n",
): (typeof documents)["\n  query userInfo {\n   userInfo {\n     id\n     fullName\n     avatar\n   }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n query checkAuthenticated {\n   checkAuthenticated\n }\n",
): (typeof documents)["\n query checkAuthenticated {\n   checkAuthenticated\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query userPermissions {\n   userPermissions\n  }\n",
): (typeof documents)["\n  query userPermissions {\n   userPermissions\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
