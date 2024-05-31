import { FlightDto } from "../../gql/graphql";

export function getFlightDtoRecordRepresentation(
  entityInstance?: Partial<FlightDto> | null
): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
