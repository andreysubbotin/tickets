import get from "lodash/get";
import { FunctionField, FunctionFieldProps, RaRecord } from "react-admin";
import { renderDateTime } from "../../format/renderDateTime";

export const LocalDateTimeField = (props: Omit<FunctionFieldProps, "render">) => {
  const { source } = props;
  if (source == null) {
    return null;
  }

  return (
    <FunctionField render={(record: RaRecord) => renderDateTime(get(record, source))} {...props} />
  );
};
