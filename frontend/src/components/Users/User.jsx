
import React from "react";
import { Link } from "react-router-dom";
import styles from './User.module.css'
const custom = {
  margin: "8px",
};

const User = (props) => {

  const user = props.user;
  return (
    <div className="card" style={custom}>
      <div className="card-body ">
        <div className="row ">
          <Link to={`/users/${user.id}`}  className={`card-title  ${styles.title}`}>
            {user.username}
          </Link>
          {/* <div className='card-title col-1' >age: {user.age}</div>  */}
        </div>

        <div className='card-text'> {user.bio}</div>
      </div>
    </div>
  );
};

export default User;
