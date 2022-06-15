import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';

import Item from '../components/Item';

export default function Home({ navigation }) {

    const [masterPokemonList, setMasterPokemonList] = useState([]);
    const [filterPokemonList, setFilterPokemonList] = useState([]);
    const [search, setSearch] = useState('');

    const FetchPokemon = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
            .then(response => response.json())
            .then(data => {
                setMasterPokemonList([...data.results])
                setFilterPokemonList([...data.results])
            });
    }

    useEffect(() => {
        FetchPokemon();
    }, []);

    const FilterPokemon = (text) => {
        if (text != '') {
            const filteredPokemon = masterPokemonList.filter((elemento) => {
                return elemento.name.indexOf(text) >= 0
            });
            setFilterPokemonList([...filteredPokemon]);
        }else{
            setFilterPokemonList([...masterPokemonList])
        }
    }

    const renderItem = ({ item }) => {
        return <Item name={item.name} id={item.url.split('/')[6]} />
    }


    const itemSeparatorComponent = () => (
        <View style={styles.itemSeparator}></View>
    )
    return (
        <View>
            <View style={styles.search}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Digite o nome do Pokemon..."
                    value={search}
                    onChangeText={(text) => {
                        setSearch(text);
                        FilterPokemon(text);
                    }
                    } />
            </View>
            <FlatList
                data={filterPokemonList}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                ItemSeparatorComponent={itemSeparatorComponent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemSeparator: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 5
    },
    search: {
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10
    },
    searchInput: {
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    }

});