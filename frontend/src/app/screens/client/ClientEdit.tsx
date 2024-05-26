import { gql } from "@amplicode/gql";
import { Gender } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  Edit,
  EditProps,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { EnumInput } from "../../../core/components/enum/EnumInput";
import { SingleReferenceInput } from "../../../core/components/reference/SingleReferenceInput";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";
import { getLoyaltyProgramRecordRepresentation } from "../../../core/record-representation/getLoyaltyProgramRecordRepresentation";

const CLIENT = gql(`query Client($id: ID!) {
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

type AdvancedEditProps = Omit<EditProps, "id" | "queryOptions" | "mutationOptions"> & {
  id?: string;
};

export const ClientEdit = (props: AdvancedEditProps) => {
  const queryOptions = {
    meta: {
      query: CLIENT,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_CLIENT } };
        const options = { returnPromise: true };

        await update("ClientDto", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "ClientDto");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions} {...props}>
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
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof CLIENT>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["client"], undefined>;
