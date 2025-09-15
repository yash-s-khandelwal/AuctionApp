import React, { useState } from 'react';
import './LoginSignup.css';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // Password match check logic
  const check = (pwd, confPwd) => {
    if (!pwd || !confPwd) {
      setPassMessage('');
      setSubmitDisabled(true);
      return;
    }
    if (pwd !== confPwd) {
      setPassMessage('Passwords do not match');
      setSubmitDisabled(true);
    } else {
      setPassMessage('Passwords match');
      setSubmitDisabled(false);
    }
  };

  // Call check on password/confirmPassword change
  React.useEffect(() => {
    check(password, confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitDisabled) return;
    alert('Signup submitted!');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', alignItems: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ gridColumn: '1/3', textAlign: 'center' }}>Sign Up</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
          style={{ minWidth: '180px' }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
          style={{ minWidth: '180px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ minWidth: '180px' }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          style={{ minWidth: '180px' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ minWidth: '180px' }}
          id="studpass"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          style={{ minWidth: '180px' }}
          id="confirmpass"
        />
        <div id="passmessage" style={{ color: passMessage === 'Passwords match' ? 'green' : 'red', fontWeight: 500, minHeight: '1.2em', marginBottom: '0.5em', gridColumn: '1/3', textAlign: 'center' }}>{passMessage}</div>
        <button
          type="submit"
          id="payBtn"
          disabled={submitDisabled}
          style={{
            gridColumn: '1/3',
            marginTop: '0.5em',
            background: submitDisabled ? '#f2f0ef' : '#a81c3a',
            color: submitDisabled ? '#888' : 'f2f0ef',
            cursor: submitDisabled ? 'not-allowed' : 'pointer',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '1.1rem',
            padding: '1em 0'
          }}
        >
          Sign Up
        </button>
        {submitDisabled && (
          <div style={{ gridColumn: '1/3', textAlign: 'center', color: '#a81c3a', fontWeight: 500, marginTop: '0.3em' }}>
            Please make sure passwords match to enable signup.
          </div>
        )}
        <p style={{ gridColumn: '1/3', textAlign: 'center' }}>Already have an account? <a href="/login">Log In</a></p>
      </form>
    </div>
  );
}

export default Signup;
