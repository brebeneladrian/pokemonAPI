import React from "react";
import { render } from "@testing-library/react";
import Pokeframe, { fetchAllPokemon } from "../Pokeframe";

describe("<Pokeframe />", () => {
  it("Renders <Pokeframe /> component correctly", () => {
    const { getByText } = render(<Pokeframe />);
    expect(getByText(/POKEMON LIST/i)).toBeInTheDocument();
  });

  // The assertion for a promise must be returned.
  it("test response data", () => {
    expect.assertions(1);
    return fetchAllPokemon(0, 1).then((results) => {
      expect(results[0].name).toEqual("bulbasaur");
    });
  });
});
