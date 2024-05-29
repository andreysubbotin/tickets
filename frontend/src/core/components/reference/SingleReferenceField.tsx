import get from "lodash/get";
import { FunctionField, FunctionFieldProps, RaRecord } from "react-admin";

export interface SingleReferenceFieldProps extends Omit<FunctionFieldProps, "render"> {
  recordRepresentation: (item: Record<string, unknown>) => string;
}

export const SingleReferenceField = (props: SingleReferenceFieldProps) => {
  const { recordRepresentation, ...funcFieldProps } = props;

  if (funcFieldProps.source == null) {
    return null;
  }

  // instead of `source`, `propertyPath` should not contain `.id` at the end of the line
  const propertyPath: string = funcFieldProps.source.replace(/\.id$/, "");
  return (
    <FunctionField
      render={(record: RaRecord) => recordRepresentation(get(record, propertyPath))}
      {...funcFieldProps}
    />
  );
};
