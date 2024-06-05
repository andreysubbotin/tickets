import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import { Datagrid, List, NumberField, TextField, TextInput } from "react-admin";
import { LocalDateTimeField } from "../../../core/components/datetime/LocalDateTimeField";
import { FileField } from "../../../core/components/file/FileField";
import { SingleReferenceField } from "../../../core/components/reference/SingleReferenceField";
import { getClientDtoRecordRepresentation } from "../../../core/record-representation/getClientDtoRecordRepresentation";
import { getFlightDtoRecordRepresentation } from "../../../core/record-representation/getFlightDtoRecordRepresentation";
import { DeleteButtonSecured } from "../../../core/security/components/DeleteButtonSecured";
import { EditButtonSecured } from "../../../core/security/components/EditButtonSecured";
import {OffsetDateTimeField} from "../../../core/components/datetime/OffsetDateTimeField";

const TICKET_LIST = gql(`query TicketList_TicketList(
  $page: OffsetPageInput
  $sort: [TicketOrderByInput]
  $filter: TicketFilterInput
) {
  ticketList(
    page: $page
    sort: $sort
    filter: $filter
  ) {
    content {
      id
      price
      createdBy
      createdDate
      client {
        id
        firstName
        lastName
        email
        gender
      }
      flight {
        id
        number
        airlineName
        airlineCode
        fromAirport {
          id
          name
          code
        }
        toAirport {
          id
          name
          code
        }
        takeoffDate
        landingDate
      }
      receipt
    }
    totalElements
  }
}`);

const DELETE_TICKET = gql(`mutation DeleteTicket_TicketList($id: ID!) {
  deleteTicket(id: $id) 
}`);

const TICKET_RECEIPT_DOWNLOAD_URL = gql(`query TicketReceiptDownloadUrl($id : ID!) {
    ticketReceiptDownloadUrl(id : $id)
}`);

export const TicketList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: TICKET_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [<TextInput source="clientId" />];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters} {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <NumberField source="price" />
        <TextField source="createdBy" sortable={false} />
        <LocalDateTimeField source="createdDate" sortable={false} />
        <SingleReferenceField
          source="client.id"
          recordRepresentation={getClientDtoRecordRepresentation}
          sortable={false}
        />
        <SingleReferenceField
          label="From"
          source="flight.fromAirport"
          recordRepresentation={a => "" + a.name}
          sortable={false}
        />
        <SingleReferenceField
          label="To"
          source="flight.toAirport"
          recordRepresentation={a => "" + a.name}
          sortable={false}
        />
        <OffsetDateTimeField
          label="Takeoff"
          source="flight.takeoffDate"
          sortable={false}
        />
        <FileField
          source="receipt"
          downloadUrlQuery={TICKET_RECEIPT_DOWNLOAD_URL}
          sortable={false}
        />

        <EditButtonSecured />
        <DeleteButtonSecured
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_TICKET } }}
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
