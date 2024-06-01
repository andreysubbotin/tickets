import { gql } from "@amplicode/gql";
import { Gender } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import { Datagrid, List, TextField, TextInput } from "react-admin";
import { EnumField } from "../../../core/components/enum/EnumField";
import { DeleteButtonSecured } from "../../../core/security/components/DeleteButtonSecured";
import { EditButtonSecured } from "../../../core/security/components/EditButtonSecured";

const CLIENT_LIST = gql(`query ClientList(
  $filter: ClientFilterInput
  $sort: [ClientOrderByInput]
  $page: OffsetPageInput
) {
  clientList(
    filter: $filter
    sort: $sort
    page: $page
  ) {
    content {
      id
      firstName
      lastName
      email
      gender
    }
    totalElements
  }
}`);

const DELETE_CLIENT = gql(`mutation DeleteClient($id: ID!) {
  deleteClient(id: $id) 
}`);

export const ClientList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: CLIENT_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [
    <TextInput source="firstName" />,
    <TextInput source="lastName" />,
    <TextInput source="email" />,
  ];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters} {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="email" sortable={false} />
        <EnumField source="gender" enumTypeName="Gender" enum={Gender} sortable={false} />

        <EditButtonSecured />
        <DeleteButtonSecured
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_CLIENT } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof CLIENT_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["clientList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
