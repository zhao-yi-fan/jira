import { useSearchParams } from 'react-router-dom';

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    keys.reduce((pre, key) => {
      return { ...pre, [key]: searchParams.get(key) || '' };
    }, {} as { [key in K]: string }),
    setSearchParams,
  ] as const;
};
