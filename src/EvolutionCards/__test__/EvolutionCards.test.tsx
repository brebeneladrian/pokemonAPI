import React from "react";
import { render } from "@testing-library/react";
import EvolutionCards from "../EvolutionCards";

describe("<EvolutionCards />", () => {
  it("Renders <EvolutionCards /> component correctly", () => {
    const { getByText } = render(<EvolutionCards />);
    expect(getByText(/Possible Evolutions:/i)).toBeInTheDocument();
  });
});
