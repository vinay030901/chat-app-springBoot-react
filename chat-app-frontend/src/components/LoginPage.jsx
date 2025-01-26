import { useState } from "react";
import { useNavigate } from "react-router";
import { loginApi } from "../services/AuthService";
import useChatContext from "../context/ChatContext";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setToken } = useChatContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginApi({ email: email, password: password });
      const token = response.data.token;
      if (token == null) {
        setError(response.data.message);
      }
      localStorage.setItem("token", token);
      setToken(response.data.token);
      navigate("/join");
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
              Email
            </label>
            <input
              type="text"
              id="email"
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
          {error && <p className="text-red-500 text-lg mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Login
          </button>
        </form>
        <p className="text-lg text-white mt-4">
          Don&apos; have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:text-blue-700"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
