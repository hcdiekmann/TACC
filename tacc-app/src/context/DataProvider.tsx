import { createContext } from 'react';
import { useDataState } from './useDataState';

interface Props {
  children: JSX.Element;
}

type Context = {
  page: string;

  setPage: (page: string) => void;
};

const defaultContext: Context = {
  page: '',
  setPage: () => {},
};

export const DataContext = createContext<Context>(defaultContext);

export const DataProvider = ({ children }: Props) => {
  const { state, setPage } = useDataState();

  const { page = '' } = state;

  return (
    <DataContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
