import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <Fragment>
      {/* <div className="alert alert-danger">Invalid credentials</div> */}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
// export default Login;
