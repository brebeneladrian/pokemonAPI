import React, { useState, useEffect } from "react";
import axios from "axios";

interface EvolutionCardsProps {
  pokemonId: string;
}

interface evolutionURL {
  evolution_chain: { [key: string]: string };
}

interface evolutionObject {
  evolves_to: evolutionObject[];
  species: { [key: string]: string };
}
interface evolutionArrayItem {
  name: string;
  id: RegExpMatchArray | null;
  image: string;
}

interface evolutionArray {
  evolution_array: evolutionArrayItem[];
}

const EvolutionCards = (props: EvolutionCardsProps) => {
  const [evolutionURL, setEvolutionURL] = useState<evolutionURL>({
    evolution_chain: {},
  });
  const [pokemonEvolution, setPokemonEvolution] = useState<evolutionArray>({
    evolution_array: [],
  });

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/` + props.pokemonId)
      .then(function (response) {
        setEvolutionURL({
          evolution_chain: response.data.evolution_chain,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.pokemonId]);

  useEffect(() => {
    if (evolutionURL.evolution_chain.url) {
      axios
        .get(evolutionURL.evolution_chain.url)
        .then(function (response) {
          getEvolutionArray(response.data.chain);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [evolutionURL.evolution_chain.url]);

  function getEvolutionArray(evolutionObject: evolutionObject) {
    var evolution_array_temp = [];
    while (true) {
      evolution_array_temp.push({
        name: evolutionObject.species.name,
        id: evolutionObject.species.url
          .split("pokemon-species")[1]
          .match(/\d+/),
        image:
          "https://pokeres.bastionbot.org/images/pokemon/" +
          evolutionObject.species.url.split("pokemon-species")[1].match(/\d+/) +
          ".png",
      });
      if (evolutionObject.evolves_to.length < 1) {
        break;
      }
      evolutionObject = evolutionObject.evolves_to[0];
    }
    setPokemonEvolution({
      evolution_array: evolution_array_temp,
    });
  }

  return (
    <div>
      <h3 className="title mt-5 mb-5">Possible Evolutions:</h3>
      <div className="row">
        {pokemonEvolution.evolution_array.map(
          (evolutionArrayIterator: evolutionArrayItem, index) => (
            <div
              className="col-lg-4 col-12 mb-5 section--center-alignment evolution-image"
              key={index}
            >
              <img
                src={evolutionArrayIterator.image}
                alt={evolutionArrayIterator.name}
              />
              <h4 className="mt-3 details-poke-name">
                {evolutionArrayIterator.name}
              </h4>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default EvolutionCards;
