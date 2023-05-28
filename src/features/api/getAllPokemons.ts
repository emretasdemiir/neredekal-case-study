import axios from "axios"
import { allPokemons } from "../../redux/pokemonSlice"
import store from "../../store"

export default async function fetchAllPokemons(): Promise<{}> {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1281`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  store.dispatch(allPokemons(response.data.results))
  return response.data.results
}
