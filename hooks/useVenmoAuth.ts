import { useState, useEffect } from 'react';

interface VenmoUser {
  username: string;
  token?: string;
  isConnected: boolean;
}

export function useVenmoAuth() {
  const [venmoUser, setVenmoUser] = useState<VenmoUser>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('venmoUser');
      return savedUser ? JSON.parse(savedUser) : { username: '', isConnected: false };
    }
    return { username: '', isConnected: false };
  });

  useEffect(() => {
    if (venmoUser.isConnected) {
      localStorage.setItem('venmoUser', JSON.stringify(venmoUser));
    }
  }, [venmoUser]);

  const connectVenmo = () => {
    const username = prompt('Enter your Venmo username (without @):');
    
    if (username) {
      setVenmoUser({
        username,
        isConnected: true,
        token: `mock_token_${Date.now()}`
      });
      return true;
    }
    return false;
  };

  const disconnectVenmo = () => {
    setVenmoUser({ username: '', isConnected: false });
    localStorage.removeItem('venmoUser');
  };

  return {
    venmoUser,
    connectVenmo,
    disconnectVenmo
  };
}
