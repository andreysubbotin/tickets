import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { defaultTestRecordId, testDataProvider } from "../../../dataProvider/testDataProvider";
import { TicketShow } from "./TicketShow";

test("<TicketShow>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <TicketShow resource="TicketDto" id={defaultTestRecordId} />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.TicketDto.fields.price");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
