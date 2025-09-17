
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can log error to an error reporting service here
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 40, textAlign: 'center', color: '#7A1528', fontSize: 24 }}><b>Something went wrong in the app.<br />Please try again later.</b></div>;
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
