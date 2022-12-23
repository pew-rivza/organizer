import React from "react";
import { render, screen } from "@testing-library/react";
import { BalanceWheel } from "./apps/balanceWheel";

test("renders learn react link", () => {
  render(<BalanceWheel />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
