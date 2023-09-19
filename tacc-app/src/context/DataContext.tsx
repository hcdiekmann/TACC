import { createContext } from 'react';
import { useState } from 'react';

type State = {
  loading: true;
  page?: string;
};

type LoadedState = {
  loading: false;
  page: string;
};

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

function useDataState() {
  const [state, setState] = useState<State | LoadedState>({ loading: true });

  const setPage = (page: string) => {
    setState(() => ({
      page: page,
      loading: false,
    }));
  };

  return {
    state,
    setPage,
  };
}

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
