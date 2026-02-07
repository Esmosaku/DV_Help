import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { PASSWORD } from "../../App";

export default function Calculator() {
  const [input, setInput] = useState("");
  const navigation = useNavigation<any>();


  const handlePress = (value: string) => {
    
    const lastChar = input.slice(-1);
    if (value === "C") {
      setInput("");
    } else if (value === "DEL") {

      setInput((prev) => prev.slice(0, -1));
      return
    } else if (value === "=") {


        if (input.replace(/\s/g, "") === PASSWORD) {
          setInput("");
          navigation.navigate("HomeScreen");
          return;
        }
      try {
        let expression = input;

        // Balance parentheses
        const openCount = (expression.match(/\(/g) || []).length;
        const closeCount = (expression.match(/\)/g) || []).length;
        if (openCount > closeCount) {
          expression += ")".repeat(openCount - closeCount);
        }
        expression = expression.replace(/(\d+)%/g, "($1/100)");


        const result = eval(expression.replace(/×/g, "*").replace(/÷/g, "/"));
        setInput(result.toString());
      } catch {
        setInput("Error");
      }
      return;
    }
    if ("+-×÷".includes(lastChar) && "+-×÷".includes(value)) return;

    setInput((prev) => prev + value);
  };

  const handleParenthesis = () => {
    const openCount = (input.match(/\(/g) || []).length;
    const closeCount = (input.match(/\)/g) || []).length;

    if (openCount > closeCount && /[0-9)]$/.test(input)) {
      setInput(prev => prev + ")");
    } else {
      
      if (/[0-9)]$/.test(input)) {
        setInput(prev => prev + "×(");
      } else {
        setInput(prev => prev + "(");
      }
    }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.output}>{input || "0"}</Text>
      <View style={styles.rows}>
        <TouchableOpacity
          style={styles.symbolButton}
          onPress={() => handlePress(".")}
        >
          <Text style={styles.number}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.symbolButton}
          onPress={handleParenthesis}
        >
          <Text style={styles.number}>( )</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.symbolButton}
          onPress={() => handlePress("%")}
        >
          <Text style={styles.number}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.symbolButton}
          onPress={() => handlePress("÷")}
        >
          <Feather name="divide" size={35} color="#EDF6F9" />
        </TouchableOpacity>
      </View>

      <View style={styles.rows}>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("1")}
        >
          <Text style={styles.number}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("2")}
        >
          <Text style={styles.number}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("3")}
        >
          <Text style={styles.number}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.symbolButton}
          onPress={() => handlePress("×")}
        >
          <Feather name="x" size={35} color="#EDF6F9" />
        </TouchableOpacity>
      </View>

      <View style={styles.rows}>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("4")}
        >
          <Text style={styles.number}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("5")}
        >
          <Text style={styles.number}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("6")}
        >
          <Text style={styles.number}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.symbolButton}
          onPress={() => handlePress("-")}
        >
          <Feather name="minus" size={35} color="#EDF6F9" />
        </TouchableOpacity>
      </View>
      <View style={styles.rows}>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("7")}
        >
          <Text style={styles.number}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("8")}
        >
          <Text style={styles.number}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("9")}
        >
          <Text style={styles.number}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.symbolButton}
          onPress={() => handlePress("+")}
        >
          <Feather name="plus" size={35} color="#EDF6F9" />
        </TouchableOpacity>
      </View>
      <View style={styles.rows}>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("0")}
        >
          <Text style={styles.number}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handlePress("DEL")}
        >
          <Feather name="delete" size={35} color="#EDF6F9" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.symbolButton, { width: 160 }]}
          onPress={() => handlePress("=")}
        >
          <Text style={styles.number}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2A",
    padding: 15,
    justifyContent: "flex-end",
  },
  number: {
    fontSize: 32,
    color: "#EDF6F9",
  },
  numberButton: {
    backgroundColor: "#999999",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33,
    width: 70,
    height: 70,
  },

  symbolButton: {
    backgroundColor: "#BDADEA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33,
    width: 70,
    height: 70,
  },

  rows: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },

  output: {
    fontSize: 80,
    color: "#EDF6F9",
    textAlign: "right",
    marginBottom: 20,
  },
});
