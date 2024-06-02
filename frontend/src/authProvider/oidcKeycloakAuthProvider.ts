import { gql } from "@amplicode/gql";
import {
  UserInfoQuery,
  UserInfoQueryVariables,
  UserPermissionsQuery,
  UserPermissionsQueryVariables,
} from "@amplicode/gql/graphql";
import { ApolloQueryResult, TypedDocumentNode } from "@apollo/client";
import { GraphQLError } from "graphql";
import { AuthProvider } from "react-admin";
import { AuthContextProps } from "react-oidc-context";
import { apolloClient } from "../core/apollo/client";
import { ID_TOKEN_STORAGE_KEY } from "../core/security/oidcConfig";

export const PERMISSIONS_KEY: "amplicode-permissions" = "amplicode-permissions";

const USER_INFO: TypedDocumentNode<UserInfoQuery, UserInfoQueryVariables> = gql(`
  query userInfo {
   userInfo {
     id
     fullName
     avatar
   }
  }
`);

const USER_PERMISSIONS: TypedDocumentNode<UserPermissionsQuery, UserPermissionsQueryVariables> =
  gql(`
  query userPermissions {
   userPermissions
  }
`);

interface UserInfo {
  id: string;
  fullName?: string | null;
  avatar?: string | null;
}

// TODO importing from 'ra-core/src/types' break `npm run build` command
// import {UserIdentity} from "ra-core/src/types";
interface UserIdentity {
  id: string | number;
  fullName?: string;
  avatar?: string;
  [key: string]: any;
}

export const oidcKeycloakAuthProvider = (auth: AuthContextProps): AuthProvider => ({
  login: () => {
    return auth.signinRedirect();
  },
  logout: async () => {
    const post_logout_redirect_uri = window.location.href;
    await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
    await localStorage.removeItem(PERMISSIONS_KEY);
    await auth.signoutRedirect({ post_logout_redirect_uri });
  },
  checkError: async (error) => {
    const { graphQLErrors, networkError } = error;
    if (graphQLErrors !== null && graphQLErrors.length > 0) {
      if (
        graphQLErrors.some((err: GraphQLError) => err.extensions?.classification === "UNAUTHORIZED")
      ) {
        await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
        //await auth.signinRedirect();
      }
    }

    if (networkError !== null && "statusCode" in networkError) {
      if (networkError.statusCode === 401) {
        await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
        //await auth.signinRedirect();
      }
    }
  },
  checkAuth: async () => {
    const token = localStorage.getItem(ID_TOKEN_STORAGE_KEY);
    if (token !== null) {
      return Promise.resolve();
    }

    await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
    //await auth.signinRedirect();
  },
  getPermissions: async (): Promise<string | null> => {
    let permissions: string | null = localStorage.getItem(PERMISSIONS_KEY);
    if (permissions != null) {
      return JSON.parse(permissions);
    }

    const authorities: ApolloQueryResult<UserPermissionsQuery> = await apolloClient.query({
      query: USER_PERMISSIONS,
    });

    permissions = authorities?.data?.userPermissions as string | null;
    if (permissions != null) {
      localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
    }
    return permissions;
  },
  getIdentity: async (): Promise<UserIdentity> => {
    const token: string | null = localStorage.getItem(ID_TOKEN_STORAGE_KEY);
    if (token == null) {
      throw new Error(`Getting identity failed - no token`);
    }

    const response: ApolloQueryResult<UserInfoQuery> = await apolloClient.query({
      query: USER_INFO,
    });
    const userInfo: UserInfo | null | undefined | void = response?.data?.userInfo;
    return {
      id: userInfo?.id ?? "",
      fullName: userInfo?.fullName ?? "",
      avatar: userInfo?.avatar ?? "",
    };
  },
});
