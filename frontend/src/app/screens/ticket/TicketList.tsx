import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { ListProps } from "ra-ui-materialui";
import {AutocompleteInput, Datagrid, List, NumberField, ReferenceInput, TextField, TextInput} from "react-admin";
import { LocalDateTimeField } from "../../../core/components/datetime/LocalDateTimeField";
import { SingleReferenceField } from "../../../core/components/reference/SingleReferenceField";
import { getClientDtoRecordRepresentation } from "../../../core/record-representation/getClientDtoRecordRepresentation";
import { getFlightDtoRecordRepresentation } from "../../../core/record-representation/getFlightDtoRecordRepresentation";
import { DeleteButtonSecured } from "../../../core/security/components/DeleteButtonSecured";
import { EditButtonSecured } from "../../../core/security/components/EditButtonSecured";
import React from "react";
import {OffsetDateTimeField} from "../../../core/components/datetime/OffsetDateTimeField";

const TICKET_LIST = gql(`query TicketList_TicketList(
    $page: OffsetPageInput,
    $sort: [TicketOrderByInput],
    $filter: TicketFilterInput
) {
    ticketList(
        page: $page,
        sort: $sort,
        filter: $filter
) {
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
            }
        }
        totalElements
    }
}`);

const DELETE_TICKET = gql(`mutation DeleteTicket_TicketList($id: ID!) {
  deleteTicket(id: $id) 
}`);

export const TicketList = (props: Omit<ListProps, "children">) => {
  const queryOptions = {
    meta: {
      query: TICKET_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [
    <ReferenceInput source="clientId" reference="ClientDto" alwaysOn >
      <AutocompleteInput optionText={getClientDtoRecordRepresentation} sx={{width: "15em"}}/>
    </ReferenceInput>
  ]

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters} {...props}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <NumberField source="price" />
        <TextField source="createdBy" sortable={false} />
        <LocalDateTimeField source="createdDate" />
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
