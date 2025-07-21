import React from 'react';

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="weather-card max-w-md mx-auto text-center">
      <div className="text-6xl mb-4">🌩️</div>
      <h3 className="text-xl font-semibold mb-2 text-destructive">Weather Unavailable</h3>
      <p className="text-muted-foreground mb-4">{error}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="weather-btn"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;