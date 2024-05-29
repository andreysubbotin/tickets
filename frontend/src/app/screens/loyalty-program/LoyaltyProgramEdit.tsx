import { gql } from "@amplicode/gql";
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
import { BigDecimalNumberInput } from "../../../core/components/number/BigDecimalNumberInput";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const LOYALTY_PROGRAM = gql(`query LoyaltyProgram($id: ID!) {
	loyaltyProgram(id: $id) {
		id
		name
		discountPercent
	}
}`);
const UPDATE_LOYALTY_PROGRAM = gql(`mutation UpdateLoyaltyProgram($input: LoyaltyProgramInput!) {
	updateLoyaltyProgram(input: $input) {
		id
		name
		discountPercent
	}
}`);

type AdvancedEditProps = Omit<EditProps, "id" | "queryOptions" | "mutationOptions"> & {
  id?: string;
};

export const LoyaltyProgramEdit = (props: AdvancedEditProps) => {
  const queryOptions = {
    meta: {
      query: LOYALTY_PROGRAM,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_LOYALTY_PROGRAM } };
        const options = { returnPromise: true };

        await update("LoyaltyProgram", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "LoyaltyProgram");
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
        <TextInput source="name" />
        <BigDecimalNumberInput source="discountPercent" />
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof LOYALTY_PROGRAM>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["loyaltyProgram"], undefined>;
