import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { testDataProvider } from "../../../dataProvider/testDataProvider";
import { TicketList } from "./TicketList";

test("<TicketList>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <TicketList resource="TicketDto" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.TicketDto.empty");
  expect(element.constructor.name).toEqual("HTMLParagraphElement");
});
