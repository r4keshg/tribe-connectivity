
import React, { useEffect, useState } from 'react';
import AuthDialog from './AuthDialog';

const AuthDialogListener: React.FC = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  useEffect(() => {
    const handleOpenDialog = () => {
      setIsAuthDialogOpen(true);
    };

    // Listen for custom event to open auth dialog
    document.addEventListener('open-auth-dialog', handleOpenDialog);

    return () => {
      document.removeEventListener('open-auth-dialog', handleOpenDialog);
    };
  }, []);

  return (
    <AuthDialog 
      isOpen={isAuthDialogOpen} 
      onClose={() => setIsAuthDialogOpen(false)} 
    />
  );
};

export default AuthDialogListener;
