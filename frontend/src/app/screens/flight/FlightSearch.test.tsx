import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { FlightSearch } from "./FlightSearch";

test("<FlightSearch>", async () => {
  await act(async () => {
    render(
      <AdminContext>
        <FlightSearch />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  expect(screen.getByText("Flight Search")).toHaveClass("MuiTypography-root");
});
