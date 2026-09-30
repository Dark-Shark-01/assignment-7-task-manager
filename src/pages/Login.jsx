import { ShieldCheck } from "lucide-react";

import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <main className="auth-page">
      <div className="auth-background">
        <div className="auth-orb auth-orb-one" />
        <div className="auth-orb auth-orb-two" />
      </div>

      <section className="auth-card">
        <div className="auth-card-inner">
          <header className="auth-header">
            <div className="brand-mark" aria-hidden="true">
              <ShieldCheck size={22} strokeWidth={2.2} />
            </div>

            <div>
              <span className="brand-name">TaskFlow</span>
              <span className="brand-label">Workspace</span>
            </div>
          </header>

          <div className="auth-heading">
            <span className="auth-eyebrow">SECURE ACCESS</span>

            <h1>Welcome back.</h1>

            <p>
              Sign in to continue managing your tasks and keeping
              your workflow organized.
            </p>
          </div>

          <LoginForm />

          <footer className="auth-footer">
            <span>Assignment 07</span>
            <span className="footer-dot">•</span>
            <span>Authentication System</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default Login;