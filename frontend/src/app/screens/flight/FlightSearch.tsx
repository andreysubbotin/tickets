import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {
  AutocompleteInput,
  Button,
  ListContextProvider,
  ReferenceInput,
  required,
  SimpleForm,
  Title,
  Toolbar,
  useList,
  UseListValue,
  useNotify
} from "react-admin";
import {DateInput} from "../../../core/components/datetime/DateInput";
import {gql} from "@amplicode/gql";
import {useLazyQuery, useMutation} from "@apollo/client";
import {useMemo, useState} from "react";
import {FlightDto} from "@amplicode/gql/graphql";
import {getClientDtoRecordRepresentation} from "../../../core/record-representation/getClientDtoRecordRepresentation";

const FLIGHT_LIST_FLIGHT_SEARCH = gql(`
query FlightList_FlightSearch(
    $from: Int!,
    $to: Int!,
    $dateMin: Date!,
    $dateMax: Date!
) {
    flightList(
        from: $from,
        to: $to,
        dateMin: $dateMin,
        dateMax: $dateMax
) {
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
`);

const BOOK_TICKET_BUY_TICKET_BUTTON = gql(`
mutation BookTicket_BuyTicketButton(
    $flightId: ID!,
    $clientId: ID!
) {
    bookTicket(
        flightId: $flightId,
        clientId: $clientId
) {
        ticket {
            id
            price
            createdBy
            createdDate
            lastModifiedBy
            lastModifiedDate
        }
    }
}
`);

function SearchFormToolbar() {
  return (
    <Toolbar>
      <Button label="Search" variant="contained" type="submit" form="search-flights"/>
    </Toolbar>
  )
}


interface BuyTicketButtonParams {
  flightId: any;
  clientId: () => any;
}

function BuyTicketButton({flightId, clientId}: BuyTicketButtonParams) {
  if (flightId === null) {
    return null
  }
  const notify = useNotify();
  const [runBookTicket, {
    loading: bookTicketLoading,
    error: bookTicketError
  }] = useMutation(BOOK_TICKET_BUY_TICKET_BUTTON);
  return (
    <Button onClick={async e => {
      const clId = clientId()
      if (clId == null) {
        notify("Client is required for booking", {type: 'warning'})
      } else {
        await runBookTicket({
          variables: {
            flightId: flightId,
            clientId: clId
          }
        })
        notify(`Ticket booked successfully`, {type: "success"});
      }
    }} label={'Buy ticket'}/>
  )
}

interface ClientFormParams {
  client: (value: any) => void;
}

function ClientForm({client}: ClientFormParams) {
  return (<SimpleForm id="client-form" toolbar={false}>
      <Grid item xs={3} md={3}>
        <ReferenceInput
          source="client"
          reference="ClientDto">
          <AutocompleteInput
            optionText={(value => getClientDtoRecordRepresentation(value))}
            validate={required()}
            onChange={value => client(value)}
          />
        </ReferenceInput>
      </Grid>
    </SimpleForm>
  )
}

export function FlightSearch() {
  const [clientId, setClientId] = useState()

  const [loadFlightList, {
    loading: flightListLoading,
    error:
      flightListError,
    data:
      flightListData
  }

  ]
    = useLazyQuery(FLIGHT_LIST_FLIGHT_SEARCH, {});
  const flightList = useMemo(
    () => flightListData?.flightList || [],
    [flightListData?.flightList]
  ) as FlightDto[]

  const doSearchFlights = (data: Record<string, any>) => {
    loadFlightList({
      variables: {
        from: data.from,
        to: data.to,
        dateMin: data.fromDate,
        dateMax: data.toDate
      }
    })
  };

  const listContext: UseListValue<FlightDto> = useList({
    data: flightList as Array<FlightDto>,
  });

  return (
    <div>
      <Title title="pages.TicketBooking"/>
      <Typography>Ticket Booking</Typography>

      <ClientForm client={value => setClientId(value)}/>

      <SimpleForm id="search-flights"
                  onSubmit={doSearchFlights}
                  toolbar={<SearchFormToolbar/>}>

        <Grid container spacing={2}>
          <Grid item xs={3} md={3}>
            <ReferenceInput
              source="from"
              reference="AirportDto"
            >
              <AutocompleteInput
                optionText={(value => `${value.name} (${value.code})`)}
                validate={required()}
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={3} md={3}>
            <ReferenceInput
              source="to"
              reference="AirportDto"
            >
              <AutocompleteInput
                optionText={(value => `${value.name} (${value.code})`)}
                validate={required()}
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={3} md={3}>
            <DateInput source="fromDate" validate={required()}/>
          </Grid>
          <Grid item xs={3} md={3}>
            <DateInput source="toDate" validate={required()}/>
          </Grid>
        </Grid>
      </SimpleForm>


      <ListContextProvider value={listContext}>
        {(flightList || []).map((item =>
            <Card sx={{margin: '12px'}} key={item.id}>
              <CardContent>
                <Typography component="div" variant="h5">
                  {item.number}
                </Typography>
                <Typography component="div">
                  Airline: {item.airlineName}
                </Typography>
                <Typography component="div">
                  From: {item.fromAirport?.name}
                </Typography>
                <Typography component="div">
                  To: {item.toAirport?.name}
                </Typography>
              </CardContent>
              <CardActions>
                <BuyTicketButton flightId={item.id} clientId={() => clientId}/>
              </CardActions>
            </Card>
        ))}
      </ListContextProvider>

    </div>
  );
}

