import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Pokemon.css";

interface PokemonProps {
  name: string;
  url: string;
}

const Pokemon = (props: PokemonProps) => {
  const [pokemonCard, setPokemonCard] = useState({
    id: 0,
  });
  const [pokemonImage, setPokemonImage] = useState({
    image_src: "",
  });

  useEffect(() => {
    axios
      .get(props.url)
      .then(function (response) {
        setPokemonCard({
          id: response.data.id,
        });
        setPokemonImage({
          image_src:
            "https://pokeres.bastionbot.org/images/pokemon/" +
            response.data.id +
            ".png",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.url]);

  return (
    <div>
      <Link to={"/" + pokemonCard.id}>
        <div className="card">
          <div className="card-body">
            <img src={pokemonImage.image_src} alt={props.name} />
          </div>
          <strong className="card-footer">
            #{pokemonCard.id} {props.name}
          </strong>
        </div>
      </Link>
    </div>
  );
};
export default Pokemon;
