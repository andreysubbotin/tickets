import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { NumberField, Show, ShowProps, SimpleShowLayout, TextField } from "react-admin";
import { SingleReferenceField } from "../../../core/components/reference/SingleReferenceField";
import { getClientDtoRecordRepresentation } from "../../../core/record-representation/getClientDtoRecordRepresentation";
import { getFlightDtoRecordRepresentation } from "../../../core/record-representation/getFlightDtoRecordRepresentation";

const TICKET = gql(`query Ticket($id: ID!) {
  ticket(id: $id) {
    id
    price
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
  }
}`);

export const TicketShow = (props: Omit<ShowProps, "children">) => {
  const queryOptions = {
    meta: {
      query: TICKET,
      resultDataPath: null,
    },
  };

  return (
    <Show<ItemType> queryOptions={queryOptions} {...props}>
      <SimpleShowLayout>
        <TextField source="id" />

        <NumberField source="price" />
        <SingleReferenceField
          source="client.id"
          recordRepresentation={getClientDtoRecordRepresentation}
        />
        <SingleReferenceField
          source="flight.id"
          recordRepresentation={getFlightDtoRecordRepresentation}
        />
      </SimpleShowLayout>
    </Show>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof TICKET>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["ticket"], undefined>;
