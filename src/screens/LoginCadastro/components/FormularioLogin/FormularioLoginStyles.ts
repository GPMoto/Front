import { StyleSheet } from "react-native";

export const formularioLoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0C0C0C",
  },
  
  loginCard: {
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
  
  loginButton: {
    backgroundColor: "#41C526",
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#41C526",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  
  loginButtonPressed: {
    backgroundColor: "#369320",
    transform: [{ scale: 0.98 }],
  },
  
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  
  forgotPasswordText: {
    color: "#8B8B8B",
    fontSize: 14,
  },
  
  forgotPasswordLink: {
    color: "#41C526",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#3A3A3A",
  },
  
  dividerText: {
    color: "#8B8B8B",
    paddingHorizontal: 16,
    fontSize: 14,
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
  
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
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

  fieldErrorText: {
    color: "#FF6B6B",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
    fontWeight: "500",
  },

  errorIcon: {
    marginRight: 8,
  },
});
