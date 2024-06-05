import { TicketDto } from "../../gql/graphql";

export function getTicketDtoRecordRepresentation(
  entityInstance?: Partial<TicketDto> | null
): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
