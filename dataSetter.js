import AsyncStorage from '@react-native-async-storage/async-storage';

export function setDataNull(){
    // AsyncStorage.setItem('user_data',"[]");
    // AsyncStorage.setItem(getDateKey(),"[]");
}

export async function getData(){
    console.log(await AsyncStorage.getItem('user_data'))
}

export async function setSampleData(){
    const jsonData= [
        {
            text: "dfjn",
            timestamp: "2024-12-09T18:30:00.000Z"
        }
    ]
    await AsyncStorage.setItem("user_data_dec_2024",JSON.stringify(jsonData));
}

export function getDateKey(date=new Date()){
    const months = [
        "jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"
    ]
    const key = "user_data_" + months[date.getMonth()] + "_" + date.getFullYear()
    return key
}