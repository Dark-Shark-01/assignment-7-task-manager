const getPasswordStrength = (password = "") => {
  if (!password) {
    return {
      score: 0,
      label: "None",
    };
  }

  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }

  if (password.length >= 12) {
    score += 1;
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  if (/\d/.test(password)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  if (score <= 2) {
    return {
      score: 2,
      label: "Weak",
    };
  }

  if (score <= 4) {
    return {
      score: 4,
      label: "Medium",
    };
  }

  if (score === 5) {
    return {
      score: 5,
      label: "Strong",
    };
  }

  return {
    score: 5,
    label: "Very",
  };
};

export { getPasswordStrength };