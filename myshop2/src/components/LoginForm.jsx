// LoginForm.jsx
import React, { useState } from 'react';

function LoginForm({ onLogin, onRegisterClick, onClose }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.token) {
        onLogin && onLogin(data.user, data.token);
      } else {
        setMessage(data.error || 'Ошибка входа');
      }
    } catch {
      setMessage('Ошибка сервера');
    }
  };

  return (
    <div className="auth-modal-backdrop">
      <div className="auth-modal-content">
        <button className="auth-modal-close" type="button" onClick={onClose}>×</button>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Вход</h2>
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <input
            placeholder="Пароль"
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          />
          <button type="submit">Войти</button>
          <button type="button" className="auth-modal-switch" onClick={onRegisterClick}>
            Регистрация
          </button>
          <div className="auth-modal-message">{message}</div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
