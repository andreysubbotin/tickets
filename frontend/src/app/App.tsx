import { DevSupport } from "@amplicode/ide-toolbox";
import { AdminContext, AdminUI, CustomRoutes, Loading } from "react-admin";
import { Route } from "react-router";
import { useAuthProvider } from "../authProvider/useAuthProvider";
import { getClientDtoRecordRepresentation } from "../core/record-representation/getClientDtoRecordRepresentation";
import { ResourceSecured } from "../core/security/components/ResourceSecured";
import { RouteSecured } from "../core/security/components/RouteSecured";
import { dataProvider } from "../dataProvider/graphqlDataProvider";
import { ComponentPreviews, useInitial } from "../dev";
import { i18nProvider } from "../i18nProvider";
import { AdminLayout } from "./AdminLayout";
import { ClientCreate } from "./screens/client/ClientCreate";
import { ClientEdit } from "./screens/client/ClientEdit";
import { ClientList } from "./screens/client/ClientList";
import { FlightSearch } from "./screens/flight/FlightSearch";
import { activeAppTheme } from "./themes/appThemeConfig";
import { getStoredThemeMode } from "./themes/getStoredThemeMode";

const themeMode = getStoredThemeMode();

export const App = () => {
  const { authProvider, loading } = useAuthProvider();

  if (loading) {
    return (
      <Loading
        loadingPrimary="Loading"
        loadingSecondary="The page is loading, just a moment please"
      />
    );
  }

  return (
    <AdminContext
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      lightTheme={activeAppTheme.light}
      darkTheme={activeAppTheme.dark}
      defaultTheme={themeMode}
    >
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <AdminUI layout={AdminLayout} requireAuth={true}>
          <CustomRoutes>
            <Route
              path="flight-search"
              element={
                <RouteSecured name="FlightSearch">
                  <FlightSearch />
                </RouteSecured>
              }
            />
          </CustomRoutes>
          <ResourceSecured
            name="ClientDto"
            list={ClientList}
            recordRepresentation={getClientDtoRecordRepresentation}
            create={ClientCreate}
            edit={ClientEdit}
          />
        </AdminUI>
      </DevSupport>
    </AdminContext>
  );
};
