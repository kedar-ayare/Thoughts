import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Today from './today';
import DarkThemeCalendar from './test';
const sHeight = Dimensions.get('window').height;
const swidth = Dimensions.get('window').width;
const Home = () => {
    const [navOpt, setNavOpt] = useState("today")
    return (
        <View style={styles.body}>
            <View style={{height:sHeight*0.92}}>
            {
                (navOpt == "today")?
                    <Today></Today>:<DarkThemeCalendar></DarkThemeCalendar>
            }
            </View>
            
            <View style={styles.bottomNav}>
                <TouchableOpacity style={[styles.bottomNavBtn, (navOpt=="today")? styles.selectedBtn:null]}
                    onPress={() => {
                        setNavOpt("today")
                    }}
                >
                    {
                        (navOpt=="today")?
                        <Image style={styles.bottomNavIcon} source={require("../assets/today-white.png")}></Image>:
                        <Image style={styles.bottomNavIcon} source={require("../assets/today-green.png")}></Image>
                    }
                    
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomNavBtn, (navOpt=="cal")? styles.selectedBtn:null]}
                    onPress={() => {
                        setNavOpt("cal")
                    }}
                >
                    {
                        (navOpt=="cal")?
                        <Image style={styles.bottomNavIcon} source={require("../assets/cal-white.png")}></Image>:
                        <Image style={styles.bottomNavIcon} source={require("../assets/cal-green.png")}></Image>
                    }
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    body:{
        backgroundColor:"#111111",
        // backgroundColor:"red",
        height:sHeight,
        flexDirection:"column", 
        justifyContent:"space-between",
    },
    bottomNav:{
        height: sHeight*0.08, 
        backgroundColor:"#222222",
        flexDirection:"row"
    },
    bottomNavBtn:{
        width: swidth*0.5,
        justifyContent:"center",
        alignItems:"center"
    },
    selectedBtn:{
        backgroundColor:"#6BAEA4"
    },
    bottomNavIcon:{
        height: sHeight*0.03,
        aspectRatio: 1
    }
})