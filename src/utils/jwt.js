const SECRET = "assignment-7-taskflow-secret";
const TOKEN_LIFETIME = 60 * 60 * 1000;

const encode = (value) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(value))));

const decode = (value) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(value))));
  } catch {
    return null;
  }
};

const createSignature = (header, payload) =>
  btoa(`${header}.${payload}.${SECRET}`);

export const generateToken = (username) => {
  const header = encode({
    alg: "SIM",
    typ: "JWT",
  });

  const payload = encode({
    username,
    iat: Date.now(),
    exp: Date.now() + TOKEN_LIFETIME,
  });

  const signature = createSignature(header, payload);

  return `${header}.${payload}.${signature}`;
};

export const validateToken = (token) => {
  if (!token) {
    return {
      valid: false,
      reason: "Token not found",
    };
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return {
      valid: false,
      reason: "Invalid token structure",
    };
  }

  const [header, payload, signature] = parts;

  const expectedSignature = createSignature(header, payload);

  if (signature !== expectedSignature) {
    return {
      valid: false,
      reason: "Invalid token signature",
    };
  }

  const decodedPayload = decode(payload);

  if (!decodedPayload) {
    return {
      valid: false,
      reason: "Invalid token payload",
    };
  }

  if (decodedPayload.exp < Date.now()) {
    return {
      valid: false,
      reason: "Token expired",
    };
  }

  return {
    valid: true,
    payload: decodedPayload,
  };
};