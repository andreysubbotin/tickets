import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
  ...englishMessages,

  resources: {
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

  enums: {
    Gender: {
      MALE: "Male",
      FEMALE: "Female"
    }
  },

  pages: {
    FlightSearch: "Flight Search"
  },

  amplicode: {
    not_set: "Not set"
  }
};

export const en = mergeMessages(
  messages,
  [] // place addon messages here
);
