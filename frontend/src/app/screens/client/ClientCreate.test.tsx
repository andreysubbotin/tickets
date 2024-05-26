import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { ClientCreate } from "./ClientCreate";

test("<ClientCreate>", async () => {
  await act(async () => {
    render(
      <AdminContext>
        <ClientCreate resource="ClientDto" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.ClientDto.fields.firstName");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
