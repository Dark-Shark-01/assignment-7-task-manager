export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      score: 0,
      label: "Enter password",
    };
  }

  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return {
      score,
      label: "Weak",
    };
  }

  if (score <= 4) {
    return {
      score,
      label: "Medium",
    };
  }

  return {
    score,
    label: "Strong",
  };
};