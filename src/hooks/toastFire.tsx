import React from 'react';
import { toast, Toaster } from 'react-hot-toast';

interface ToastProps {
  message: string;
  status?: boolean;
}

const toastFire: React.FC<ToastProps> = ({ message, status = true }) => {
  if (status) {
    toast.success(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  } else if (!status) {
    toast.error(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }
  return <Toaster position="bottom-right" />;
};

export default toastFire;
