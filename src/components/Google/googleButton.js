// MyGoogleButton.tsx
import React from 'react';

const GoogleButton = ({onClick}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        gap: '10px',
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        style={{ width: 18, height: 18 }}
      />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
