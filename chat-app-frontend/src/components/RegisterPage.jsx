import { useState } from "react";
import { useNavigate } from "react-router";
import { registerApi } from "../services/AuthService";
import useChatContext from "../context/ChatContext";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { setToken } = useChatContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await registerApi({
        username: username,
        email: email,
        password: password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/join", { replace: true });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/3">
        <h1 className="text-3xl text-white font-bold mb-4">Chat-Room App</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-lg text-white" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="block w-full p-2 mt-2 text-lg text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="text-lg text-white" htmlFor="username">
              Email
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full p-2 mt-2 text-lg text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="text-lg text-white" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full p-2 mt-2 text-lg text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="text-lg text-white" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="block w-full p-2 mt-2 text-lg text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          {error && <p className="text-red-500 text-lg mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Register
          </button>
        </form>
        <p className="text-lg text-white mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
