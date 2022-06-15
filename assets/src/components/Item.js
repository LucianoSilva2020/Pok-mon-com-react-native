import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Item(props) {

    const navigation = useNavigation();

    const LoadImg = () => {
        let img;
        try{
            img = require(`../img/pokemon/${props.id}.png`);
        }catch(e){
            img = require(`../img/No-Image.png`);
        }
        return img;
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { name: props.name, id: props.id })}  >
            <View style={styles.item}>
                <Image
                    source={LoadImg()}
                    style={{ width: 150, height: 150 }} />
                <Text style={styles.itemText}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems:'baseline'
    },
    itemText: {
        fontSize: 42,
        fontWeight: 700
    }
});