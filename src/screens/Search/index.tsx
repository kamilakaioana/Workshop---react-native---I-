import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black", textAlign: "center" }}>Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.backgroundLight,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Search;
