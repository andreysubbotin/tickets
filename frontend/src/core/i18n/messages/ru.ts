import russianMessages from "@haulmont/ra-language-russian";
import { TranslationMessages } from "ra-core";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
    ...russianMessages,
    resources: {},
    ticketBooking: "Ticket Booking"
};

export const ru = mergeMessages(
  messages,
  [] // place addon messages here
);
