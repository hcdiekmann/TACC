import { useState } from 'react';

type State = {
  loading: true;
  page?: string;
};

type LoadedState = {
  loading: false;
  page: string;
};

export function useDataState() {
  const [state, setState] = useState<State | LoadedState>({ loading: true });

  const setPage = (page: string) => {
    setState((prevState) => ({
      ...prevState,
      page: page,
      loading: false,
    }));
  };

  return {
    state,
    setPage,
  };
}
