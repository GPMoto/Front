import { StyleSheet } from 'react-native';

export const mapaComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    borderRadius: 4,
    padding: 10,
    gap: 2,
    maxWidth: "90%",
    alignSelf: "center",
  },
  
  patioContainer: {
    borderRadius: 8,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    height: 200,
    alignSelf: "center",
  },
  
  flatListContent: {
    gap: 10,
    justifyContent: "center",
  },
  
  flatListColumn: {
    justifyContent: "center",
    gap: 20,
  },
  
  flatListStyle: {
    maxHeight: 180,
  },
  
  sectionsRow: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    gap: 10,
  },
  
  sectionContainer: {
    paddingVertical: 4,
    gap: 2,
  },
  
  sectionText: {
    fontSize: 14,
    color: "black",
  },
  
  consertoArea: {
    borderRadius: 8,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-start",
    height: 100,
    width: 100,
    backgroundColor: "#A44949",
    alignSelf: "center",
    alignItems: "flex-start",
  },
  
  qualidadeArea: {
    borderRadius: 8,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: "#49A44C",
    alignSelf: "center",
    alignItems: "flex-start",
    height: 100,
    width: 170,
  },
  
  bottomSectionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  
  leftSectionsContainer: {
    height: "100%",
    alignItems: "stretch",
  },
  
  administrativoArea: {
    borderRadius: 8,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-start",
    width: 165,
    backgroundColor: "#A4A449",
    alignItems: "flex-start",
    height: 100,
  },
  
  estoqueArea: {
    borderRadius: 8,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-start",
    width: 165,
    backgroundColor: "#5049A4",
    alignItems: "flex-start",
    height: 100,
  },
  
  rightSectionsContainer: {
    alignItems: "flex-start",
    height: "100%",
  },
  
  recepcaoArea: {
    borderRadius: 8,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-start",
    width: 100,
    height: 225,
    backgroundColor: "#A4499E",
    alignItems: "flex-start",
  },
});
