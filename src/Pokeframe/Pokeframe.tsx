import React, { ComponentType } from "react";

import Pokemon from "../Pokemon/Pokemon";

export const fetchAllPokemon = (pageOffset: number, limit: number) => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageOffset}`
  )
    .then((res) => res.json())
    .then((response: { results: { [key: string]: string }[] }) => {
      return response.results;
    });
};

interface PokeFrame {
  pokemons: { [key: string]: string }[];
  scrolledPokemon: { [key: string]: string }[];
  pageNumber: number;
  pageOffset: number;
  limit: number;
  isFetching: boolean;
}

export default class Pokeframe extends React.Component<
  ComponentType,
  PokeFrame
> {
  constructor(props: ComponentType) {
    super(props);
    this.state = {
      pokemons: [],
      scrolledPokemon: [],
      pageNumber: 0,
      pageOffset: 0,
      limit: 32,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.getAllPokemon();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate() {
    if (!this.state.isFetching) return;
    this.getAllPokemon();
  }

  getAllPokemon = () => {
    this.setState({ isFetching: false });
    fetchAllPokemon(this.state.pageOffset, this.state.limit).then((results) => {
      this.state.scrolledPokemon.push(...results);
      this.setState({ pokemons: this.state.scrolledPokemon });
    });
  };

  handleScroll = () => {
    var scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop > 300) return;
    this.setState({
      isFetching: true,
      pageOffset: this.state.pageOffset + 32,
    });
  };

  render = () => {
    return (
      <div>
        <h2 className="mt-4 mb-4">POKEMON LIST</h2>
        <div>
          <div className="container">
            <div className="row">
              {this.state.pokemons.map((pokemon, index) => (
                <div className="col-lg-3 col-12" key={index}>
                  <Pokemon name={pokemon.name} url={pokemon.url} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
}
