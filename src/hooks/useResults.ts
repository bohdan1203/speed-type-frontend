import {
  useGetAllResultsQuery,
  useGetUserResultsQuery,
  useGetTextResultsQuery,
  useAddResultMutation,
} from "../features/resultsApiSlice";

function useResults(id?: string) {
  const { data: allResults } = useGetAllResultsQuery(undefined);

  const {
    data: userResults,
    isLoading: resultsLoading,
    isSuccess: resultsSuccess,
    error: resultsError,
  } = useGetUserResultsQuery(id as string, { skip: !id });

  const { data: textResults, refetch: refetchTextResults } =
    useGetTextResultsQuery(id as string, { skip: !id });

  const [addResult] = useAddResultMutation();

  return {
    allResults,
    userResults,
    resultsLoading,
    resultsSuccess,
    resultsError,
    textResults,
    refetchTextResults,
    addResult,
  };
}

export default useResults;
