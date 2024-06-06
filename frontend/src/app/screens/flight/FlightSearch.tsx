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
    if (flightId == null) {
        return null
    }
    const notify = useNotify();
    return (
        <Button onClick={async e => {
            const clId = clientId()
            if (clId == null) {
                notify("Client is required for booking", {type: 'warning'})
            } else {
                // await runBookTicket({
                //     variables: {
                //         flightId: flightId,
                //         clientId: clId
                //     }
                // })
                notify(`Ticket booked successfully`, {type: "success"});
            }
        }} label={"Buy ticket"}/>
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
        // loadFlightList({
        //     variables: {
        //         from: data.from,
        //         to: data.to,
        //         dateMin: data.fromDate,
        //         dateMax: data.toDate
        //     }
        // })
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