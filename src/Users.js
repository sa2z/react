// import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { asyncReducer } from "./asyncReducer";
import useAsync from "./useAsync";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users/"
  );
  return response.data;
}

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

  const [state, refetch] = useAsync(getUsers, [], true);

  const { loading, data: users, error } = state;
  if (loading) return <div>로딩중 ... </div>;
  if (error) return <div>에러발생 ...</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((users) => (
          <li key={users.id}>
            {users.username} ({users.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;
