import React from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import styles from '../styles/Error.module.css';

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;
  let errorStatus: number | undefined;
  let errorStatusText: string | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText || 'Route error occurred';
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error('Unknown error:', error);
    errorMessage = 'An unexpected error occurred';
  }

  const handleGoHome = (): void => {
    navigate('/');
  };

  const handleGoBack = (): void => {
    navigate(-1);
  };

  const handleRefresh = (): void => {
    window.location.reload();
  };

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>⚠</div>
        
        <h1 className={styles.errorTitle}>Something went wrong</h1>
        
        {errorStatus && (
          <div className={styles.errorStatus}>
            <span className={styles.statusLabel}>Status:</span>
            <span className={styles.statusValue}>{errorStatus} {errorStatusText}</span>
          </div>
        )}
        
        <div className={styles.errorMessage}>
          <span className={styles.messageLabel}>Error:</span>
          <span className={styles.messageText}>{errorMessage}</span>
        </div>
        
        <div className={styles.actionButtons}>
          <button 
            onClick={handleGoHome}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            Go to Home
          </button>
          
          <button 
            onClick={handleGoBack}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Go Back
          </button>
          
          <button 
            onClick={handleRefresh}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Refresh Page
          </button>
        </div>
        
        <p className={styles.supportText}>
          If this error persists, please try refreshing the page or contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundary;
