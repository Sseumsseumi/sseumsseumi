import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { userAtom, authLoadingAtom } from "../store/authAtom";
import { getUserInfo } from "../api/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(authLoadingAtom);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserInfo();

        setUser({
          userLoginId: user.userLoginId,
          userName: user.userName,
        });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setLoading]);

  return <>{children}</>;
};

export default AuthProvider;