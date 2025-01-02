import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const sHeight = Dimensions.get('screen').height;
const swidth = Dimensions.get('screen').width;
const Card = ({data}) => {
    function renderDate(){
        const date = new Date(data.timestamp)
        return date.getDate()+"/"+(date.getMonth()+1) + "/"+date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
    }
    return (
        <View style={styles.main}>
            <Text style={styles.content}>{data.text}</Text>
            <View style={styles.divider}></View>
            <Text style={styles.timestamp}>{renderDate()}</Text>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    main:{
        width:swidth*0.8,
        borderWidth: 1,
        borderRadius: 6,
        borderColor:"#6BAEA4",
        padding: swidth*0.03,
        marginVertical: sHeight*0.01
    },
    content:{
        color:"white",
        fontStyle:"italic",
        textAlign:"justify"
    },
    divider:{
        width: swidth*0.8 - 2*swidth*0.03,
        borderTopWidth: 2,
        borderTopColor:"#333",
        marginVertical: sHeight*0.01
    },
    timestamp:{
        fontStyle:"italic",
        color:"#555"
    },
})