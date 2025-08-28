import { StyleSheet } from "react-native";

const procurarMotoStyles = StyleSheet.create({
  listArea: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    width: "80%",
    flex: 1,
    backgroundColor: "#C4C4C4",
    borderRadius: 16,
  },
  contentArea: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    height: "100%",
  },
  mainContainer: {
    alignItems: "center",
    gap: 16,
  },
  inputContainer: {
    width: "80%",
  },
  paginationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginVertical: 15,
  },
  pageText: {
    color: "white",
    fontSize: 20,
  },
});

export { procurarMotoStyles };
