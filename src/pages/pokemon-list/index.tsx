// React
import React, { useEffect, useState } from 'react'
// Redux
import store from '../../store'
import { useSelector } from 'react-redux'
import { pokemonsAction, selectedPokemon } from '../../redux/pokemonSlice'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/SearchBar';
// MUI Style
import { Grid, Typography } from '@mui/material'
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
// Components
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcons from 'react-loading-icons'
import Link from 'next/link'
import Head from 'next/head'
// API
import fetchPokemons from '../../features/api/getPokemons'
import fetchAllPokemons from '../../features/api/getAllPokemons';
import { placeholderImageUrl } from '../../features/helpers/variables/variables';

export default function index() {
  const pokemons = useSelector((state: Record<string, any>) => state.pokemonStore.pokemons)
  const allPokemons = useSelector((state: Record<string, any>) => state.pokemonStore.allPokemons)

  const [pokemonsData, setPokemonsData] = useState<any>([])
  const [actualPokemonsData, setActualPokemonsData] = useState<any>([])
  const [searchedPokemonsData, setSearchedPokemonsData] = useState<any>([])
  const [noSearchResult, setNoSearchResult] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [imageLoaded, setImageLoaded] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      fetchPokemons(offset)
      fetchAllPokemons()
    }, 1000);
  }, [])

  useEffect(() => {
    if ((searchedPokemonsData && searchedPokemonsData.length > 0) || pokemonsData?.length > 0) {
      setActualPokemonsData(searchedPokemonsData?.length > 0 ? searchedPokemonsData : pokemonsData?.length > 0 && pokemonsData)
    }

    if (searchedPokemonsData) {
      setNoSearchResult(false)
    }
    else {
      setNoSearchResult(true)
    }
  }, [pokemonsData, searchedPokemonsData])

  useEffect(() => {
    if (pokemonsData.length >= 12) {
      setPokemonsData((prevDatas: any) => [...prevDatas, ...pokemons]);
    }
    else {
      setPokemonsData(pokemons);
    }
    setOffset((prevOffset: any) => prevOffset + 12);
  }, [pokemons])

  const getPokemonId = (url: string) => {
    let pokemonId = " "
    debugger
    for (let index = 35; index < url.length; index++) {
      if (url.substring(index, index + 1) === "/") {
        pokemonId = url.substring(34, index)
      }
    }

    return pokemonId
  }

  const handleErrorImage = () => {
    return placeholderImageUrl
  }

  const fetchForScroll = () => {
    setTimeout(() => {
      fetchPokemons(offset)
    }, 1000);
  }

  const handlePokemonClick = (selected: Record<string, string>) => {
    store.dispatch(selectedPokemon(selected))
    store.dispatch(pokemonsAction([]))
    setPokemonsData([])
  }

  const handleSearch = (value: string) => {
    let filteredPokemonsData

    if (value) {
      filteredPokemonsData = allPokemons?.filter((pokemon: Record<string, string>) => pokemon.name.includes(value))
    }

    if (!filteredPokemonsData) {
      setSearchedPokemonsData([])
    }

    else if (filteredPokemonsData.length === 0) {
      setSearchedPokemonsData(null)
    }

    else {
      setSearchedPokemonsData(filteredPokemonsData)
    }
  }

  return (
    <>
      <Head>
        <title>Pokémon List</title>
        <link href="https://fonts.cdnfonts.com/css/pokemon-solid?styles=24573" rel="stylesheet" />
      </Head>
      <Container fixed sx={{ marginY: "5px" }}>
        <center><a href="/"><img src="https://fontmeme.com/permalink/230525/eb6b2162eba92697094422591c16b5e1.png" alt="pokemon-font" /></a></center>
        <Search onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search pokémon between all pokémon…"
            inputProps={{ 'aria-label': 'search-pokemon' }}
          />
        </Search>
        {
          noSearchResult ?
            <Grid container spacing={3} marginY={5}>
              <Typography>No pokémon found.</Typography>
            </Grid>
            :
            <InfiniteScroll
              dataLength={actualPokemonsData.length}
              next={fetchForScroll}
              hasMore={true} // Replace with a condition based on your data source
              loader={searchedPokemonsData?.length === 0 && <center><LoadingIcons.Oval stroke="#ffcb05" width={45} height={45} /></center>}
              endMessage={<p>No more data to load.</p>}
            >
              <Grid container spacing={3} marginY={5}>
                {actualPokemonsData?.map((pokemon: any, index: number) => (
                  <Grid item key={index} display="flex" flexDirection="column" alignItems="center" xs={3}>
                    <Link href={`/pokemon-detail/${getPokemonId(pokemon.url)}`} onClick={() => handlePokemonClick(pokemon)}>
                      <ImageListItem key={pokemon.img} sx={{ width: "200px", height: "200px!important" }}>
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getPokemonId(pokemon.url)}.svg`}
                          alt={pokemon.name}
                          placeholder={placeholderImageUrl}
                          // width={150} height={150}
                          loading="lazy"
                          style={{ objectFit: "contain" }}
                        />
                        <ImageListItemBar
                          title={pokemon.name.toLowerCase()}
                          sx={{ textTransform: "capitalize" }}
                        />
                      </ImageListItem>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
        }
      </Container>
    </>
  )
}
