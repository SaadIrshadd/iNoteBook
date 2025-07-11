import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  
  let location = useLocation();
  let navigate = useNavigate();
 
  const Logout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
    props.ShowAlert("Logged out Successfully", "success")

  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"> iNoteBook </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/" ? "active" : "" }`} aria-current="page" to="/"> Home </Link>
              </li>          
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link> 
              <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link> 
            </form> :
            <button onClick={Logout} className="btn btn-danger">Logout</button>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
