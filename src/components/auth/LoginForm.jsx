import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, LogIn, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/useAuth";
import { getPasswordStrength } from "../../utils/passwordStrength";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const strength = getPasswordStrength(password);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const result = login(username, password, remember);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const destination = location.state?.from || "/dashboard";

    navigate(destination, { replace: true });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="username">Username</label>

        <div className="input-wrapper">
          <User size={18} aria-hidden="true" />

          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setError("");
            }}
            placeholder="Enter your username"
            autoComplete="username"
          />
        </div>
      </div>

      <div className="field-group">
        <div className="field-heading">
          <label htmlFor="password">Password</label>
        </div>

        <div className="input-wrapper">
          <LockKeyhole size={18} aria-hidden="true" />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <button
            className="password-toggle"
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {password && (
          <div className="password-strength" aria-live="polite">
            <div className="strength-header">
              <span>Password strength</span>
              <strong>{strength.label}</strong>
            </div>

            <div className="strength-bars">
              {[1, 2, 3, 4, 5].map((level) => (
                <span
                  className={
                    level <= strength.score
                      ? `strength-bar strength-${strength.label.toLowerCase()}`
                      : "strength-bar"
                  }
                  key={level}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <label className="remember-option">
        <input
          type="checkbox"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
        />

        <span className="custom-checkbox" />

        <span>Remember me</span>
      </label>

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <button className="login-submit" type="submit">
        <span>Sign in</span>
        <LogIn size={18} />
      </button>

      <p className="login-hint">
        Demo credentials: <strong>admin</strong> /{" "}
        <strong>Admin@123</strong>
      </p>
    </form>
  );
}

export default LoginForm;