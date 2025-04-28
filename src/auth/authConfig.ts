import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "b4905105-35bf-47f5-86df-d6ef5d668a62",
    authority:
      "https://login.microsoftonline.com/5bb0b122-8061-4bec-b8d1-2330bcd708c9/",
    redirectUri: "http://localhost:5173",
    postLogoutRedirectUri: "http://localhost:5173",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean,
      ) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [],
};
