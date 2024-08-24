"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

type DataType = {
  firstName: string;
};
interface ProviderProps {
  children: ReactNode;
}
interface ContextProps {
  llmToggle: boolean;
  setLLM: Dispatch<SetStateAction<boolean>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }: ProviderProps) => {
  const [llmToggle, setLLM] = useState(false); // Update initial state value to false
  // const [data, setData] = useState<[] | DataType[]>([]);

  return (
    <GlobalContext.Provider value={{ llmToggle, setLLM }}>
      {children}
    </GlobalContext.Provider>
  );
};

// export const useGlobalContext = () => useContext(GlobalContext);
