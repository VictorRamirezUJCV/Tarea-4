import * as React from 'react';
import { Pressable, Text, StyleSheet } from "react-native";

export default function Card({ onPress, isTurnedOver, children }) {
    return (
        <Pressable onPress={onPress}
             style={isTurnedOver ? Styles.cardUp : Styles.cardDown}>
            {isTurnedOver ? (
                <Text style={Styles.text}>{children}</Text>
            ) : (
                <Text style={Styles.text}>?</Text>
            )}
        </Pressable>
    );
}

const Styles = StyleSheet.create({
    cardUp: {
        width: 100,
        height: 100,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: "#3EDAB4"
    },
    cardDown: {
        width: 100,
        height: 100,
        margin: 10,
        borderColor: "#000000",
        borderWidth: 2, 
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: "#0D3634"
    },
    text: {
        fontSize: 46,
        color: "#0DE50E",
    },
});
