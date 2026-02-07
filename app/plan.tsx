import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from "react-native"
import React, {useState} from "react"

export default function PlanScreen(){
    return(
        <View style={styles.container}>
            <Text>My Plan</Text>
            <Text>See details about what makes a successful plan</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "#19233E"}
})