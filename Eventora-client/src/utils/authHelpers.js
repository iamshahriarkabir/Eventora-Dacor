export const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
};

export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
  pattern: {
    // Regex: At least one letter, one number, one special char
    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    message: "Must contain a letter, number, and special character (@$!%*#?&)",
  },
};
