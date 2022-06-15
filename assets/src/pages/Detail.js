import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

export default function Detail({ route, navigation }) {

    const { name, id } = route.params;
    const [pokemon, setPokemon] = useState(null);


    const FetchPokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPokemon(data);
            })
    }

    useEffect(() => {
        FetchPokemon();
    }
        , []);


    const LoadImg = () => {
        let img;
        try {
            img = require(`../img/pokemon/${id}.png`);
        } catch (e) {
            img = require(`../img/No-Image.png`);
        }
        return img;
    }


    const ShowTypes = () => {

        if (pokemon == null) {
            return <></>
        } else {
            return pokemon.types.map((element, index) => {
                return (
                    <Text key={index}>{element.type.name}</Text>
                )
            })
        }
    }

    return (
        <View>
            <Image
                source={LoadImg()}
                style={{ width: 150, height: 150 }} />
            <Text>{name}</Text>
            {
                ShowTypes()
            }
        </View>
    )
}