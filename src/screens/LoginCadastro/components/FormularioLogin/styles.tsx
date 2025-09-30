export const createStyles = (colors: any, isDarkTheme: boolean) => ({
  container: {
    flex: 1,
    justifyContent: "center" as const,
    backgroundColor: colors.containerBg,
  },
  
  loginCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 32,
    width: "100%" as const,
    alignSelf: "center" as const,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isDarkTheme ? 0.3 : 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  
  header: {
    alignItems: "center" as const,
    marginBottom: 40,
  },
  
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold" as const,
    color: colors.primaryText,
    marginBottom: 8,
    textAlign: "center" as const,
  },
  
  subtitleText: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: "center" as const,
    marginBottom: 8,
  },
  
  brandHighlight: {
    color: "#41C526",
    fontWeight: "bold" as const,
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
    color: colors.primaryText,
    marginBottom: 8,
    fontWeight: "600" as const,
  },
  
  inputField: {
    backgroundColor: isDarkTheme ? "#2A2A2A" : "#F5F5F5",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.borderColor,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.primaryText,
    minHeight: 50,
  },
  
  inputFieldFocused: {
    borderColor: "#41C526",
    backgroundColor: isDarkTheme ? "#252525" : "#FFFFFF",
  },
  
  buttonContainer: {
    marginTop: 12,
    marginBottom: 20,
  },
  
  loginButton: {
    backgroundColor: "#41C526",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    shadowColor: "#41C526",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600" as const,
  },
  
  loginButtonDisabled: {
    opacity: 0.6,
  },
  
  errorContainer: {
    backgroundColor: isDarkTheme ? "rgba(255, 68, 68, 0.1)" : "rgba(255, 68, 68, 0.05)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: "rgba(255, 68, 68, 0.3)",
    flexDirection: "row" as const,
  },
  
  errorText: {
    color: "#FF4444",
    fontSize: 14,
    fontWeight: "600" as const,
    textAlign: "center" as const,
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
    fontWeight: "500" as const,
  },

  forgotPasswordContainer: {
    alignItems: "center" as const,
    marginTop: 16,
  },
  
  forgotPasswordText: {
    color: colors.secondaryText,
    fontSize: 14,
  },
  
  forgotPasswordLink: {
    color: "#41C526",
    fontWeight: "600" as const,
  },
  
  loadingContainer: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDarkTheme ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    borderRadius: 12,
  },
  
  footerContainer: {
    alignItems: "center" as const,
    marginTop: 24,
  },
  
  footerText: {
    color: colors.secondaryText,
    fontSize: 14,
  },
  
  footerLink: {
    color: "#41C526",
    fontWeight: "600" as const,
  },
});