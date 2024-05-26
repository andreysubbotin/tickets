import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { testDataProvider } from "../../../dataProvider/testDataProvider";
import { ClientList } from "./ClientList";

test("<ClientList>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <ClientList resource="ClientDto" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.ClientDto.empty");
  expect(element.constructor.name).toEqual("HTMLParagraphElement");
});
