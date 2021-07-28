import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState(null); // 기본값 null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setUsers(null);
      setError(null);
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/"
      );
      setUsers(response.data);
    } catch (e) {
      console.log(e.response.status);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중 ... </div>;
  if (error) return <div>에러발생 ...</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((users) => (
          <li key={users.id}>
            {users.username} ({users.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
