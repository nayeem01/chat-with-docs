'use client'

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react'

type DataType = {
  firstName: string
}

interface ContextProps {
  llmToggle: boolean
  setLLM: Dispatch<SetStateAction<boolean>>
  data: DataType[]
  setData: Dispatch<SetStateAction<DataType[]>>
}

const GlobalContext = createContext<ContextProps>({
  llmToggle: false,
  setLLM: (): boolean => false,
  data: [],
  setData: (): DataType[] => [],
})

export const GlobalContextProvider = ({ children }) => {
  const [llmToggle, setLLM] = useState(false) // Update initial state value to false
  const [data, setData] = useState<[] | DataType[]>([])

  return (
    <GlobalContext.Provider value={{ llmToggle, setLLM, data, setData }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
