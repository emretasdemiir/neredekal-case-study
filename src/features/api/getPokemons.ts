import axios from "axios"
import { pokemonsAction } from "../../redux/pokemonSlice"
import store from "../../store"

export default async function fetchPokemons(offset: number): Promise<{}> {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  store.dispatch(pokemonsAction(response.data.results))
  return response.data.results
}
