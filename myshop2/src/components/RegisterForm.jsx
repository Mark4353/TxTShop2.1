// RegisterForm.jsx
import React, { useState } from 'react';

function RegisterForm({ onRegister, onClose }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.message) {
        setMessage('Регистрация успешна!');
        onRegister && onRegister();
      } else {
        setMessage(data.error || 'Ошибка регистрации');
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
          <h2>Регистрация</h2>
          <input
            placeholder="Имя пользователя"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
          />
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
          <button type="submit">Зарегистрироваться</button>
          <div className="auth-modal-message">{message}</div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;