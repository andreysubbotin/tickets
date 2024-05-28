# Sample data for clients

```postgresql
insert into client(id, first_name, last_name, gender, email)
values
    ('e2692842-dc0a-40bf-88b9-506d56764597', 'Ashira', 'Funes', 'FEMALE', 'shenea_thomsen818a@example.com'),
    ('fe910f68-9377-4fad-9058-7773c708c168', 'Maya', 'Colston', 'FEMALE', 'mayac@example.com'),
    ('d7bf825c-e889-4947-a641-e025182120ab', 'Christopher', 'Merlo', 'MALE', 'cmerlo@example.com'); 
```

# RadioButtonGroupInput for VSCode
```typescript jsx
<RadioButtonGroupInput
    source="gender"
    choices={[
        {id: Gender.Male, name: "Male"},
        {id: Gender.Female, name: "Female"},
    ]}
/> 
```

# AuditorAware
```java
@Component
public class TicketsAuditorAware implements AuditorAware<String> {
    private final AuthenticationInfoProvider authenticationInfoProvider;

    public TicketsAuditorAware(AuthenticationInfoProvider authenticationInfoProvider) {
        this.authenticationInfoProvider = authenticationInfoProvider;
    }

    @Override
    public Optional<String> getCurrentAuditor() {
        String username = authenticationInfoProvider.getPreferredUsername();
        return Optional.ofNullable(username);
    }
}
```

# FlightsSearch initial content
```typescript jsx
import {Grid, Typography} from "@mui/material";
import {AutocompleteInput, Button, ReferenceInput, required, SimpleForm, Title, Toolbar, useNotify} from "react-admin";
import {DateInput} from "../../../core/components/datetime/DateInput";
import {useState} from "react";
import {getClientDtoRecordRepresentation} from "../../../core/record-representation/getClientDtoRecordRepresentation";

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
  return (
    <Button onClick={e => {
      const clId = clientId()
      if (clId == null) {
        notify("Client is required for booking", {type: 'warning'})
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

  const doSearchFlights = (data: Record<string, any>) => {
  };

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
    </div>
  );
}
```

# FlightSearch customizations

```typescript
() => (flightSearchData?.flightSearch || []) as FlightDto[],
```

```typescript
{item.fromAirport?.name}
```

```typescript
{item.toAirport?.name}
```

```typescript
{renderDateTime(item.takeoffDate)}
```

```typescript
{renderDateTime(item.landingDate)}
```
# TicketDto

```java
private Client client;
private FlightDto flight;
```

(+ getters setters)


# TicketMapper
```java
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING,
uses = TicketService.class
)
```

```java
@Mapping(source = "clientId", target = "client")
@Mapping(source = "flightId", target = "flight")
TicketDto toDto(Ticket ticket);
```

# TicketController#bookTicket
```graphql
type Mutation {
bookTicket(flightId: ID!, clientId: ID!): BookResult!
}

type BookResult {
    ticket: TicketDto
}
```

```java
@MutationMapping(name = "bookTicket")
@NotNull
public BookResult bookTicket(@Argument @NotNull @GraphQLId Long flightId, @Argument @NotNull @GraphQLId UUID clientId) {
}
```

# FlightSearch.tsx adjustments
```typescript
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
```

```typescript
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
```
# TicketController#findAll()

```java
UUID clientId = filter != null ? filter.getClientId() : null;
Page<Ticket> pageResult;
if (clientId == null) {
pageResult = crudRepository.findAll(pageable);
} else {
pageResult = crudRepository.findByClientId(clientId, pageable);
}
return ResultPage.page(
pageResult.map(mapper::toDto).getContent(),
pageResult.getTotalElements()
);
```

# TicketList.tsx adjustments
```typescript jsx
const filters = [
<ReferenceInput source="clientId" reference="Client" alwaysOn >
<AutocompleteInput optionText={getClientRecordRepresentation} sx={{width: "15em"}}/>
</ReferenceInput>
];
```
---------------- 
```typescript jsx
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
```