import { createContext, useContext, useState, ReactNode } from "react";

type AppContext = {
  showInfoMenu: boolean;
  setShowInfoMenu: (b: boolean) => void;
};

type AppProviderProps = {
  children: ReactNode;
};

const AppContext = createContext({} as AppContext);

export function useApp() {
  const { showInfoMenu, setShowInfoMenu } = useContext(AppContext);
  return {
    showInfoMenu,
    setShowInfoMenu,
  };
}

export function AppProvider({ children }: AppProviderProps) {
  const [showInfoMenu, setShowInfoMenu] = useState(false);

  return (
    <AppContext.Provider value={{ showInfoMenu, setShowInfoMenu }}>
      {children}
    </AppContext.Provider>
  );
}
