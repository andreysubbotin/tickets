import { camelCase } from "change-case";
import { singular } from "pluralize";

export const getListOperationName = (resource: string, meta?: { operation: string }): string => {
  if (meta?.operation != null) {
    return meta?.operation;
  }

  const operationName: string = resource.replace(/(DTO$|Dto$)/, "");
  return `${camelCase(singular(operationName))}List`;
};
