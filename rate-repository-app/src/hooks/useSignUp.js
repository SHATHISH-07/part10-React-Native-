import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "./useSignIn";

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    try {
      const { data } = await createUser({
        variables: {
          user: { username, password },
        },
      });

      if (data?.createUser) {
        await signIn({ username, password });
      }

      return data?.createUser;
    } catch (error) {
      console.error("User creation or auto-login failed:", error);
      throw error;
    }
  };

  return [signUp, result];
};

export default useSignUp;
