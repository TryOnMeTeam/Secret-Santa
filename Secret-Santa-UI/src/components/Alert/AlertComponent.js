import React from 'react';
import { useAlert } from '../../services/context/AlertContext';

const AlertComponent = () => {
  const { alert } = useAlert();

  if (!alert) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        backgroundColor: alert.type === 'success' ? 'green' : 'red',
        color: 'white',
        borderRadius: '5px',
        fontWeight: 'bold',
        zIndex: '1000',
      }}
    >
      {alert.message}
    </div>
  );
};

export default AlertComponent;
