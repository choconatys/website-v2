import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid_v4 } from 'uuid';
import AlertContainer from '../components/alertContainer';

export interface AlertMessage {
  id: string;
  severity: 'success' | 'error' | 'info';
  message: string;
}

interface AlertContextData {
  addAlert(message: Omit<AlertMessage, 'id'>): void;
  removeAlert(id: string): void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

const AlertProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const addAlert = useCallback(
    ({ severity, message }: Omit<AlertMessage, 'id'>) => {
      const id = uuid_v4();

      const Alert = {
        id,
        severity,
        message,
      };

      setAlerts(state => [...state, Alert]);
    },
    [],
  );

  const removeAlert = useCallback((id: string) => {
    setAlerts(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <AlertContainer alerts={alerts} />
    </AlertContext.Provider>
  );
};

function useAlert(): AlertContextData {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within a AlertProvider!');
  }

  return context;
}

export { AlertProvider, useAlert };

