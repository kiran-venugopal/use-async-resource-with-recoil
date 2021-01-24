import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import initializeDataReader from "./utils/initializeDataReader";

export default function useAsyncResourceWithRecoil(
  apiFunction,
  args,
  recoilAtom,
  callOnlyOnFetchAgain = false
) {
  const [state, stateSetter] = useRecoilState(recoilAtom);

  const [dataReader, updateDataReader] = useState(() => {
    if (callOnlyOnFetchAgain) {
      return () => state;
    }
    return initializeDataReader(apiFunction, args, stateSetter);
  });

  const fetchAgain = useCallback(
    (...parameters) => {
      updateDataReader(() =>
        initializeDataReader(apiFunction, parameters, stateSetter)
      );
    },
    [apiFunction]
  );

  const dataReaderModifier = () => {
    try {
      let data = dataReader();
      data = state;
      return data;
    } catch (promise) {
      throw promise;
    }
  };

  return {
    dataReader: dataReaderModifier,
    fetchAgain,
    data: state,
    setData: stateSetter,
  };
}
