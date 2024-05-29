import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import { Datagrid, List, NumberField, TextField } from "react-admin";
import { DeleteButtonSecured } from "../../../core/security/components/DeleteButtonSecured";
import { EditButtonSecured } from "../../../core/security/components/EditButtonSecured";

const LOYALTY_PROGRAM_LIST = gql(`query LoyaltyProgramList {
	loyaltyProgramList {
		id
		name
		discountPercent
	}
}`);

const DELETE_LOYALTY_PROGRAM = gql(`mutation DeleteLoyaltyProgram($id: ID!) {
	deleteLoyaltyProgram(id: $id) 
}`);

export const LoyaltyProgramList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: LOYALTY_PROGRAM_LIST,
      resultDataPath: "",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} pagination={false} {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <TextField source="name" sortable={false} />
        <NumberField source="discountPercent" sortable={false} />

        <EditButtonSecured />
        <DeleteButtonSecured
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_LOYALTY_PROGRAM } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof LOYALTY_PROGRAM_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["loyaltyProgramList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<Exclude<ItemListType, null | undefined>[0], undefined>;
