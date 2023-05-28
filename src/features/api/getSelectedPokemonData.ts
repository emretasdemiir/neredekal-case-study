import axios from "axios"
import { selectedPokemonData } from "../../redux/pokemonSlice"
import store from "../../store"

export default async function fetchSelectedPokemonData(id: number): Promise<{}> {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  store.dispatch(selectedPokemonData(response.data))
  return response.data.results
}
