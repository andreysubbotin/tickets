import { gql } from "@amplicode/gql";
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
import { BigDecimalNumberInput } from "../../../core/components/number/BigDecimalNumberInput";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const UPDATE_LOYALTY_PROGRAM = gql(`mutation UpdateLoyaltyProgram($input: LoyaltyProgramInput!) {
	updateLoyaltyProgram(input: $input) {
		id
		name
		discountPercent
	}
}`);

export const LoyaltyProgramCreate = (props: CreateProps) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_LOYALTY_PROGRAM } };
        const options = { returnPromise: true };

        await create("LoyaltyProgram", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "LoyaltyProgram");
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
        <TextInput source="name" />
        <BigDecimalNumberInput source="discountPercent" />
      </SimpleForm>
    </Create>
  );
};

const LOYALTY_PROGRAM_TYPE = gql(`query LoyaltyProgram($id: ID!) {
	loyaltyProgram(id: $id) {
		id
		name
		discountPercent
	}
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof LOYALTY_PROGRAM_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["loyaltyProgram"], undefined>;
