const initializeDataReader = (apiFunction, args = [], stateSetter) => {
  // keep data in a local variable so we can synchronously request it later
  let data;
  // keep track of progress and errors
  let status = "pending";
  let error;

  // call the api function immediately, starting fetching
  const requestCall = apiFunction(...args)
    .then((responseData) => {
      data = responseData;
      status = "done";
      stateSetter(responseData);
    })
    .catch((e) => {
      error = e;
      status = "error";
    });

  // this is the data reader function that will return the data,
  // or throw if it's not ready or has errored
  return () => {
    if (status === "pending") {
      throw requestCall;
    } else if (status === "error") {
      throw error;
    }

    return data;
  };
};
export default initializeDataReader;
