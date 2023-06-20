import { useSelector } from "react-redux";

import { useGetAllUsersQuery, selectAllUsers } from "../features/usersApiSlice";

function useUsers() {
  const {
    isLoading: usersLoading,
    isSuccess: usersSuccess,
    error: usersError,
  } = useGetAllUsersQuery(undefined);

  const users = useSelector(selectAllUsers);

  return { users, usersLoading, usersSuccess, usersError };
}

export default useUsers;
