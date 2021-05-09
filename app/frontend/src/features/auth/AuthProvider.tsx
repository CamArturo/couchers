import React, { Context, ReactNode, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { jailRoute, loginRoute } from "../../routes";
import { setUnauthenticatedErrorHandler } from "../../service/client";
import useAuthStore, { AuthStoreType } from "./useAuthStore";

export const AuthContext = React.createContext<null | AuthStoreType>(null);

function useAppContext<T>(context: Context<T | null>) {
  const contextValue = useContext(context);
  if (contextValue === null) {
    throw Error("No context provided!");
  }
  return contextValue;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const store = useAuthStore();

  const push = useHistory().push;

  useEffect(() => {
    setUnauthenticatedErrorHandler(async (e: Error) => {
      // the backend will return "Permission denied" if you're just jailed, and "Unauthorized" otherwise
      if (e.message === "Permission denied") {
        await store.authActions.updateJailStatus();
        push(jailRoute);
      } else {
        // completely logged out
        await store.authActions.logout();
        store.authActions.authError("You were logged out.");
        push(loginRoute);
      }
    });

    return () => {
      setUnauthenticatedErrorHandler(async () => {});
    };
  }, [push, store.authActions]);

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useAppContext(AuthContext);
