// import React, { useEffect, useReducer } from "react";
import React, { useState } from "react";
// import axios from "axios";
import { asyncReducer } from "./asyncReducer";
// import useAsync from "./useAsync";
// import { useAsync } from "react-async";
import User from "./User";
import { useUsersDispatch, useUsersState, getUsers } from "./UsersContext";

// async function getUsers() {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/users/"
//   );
//   return response.data;
// }

function Users() {
  // const [state, dispatch] = useReducer(asyncReducer, {
  //   loading: false,
  //   data: null,
  //   error: null
  // });
  // const fetchUsers = async () => {
  //   dispatch({ type: "LOADING" });
  //   try {
  //     const response = await axios.get(
  //       "https://jsonplaceholder.typicode.com/users/"
  //     );
  //     dispatch({ type: "SUCCESS", data: response.data });
  //   } catch (e) {
  //     dispatch({ type: "ERROR", error: e });
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const [state, refetch] = useAsync(getUsers, [], true);
  // const { loading, data: user, error } = state;
  // const { data: users, error, isLoading, reload, run } = useAsync({
  //   // promiseFn: getUsers
  //   deferFn: getUsers
  // });
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const fetchData = () => {
    getUsers(dispatch);
  };
  const { loading, data: users, error } = state.users;
  if (loading) return <div>로딩중 ... </div>;
  if (error) return <div>에러발생 ...</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>; //onClick={reload}

  return (
    <>
      <ul>
        {users.map((users) => (
          <li key={users.id} onClick={() => setUserId(users.id)}>
            {users.username} ({users.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
