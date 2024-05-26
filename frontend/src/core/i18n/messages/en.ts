import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
  ...englishMessages,

  resources: {
    TicketDto: {
      name: "Ticket |||| Tickets",

      fields: {
        price: "Price",
        createdBy: "Created By",
        createdDate: "Created Date",
        lastModifiedBy: "Last Modified By",
        lastModifiedDate: "Last Modified Date",

        client: {
          id: "Client"
        },

        flight: {
          id: "Flight"
        }
      }
    },

    ClientDto: {
      name: "Client |||| Clients",

      fields: {
        firstName: "First Name",
        lastName: "Last Name",

        loyaltyProgram: {
          id: "Loyalty Program"
        },

        gender: "Gender"
      }
    }
  },

  enums: {
    Gender: {
      MALE: "Male",
      FEMALE: "Female"
    }
  },

  pages: {
    FlightSearch: "Flight Search",
    BlankScreen: "Blank Screen"
  },

  amplicode: {
    not_set: "Not set"
  }
};

export const en = mergeMessages(
  messages,
  [] // place addon messages here
);
