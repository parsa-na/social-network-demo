import React, { useState, useEffect } from "react";

import axios from "axios";
import User from "./User";

const Users = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const get = async () => {
      axios.get("http://localhost:8000/users").then((response) => {
        setUsers(response.data);
      });
    };
    get();
  }, []);

  return (
    <div className="container">
      {users.map((user) => 
      
          <User key={user.id} user={user} />
      )}
    
    </div>
  );
};

export default Users;
