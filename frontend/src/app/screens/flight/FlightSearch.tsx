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
import {useMemo, useState} from "react";
import {getClientDtoRecordRepresentation} from "../../../core/record-representation/getClientDtoRecordRepresentation";
import {gql} from "@amplicode/gql";
import {useLazyQuery, useMutation} from "@apollo/client";
import {FlightDto} from "@amplicode/gql/graphql";
import {renderDateTime} from "../../../core/format/renderDateTime";

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
            client {
                id
                firstName
                lastName
                email
                gender
                loyaltyProgram {
                    id
                    name
                    discountPercent
                }
            }
            flight {
                id
                number
                airlineName
                airlineCode
                takeoffDate
                landingDate
            }
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
  }] = useMutation(BOOK_TICKET_BUY_TICKET_BUTTON, {
    variables: {
      flightId: null, // todo pass value
      clientId: null // todo pass value
    }
  });
  runBookTicket().then(result => {
    const bookTicketResult = result.data?.bookTicket;
  })
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
    }}>Buy ticket</Button>
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
    error: flightListError,
    data: flightListData
  }] = useLazyQuery(FLIGHT_LIST_FLIGHT_SEARCH, {});
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
                  Airline code: {item.airlineCode}
                </Typography>
                <Typography component="div">
                  Airline name: {item.airlineName}
                </Typography>
                <Typography component="div">
                  From airport: {item?.fromAirport?.name}
                </Typography>
                <Typography component="div">
                  To airport: {item?.toAirport?.name}
                </Typography>
                <Typography component="div">
                  Takeoff date: {renderDateTime(item.takeoffDate)}
                </Typography>
                <Typography component="div">
                  Landing date: {renderDateTime(item.landingDate)}
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