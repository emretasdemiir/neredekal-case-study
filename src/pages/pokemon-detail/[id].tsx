// React
import React, { useEffect, useState } from 'react'
// MUI Style
import { Box, Button, Container, Typography } from '@mui/material';
// Redux
import { useSelector } from 'react-redux';
// Components
import { useRouter } from 'next/router';
import Head from 'next/head';
import ReactCardFlip from 'react-card-flip';
import { placeholderImageUrl } from '../../features/helpers/variables/variables';
// API
import fetchSelectedPokemonData from '../../features/api/getSelectedPokemonData';

export default function index() {
    const router = useRouter();
    const { id } = router.query

    const [isFlipped, setIsFlipped] = useState<boolean>(false)
    const [image, setImage] = useState<string>("")

    const selectedPokemon = useSelector((state: Record<string, any>) => state.pokemonStore.selectedPokemon)
    const selectedPokemonData = useSelector((state: Record<string, any>) => state.pokemonStore.selectedPokemonData)

    useEffect(() => {
        id && fetchSelectedPokemonData(Number(id))
    }, [selectedPokemon, id])

    useEffect(() => {
        if (selectedPokemonData.sprites) {
            !isFlipped ? setImage(selectedPokemonData.sprites.front_default) : setImage(selectedPokemonData.sprites.back_default)
        }
    }, [selectedPokemonData, isFlipped])


    const handleClick = (e: any) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }

    const flipCardStyles = {
        width: "100px"
    }

    return (
        <>
            <Head>
                <title>{selectedPokemonData && selectedPokemonData.name} Details</title>
                <link href="https://fonts.cdnfonts.com/css/pokemon-solid?styles=24573" rel="stylesheet" />
            </Head>

            <Button sx={{ borderRadius: "0px" }} size='small' fullWidth variant="contained" onClick={(e) => router.push('/pokemon-list')}>RETURN TO POKEDEX</Button>

            <Container fixed sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginY: "25px" }}>
                <Typography variant="h5" gutterBottom textTransform="capitalize">{selectedPokemonData && selectedPokemonData.name} Details</Typography>
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerStyle={flipCardStyles}>
                    <Box className="react-card-front" width="100px !important" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <img
                            src={image ? image : placeholderImageUrl}
                            // alt={pokemon.name}
                            width={200} height={200}
                            // loading="lazy"
                            style={{ objectFit: "contain" }}
                        />
                        <Box marginY={3}>
                            <Button size='small' fullWidth variant="contained" onClick={(e) => handleClick(e)}>Flip Back</Button>
                        </Box>
                    </Box>
                    <Box className="react-card-front" width="100px !important" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <img
                            src={image ? image : placeholderImageUrl}
                            // alt={pokemon.name}
                            width={200} height={200}
                            // loading="lazy"
                            style={{ objectFit: "contain" }}
                        />
                        <Box marginY={3}>
                            <Button size='small' fullWidth variant="contained" onClick={(e) => handleClick(e)}>Flip Front</Button>
                        </Box>
                    </Box>
                </ReactCardFlip>
                <div className='pokemon-details'>
                    <Typography gutterBottom textTransform="capitalize"><b>Name:</b> {selectedPokemonData && selectedPokemonData.name}</Typography>
                    <Typography gutterBottom textTransform="capitalize"><b>
                        Type/types:</b>
                        {selectedPokemonData && selectedPokemonData?.types?.map((item: Record<string, any>, index: number) => (
                            <span>
                                {" " + item.type.name + (selectedPokemonData?.types.length !== (index + 1) ? "," : "")}
                            </span>
                        ))}
                    </Typography>
                    <Typography gutterBottom textTransform="capitalize"><b>
                        Abilities:</b>
                        {selectedPokemonData && selectedPokemonData?.abilities?.map((item: Record<string, any>, index: number) => (
                            <span>
                                {" " + item.ability.name + (selectedPokemonData?.abilities.length !== (index + 1) ? "," : "")}
                            </span>
                        ))}
                    </Typography>
                    <Typography gutterBottom textTransform="capitalize"><b>Base Experience:</b> {selectedPokemonData && selectedPokemonData.base_experience}</Typography>
                    <Typography gutterBottom textTransform="capitalize"><b>Weight:</b> {selectedPokemonData && selectedPokemonData.weight}</Typography>
                    <Typography gutterBottom textTransform="capitalize"><b>Height:</b> {selectedPokemonData && selectedPokemonData.height}</Typography>
                </div>
            </Container>
        </>
    )
}
