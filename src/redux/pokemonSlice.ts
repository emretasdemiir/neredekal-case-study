import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PokemonState {
  allPokemons: Record<string, any>
  pokemons: Record<string, any>
  selectedPokemon: Record<string, any> | null
  selectedPokemonData: Record<string, any>
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PokemonState = {
  allPokemons: [],
  pokemons: [],
  selectedPokemon: null,
  selectedPokemonData: [],
  status: 'idle',
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    allPokemons: (state, action: PayloadAction<{}>) => {
      state.allPokemons = action.payload
    },
    pokemonsAction: (state, action: PayloadAction<{}>) => {
      state.pokemons = action.payload
    },
    selectedPokemon: (state, action: PayloadAction<{}>) => {
      state.selectedPokemon = action.payload
    },
    selectedPokemonData: (state, action: PayloadAction<{}>) => {
      state.selectedPokemonData = action.payload
    },
  },

})

export const { allPokemons, pokemonsAction, selectedPokemon, selectedPokemonData } = pokemonSlice.actions

export default pokemonSlice.reducer
