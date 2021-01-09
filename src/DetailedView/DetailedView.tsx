import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import EvolutionCards from "../EvolutionCards/EvolutionCards";

type DetailedViewParams = {
  pokemonId: string;
};

interface PokemonType {
  name: string;
}

interface Ability {
  name: string;
}

interface Move {
  name: string;
}

interface Stat {
  base_stat: number;
  stat: { [key: string]: string };
}

const DetailedView = (props: RouteComponentProps<DetailedViewParams>) => {
  const [pokemonDetail, setPokemonDetail] = useState({
    name: "",
    height: "",
    weight: "",
    moves: [],
    types: [],
    order: "",
    abilities: [],
    stats: [
      {
        base_stat: 0,
        stat: {},
      },
    ],
  });

  const [pokemonImage, setPokemonImage] = useState({
    image_src: "",
  });

  useEffect(() => {
    if (props.match.params.pokemonId) {
      var id = props.match.params.pokemonId;
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/` + id)
        .then(function (response) {
          setPokemonDetail({
            name: response.data.name,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types,
            abilities: response.data.abilities,
            stats: response.data.stats,
            moves: response.data.moves,
            order: response.data.order,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      setPokemonImage({
        image_src:
          "https://pokeres.bastionbot.org/images/pokemon/" + id + ".png",
      });
    }
  }, [props.match.params.pokemonId]);

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">POKEMON DETAILS</h2>
      <div className="row mt-5">
        <div className="col-lg-4 col-12 image-details">
          <img src={pokemonImage.image_src} alt={pokemonDetail.name} />
        </div>
        <div className="col-lg-4 col-12 details">
          <div>
            <strong className="title">Name: </strong>
            <strong className="details-poke-name">{pokemonDetail.name}</strong>
          </div>
          <div>
            <strong className="title">Height:</strong>
            <span>{pokemonDetail.height}</span>
          </div>
          <div>
            <strong className="title">Weight:</strong>
            <span>{pokemonDetail.weight}</span>
          </div>
          <div>
            <strong className="title">Order:</strong>
            <span>{pokemonDetail.order}</span>
          </div>
          <div>
            <strong className="title">Stats:</strong>
            <ul>
              {pokemonDetail.stats.map((statIterator: Stat, index: number) => (
                <li key={index}>
                  <strong>{statIterator.stat.name}: </strong>
                  {statIterator.base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong className="title">Type:</strong>
            <ul>
              {pokemonDetail.types.map((type: { type: PokemonType }, index) => (
                <Badge variant="primary" key={index}>
                  {type.type.name}
                </Badge>
              ))}
            </ul>
            <strong className="title">Ability:</strong>
            <ul>
              {pokemonDetail.abilities.map(
                (ability: { ability: Ability }, index) => (
                  <Badge variant="info" key={index}>
                    {ability.ability.name}
                  </Badge>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-12 details">
          <div>
            <strong className="title">Moves:</strong>
            <ul>
              {pokemonDetail.moves.map((move: { move: Move }, index) => (
                <Badge variant="info" key={index}>
                  {move.move.name}
                </Badge>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <EvolutionCards pokemonId={props.match.params.pokemonId} />
    </div>
  );
};
export default DetailedView;
