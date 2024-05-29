import { expect } from "@jest/globals";
import { getListOperationName } from "./getListOperationName";

describe("getListOperationName", () => {
  it("getListOperationName should return correct operation name for list query", async () => {
    let queryName: string = getListOperationName("PetDTO");
    expect(queryName).toEqual("petList");

    queryName = getListOperationName("PetDto");
    expect(queryName).toEqual("petList");

    queryName = getListOperationName("PetDTOther");
    expect(queryName).toEqual("petDtOtherList");
  });
});
