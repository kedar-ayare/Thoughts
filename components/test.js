import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Card from './cards';
import { getDateKey, setSampleData } from '../dataSetter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sHeight = Dimensions.get('window').height;
const swidth = Dimensions.get('window').width;

const DarkThemeCalendar = () => {
    const month_names = [
        "jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"
    ]

    const [selectedDate, setSelectedDate] = useState({
        dateString: "",
        date: -1,
    });

    const [dotDates, setDotDates] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const [currMonthYear, setCurrMonthYear] = useState({
        "month": new Date().getMonth(),
        "year": new Date().getFullYear()
    })

    const [data, setData] = useState(null)

    useEffect(() => {
        fetchData()
    },[currMonthYear])

    async function fetchData(){
        var data = await AsyncStorage.getItem(getDateKey(new Date(currMonthYear.year, currMonthYear.month, 1)))
        if(data != null){

            data = JSON.parse(data)
            var dates = []
            for(var i = 0; i<data.length;i++){
                const tempdate = new Date(data[i].timestamp)
                dates.push(tempdate.getFullYear()+"-"+(tempdate.getMonth()+1)+"-"+tempdate.getDate())
            }
            const uniqueDates = [...new Set(dates)] 
            var eventDates = {}
            for(var i =0; i<uniqueDates.length; i++){
                eventDates[uniqueDates[i]] ={
                    dots: [{ key: 'data', color: 'red' }],
                }
            }
            // console.log(eventDates)
            setDotDates(eventDates)
            setData(data)
        }else{
            setData(null)
        }
    }


    // Example data for marking dots (dates with events)
    const eventDates = {
        '2024-12-31': { // New Year's Eve
        selected: true,
        selectedColor: '#1e90ff', // Dodger blue
        dots: [
            { key: 'celebration', color: 'purple' },
        ],
    },
    '2025-01-01': { // New Year's Day
        selected: true,
        selectedColor: '#00bfff', // Deep sky blue
        dots: [
            { key: 'newYear', color: 'red' },
        ],
    },
    };


    const entryDot = {
        '2024-12-31': { // New Year's Eve
                        selected: true,
                        selectedColor: '#1e90ff', // Dodger blue
                        dots: [
                            { key: 'celebration', color: 'purple' },
                        ],
                    },
                    '2025-01-01': { // New Year's Day
                        selected: true,
                        selectedColor: '#00bfff', // Deep sky blue
                        dots: [
                            { key: 'newYear', color: 'red' },
                        ],
                    },};

    function renderCards(){
        if(selectedDate.dateString !== ''){
            if(data != null){
                var cards = []
                for(var i = 0; i<data.length;i++){
                    if(new Date(data[i].timestamp).getDate() == selectedDate.date){
                        cards.push(<Card key={i} data={data[i]} />)
                    }
                    
                }
                return cards
            }else{
                return <View>
                    <Text style={{color:"#666", fontStyle:'italic', fontSize:16}}>No Data!!</Text>
                </View>
            }
            
        }else{
            return <View>
                <Text style={{color:"#666", fontStyle:'italic', fontSize:16}}>Select a date!!</Text>
            </View>
        }
        
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Thoughts {selectedDate.dateString}</Text>
            </View>
            <Calendar
                maxDate={today}

                onDayPress={(day) => {
                    if(day.dateString != selectedDate.dateString){
                        setSelectedDate({
                            dateString: day.dateString,
                            date: day.day
                        });
                    }else{
                        setSelectedDate({
                            dateString: "",
                            date: -1,
                        })
                    }
                    
                }}

                onMonthChange={(month) => {
                    console.log("Month changed", month)
                    setCurrMonthYear({
                        "month": month.month-1,
                        "year": month.year
                    })
                }}

                markingType={'multi-dot'}
                markedDates={{
                    ...dotDates,
                    [selectedDate.dateString]: {
                        selected: true,
                        selectedColor: '#1e90ff',
                    },
                }}
                // Set a dark theme
                theme={{
                    backgroundColor: '#000000',
                    calendarBackground: '#121212',
                    textSectionTitleColor: '#ffffff',
                    selectedDayBackgroundColor: '#1e90ff',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#1e90ff',
                    dayTextColor: '#d9d9d9',
                    textDisabledColor: '#555555',
                    dotColor: '#1e90ff',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#ffffff',
                    monthTextColor: '#ffffff',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 14,
                }}
            />
            <View style={styles.divider}></View>
            <View style={styles.cardsContainer}>
                {
                    renderCards()
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#111111', // Dark background
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 16,
        height: sHeight
    },
        selectedDate: {
        marginTop: 16,
        color: '#ffffff',
        fontSize: 16,
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
    divider:{
        width: swidth*0.8,
        borderTopWidth: 2,
        borderTopColor:"#222",
        marginLeft: swidth*0.1,
        marginVertical: sHeight*0.03
    },
    cardsContainer:{
        justifyContent:"center",
        alignItems:"center"
    }
});

export default DarkThemeCalendar;
