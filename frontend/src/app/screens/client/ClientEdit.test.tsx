import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { defaultTestRecordId, testDataProvider } from "../../../dataProvider/testDataProvider";
import { ClientEdit } from "./ClientEdit";

test("<ClientEdit>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <ClientEdit resource="ClientDto" id={defaultTestRecordId} />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.ClientDto.fields.firstName");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
