import {useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Registration.css'

const Registration = () => {
      const username = useRef();
      const email = useRef();
      const password = useRef();
      const passwordAgain = useRef();
      const navigate = useNavigate()

    console.log(username.current?.value)

        const handleSubmit = async (e) => {
          e.preventDefault();
          if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
          } else {
              console.log(username.current?.value);
            const user = {
              username: username.current.value,
              email: email.current.value,
              password: password.current.value,
            };
            try {
              await axios.post("/auth/register", user);
              navigate("/login");
            } catch (err) {
              console.log(err);
            }
          }
        };

    
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Chatroom</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Chatroom.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="registerInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="registerInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="registerInput"
              type="password"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button
              type="button"
              className="loginButton"
              onClick={() => navigate("/login")}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration