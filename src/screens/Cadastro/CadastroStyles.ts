import { StyleSheet } from "react-native";

export const cadastroStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0C0C0C",
  },
  
  cadastroCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 32,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#41C526",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  
  subtitleText: {
    fontSize: 16,
    color: "#8B8B8B",
    textAlign: "center",
    marginBottom: 8,
  },
  
  brandHighlight: {
    color: "#41C526",
    fontWeight: "bold",
    fontSize: 18,
  },
  
  inputContainer: {
    marginBottom: 24,
  },
  
  inputWrapper: {
    marginBottom: 20,
  },
  
  inputLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 8,
    fontWeight: "600",
  },
  
  inputField: {
    backgroundColor: "#2A2A2A",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#3A3A3A",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
    minHeight: 50,
  },
  
  inputFieldFocused: {
    borderColor: "#41C526",
    backgroundColor: "#252525",
  },
  
  buttonContainer: {
    marginTop: 12,
    marginBottom: 20,
  },
  
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0C0C0C",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 68, 68, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 68, 68, 0.3)",
    flexDirection: "row",
  },
  errorText: {
    color: "#FF4444",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },

  errorIcon: {
    marginRight: 8,
  },

  fieldErrorText: {
    color: "#FF6B6B",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
    fontWeight: "500",
  },

  pickerWrapper: {
    marginBottom: 20,
  },

  pickerContainer: {
    backgroundColor: "#2A2A2A",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#3A3A3A",
    minHeight: 50,
    justifyContent: "center",
  },

  picker: {
    color: "#FFFFFF",
    fontSize: 16,
    height: 50,
  },

  footerContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  
  footerText: {
    color: "#8B8B8B",
    fontSize: 14,
  },
  
  footerLink: {
    color: "#41C526",
    fontWeight: "600",
  },
});
