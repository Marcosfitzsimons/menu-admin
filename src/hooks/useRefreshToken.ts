import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  // we call this function when our initial request fails
  // when our access token is expired
  const refresh = async () => {
    const response = await axios.get("auth/refresh", {
      withCredentials: true,
    });
    setAuth({
        user: {
          _id: response.data?.user?._id,
          isAdmin: response.data?.user?.isAdmin,
        },
        token: response.data?.token,
    });
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;