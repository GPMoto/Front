import { StyleSheet } from "react-native";

const procurarMotoStyles = StyleSheet.create({
  listArea: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    width: "100%",
    flex: 1,
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  contentArea: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    height: "100%",
    marginTop: 16,
  },
  mainContainer: {
    alignItems: "center",
    gap: 0,
    paddingTop: 10,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  textInput: {
    fontSize: 16,
    color: "#000",
    backgroundColor: "white",
    borderColor: "#41C526",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 50, // Espaço para o botão
    height: 48, // Altura fixa para consistência
    textAlignVertical: 'center', // Centraliza o texto verticalmente
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -10, // Metade da altura do ícone para centralizar
    paddingHorizontal: 5,
  },
  paginationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginTop: 16,
  },
  pageText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  totalMotosContainer: {
    backgroundColor: "#41C526",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#41C526",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  emptyStateContainer: {
    padding: 40,
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#41C526",
    borderStyle: "dashed",
  },
});

export { procurarMotoStyles };
