import { createContext, useState } from "react";


export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: any) => {
  const [loading, setloading] = useState<boolean>(true);
  return (
    <AppContext.Provider value={{ loading, setloading }}>
      {children}
    </AppContext.Provider>
  );
};
