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
        email: "Email",
        gender: "Gender",

        loyaltyProgram: {
          id: "Loyalty Program"
        }
      }
    },

    LoyaltyProgram: {
      name: "Loyalty Program |||| Loyalty Programs",

      fields: {
        name: "Name",
        discountPercent: "Discount Percent"
      }
    }
  },

  pages: {
    FlightSearch: "Flight Search"
  },

  enums: {
    Gender: {
      MALE: "Male",
      FEMALE: "Female"
    }
  },

  amplicode: {
    not_set: "Not set"
  }
};

export const en = mergeMessages(
  messages,
  [] // place addon messages here
);
