import { gql } from "@amplicode/gql";
import { Gender } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  Create,
  CreateProps,
  SimpleForm,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { EnumInput } from "../../../core/components/enum/EnumInput";
import { SingleReferenceInput } from "../../../core/components/reference/SingleReferenceInput";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";
import { getLoyaltyProgramRecordRepresentation } from "../../../core/record-representation/getLoyaltyProgramRecordRepresentation";

const UPDATE_CLIENT = gql(`mutation UpdateClient($input: ClientDtoInput!) {
  updateClient(input: $input) {
    id
    firstName
    lastName
    loyaltyProgram {
      id
      name
      discountPercent
    }
    gender
  }
}`);

export const ClientCreate = (props: CreateProps) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_CLIENT } };
        const options = { returnPromise: true };

        await create("ClientDto", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "ClientDto");
      } catch (response: any) {
        console.log("create failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [create, notify, redirect]
  );

  return (
    <Create<ItemType> redirect="list" {...props}>
      <SimpleForm onSubmit={save}>
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <SingleReferenceInput
          source="loyaltyProgram.id"
          reference="LoyaltyProgram"
          recordRepresentation={getLoyaltyProgramRecordRepresentation}
        />
        <EnumInput source="gender" enumTypeName="Gender" enum={Gender} />
      </SimpleForm>
    </Create>
  );
};

const CLIENT_TYPE = gql(`query Client($id: ID!) {
  client(id: $id) {
    id
    firstName
    lastName
    loyaltyProgram {
      id
      name
      discountPercent
    }
    gender
  }
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof CLIENT_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["client"], undefined>;
