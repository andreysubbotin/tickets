import { createAmplicodeApolloClient } from "@amplicode/react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { i18nProvider } from "../../i18nProvider";

export const apolloClient: ApolloClient<NormalizedCacheObject> = createAmplicodeApolloClient({
  i18nProvider,
});
