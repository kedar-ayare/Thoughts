import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView, Alert, Keyboard } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react'
import Card from './cards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDateKey, setDataNull } from '../dataSetter';

const sHeight = Dimensions.get('window').height;
const swidth = Dimensions.get('window').width;
const Today = () => {
    const [timestamp, setTimeStamp] = useState(new Date())
    const [height, setHeight] = useState(40); 
    const [text, setText] = useState("");
    const [cards, setCards] = useState([])

    function currTime(){
        const date = new Date();
        const dateStr = date.getDate() + "/" +date.getMonth() + "/" + date.getFullYear() + " - " + date.getHours() +":"+ date.getMinutes()
        return dateStr
    }

    useEffect(() => {
        fetchData()
        setDataNull()
    },[])

    async function setData(){
        if(text != ""){
            const newData = {
                text,
                timestamp: new Date()
            }
            const jsondata = await AsyncStorage.getItem(getDateKey())
            var data = JSON.parse(jsondata);
            if(data == null){
                data = []
            }
            data.push(newData)
            try{
                const jsonData = JSON.stringify(data)
                await AsyncStorage.setItem(getDateKey(),jsonData);
                console.log("success")
                fetchData()
                setText("")
            }catch{
                console.error("Error")
            }
        }else{
            Alert.alert("Enter Text")
        }
    }

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem(getDateKey());
            if (jsonData !== null) {
                const data = JSON.parse(jsonData);
                console.log(data)
            } else {
                console.log("No Data", "No data found in local storage.");
            }
        } catch (error) {
            console.error("Error retrieving data", error);
        }
    };

    async function fetchData(){
        try {
            const jsonData = await AsyncStorage.getItem(getDateKey());
            console.log(getDateKey())
            if (jsonData !== null) {
                var data = JSON.parse(jsonData);
                var tempDate = new Date()
                tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime()
                data = data.filter(entry =>  new Date(entry.timestamp).getTime() >= tempDate)
                setCards(data)

            } else {
                console.log("No Data", "No data found in local storage.");
            }
        } catch (error) {
            console.error("Error retrieving data", error);
        }
        return cards
    }

    function renderCards(){
        const cardstemp = []
        for(let i = 0; i < cards.length; i++){
            cardstemp.push(<Card key={i} data={cards[i]} ></Card>)
        }
        return cardstemp
    }
    return (
        
        <View style={styles.body}>  
            <View style={styles.header}>
                <Text style={styles.headerText}>Thoughts</Text>
            </View>

            

            <ScrollView>
                <View style={{height:sHeight*0.05}}/>
                <View style={styles.form}>
                    <View style={styles.timestamp}>
                        <Text style={styles.timestampText}>{currTime()}</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={[styles.input, { height: Math.max(height, 160) }]}
                            multiline={true}
                            onContentSizeChange={(event) =>
                                setHeight(event.nativeEvent.contentSize.height)
                            }
                            value={text}
                            onChangeText={setText}
                            placeholder="Type something..."
                            returnKeyType="done"
                        />
                    </View>
                    <View style={styles.buttonBox}>
                        <TouchableOpacity style={styles.submitBtn}
                            onPress={() => {
                                setData()
                            }}
                        >
                            <Text style={styles.submitBtnTxt}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider}></View>
                
                <View style={styles.cards}>
                    {
                        renderCards()
                    }
                </View>
                <View style={{height:sHeight*0.1}}/>
            </ScrollView>
            
        </View>
    )
}

export default Today

const styles = StyleSheet.create({
    body:{
        backgroundColor:"#111111",
        height:sHeight *0.92,
    },
    header:{
        backgroundColor:"#111111",
        width:swidth,
        height: sHeight*0.08,
        justifyContent:"center",
        alignItems:"center"
    },
    headerText:{
        color:"#FFFFFF",
        fontSize: 20,
        textAlign:"center",
        fontWeight:"bold"
    },
    form:{
        width:swidth,
        // backgroundColor:"yellow",
        alignItems:"center"
    },
    timestamp:{
        width:swidth*0.8,
        // backgroundColor:"orange"
    },
    timestampText:{
        fontStyle:"italic",
        color:"white"
    },
    inputBox:{
        paddingVertical: sHeight*0.02
    },
    input: {
        backgroundColor: '#111111',
        padding: 10,
        borderColor:"#ECECEC",
        borderWidth:2,
        borderRadius: 10,
        textAlignVertical: 'top', // Ensures text starts from the top
        width: swidth*0.8,
        height: sHeight*0.1,
        padding: swidth*0.03,
        color:"white"
    },
    submitBtn:{
        width: swidth*0.8,
        backgroundColor: "#6BAEA4",
        borderRadius: 6,
        justifyContent:"center",
        paddingVertical: sHeight*0.015,
    },
    submitBtnTxt:{
        textAlign:"center",
        color:"white",
        fontWeight:"bold",
        fontSize: 18
    },
    divider:{
        width: swidth*0.8,
        borderTopWidth: 2,
        borderTopColor:"#222",
        marginLeft: swidth*0.1,
        marginVertical: sHeight*0.03
    },
    cards:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    }

})