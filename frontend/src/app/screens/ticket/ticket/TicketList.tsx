import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import { Datagrid, List, NumberField, TextField } from "react-admin";
import { LocalDateTimeField } from "../../../../core/components/datetime/LocalDateTimeField";
import { SingleReferenceField } from "../../../../core/components/reference/SingleReferenceField";
import { getClientDtoRecordRepresentation } from "../../../../core/record-representation/getClientDtoRecordRepresentation";
import { getFlightDtoRecordRepresentation } from "../../../../core/record-representation/getFlightDtoRecordRepresentation";
import { EditButtonSecured } from "../../../../core/security/components/EditButtonSecured";

const TICKET_LIST = gql(`query TicketList_TicketList($page: OffsetPageInput) {
  ticketList(page: $page) {
    content {
      id
      price
      createdBy
      createdDate
      lastModifiedBy
      lastModifiedDate
      client {
        id
        firstName
        lastName
        gender
      }
      flight {
        id
        number
        airlineName
      }
    }
    totalElements
  }
}`);

export const TicketList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: TICKET_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <NumberField source="price" sortable={false} />
        <TextField source="createdBy" sortable={false} />
        <LocalDateTimeField source="createdDate" sortable={false} />
        <TextField source="lastModifiedBy" sortable={false} />
        <LocalDateTimeField source="lastModifiedDate" sortable={false} />
        <SingleReferenceField
          source="client.id"
          recordRepresentation={getClientDtoRecordRepresentation}
          sortable={false}
        />
        <SingleReferenceField
          source="flight.id"
          recordRepresentation={getFlightDtoRecordRepresentation}
          sortable={false}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof TICKET_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["ticketList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
