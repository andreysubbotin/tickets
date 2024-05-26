import get from "lodash/get";
import { FunctionField, FunctionFieldProps, RaRecord } from "react-admin";
import { renderOffsetTime } from "../../format/renderOffsetTime";

export const OffsetTimeField = (props: Omit<FunctionFieldProps, "render">) => {
  const { source } = props;
  if (source == null) {
    return null;
  }

  return (
    <FunctionField
      render={(record: RaRecord) => renderOffsetTime(get(record, source))}
      {...props}
    />
  );
};
