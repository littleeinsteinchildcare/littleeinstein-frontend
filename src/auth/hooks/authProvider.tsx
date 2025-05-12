// import {
//   PublicClientApplication,
//   EventType,
//   AuthenticationResult,
// } from "@azure/msal-browser";
// import { msalConfig } from "../authConfig";
// import { ReactNode } from "react";
// import { MsalProvider } from "@azure/msal-react";

// interface AuthProviderProps {
//   children: ReactNode;
// }
// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const msalInstance = new PublicClientApplication(msalConfig);

//   if (
//     !msalInstance.getActiveAccount() &&
//     msalInstance.getAllAccounts().length > 0
//   ) {
//     msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
//   }

//   msalInstance.addEventCallback((event) => {
//     const authenticationResult = event.payload as AuthenticationResult;
//     const account = authenticationResult?.account;
//     if (event.eventType === EventType.LOGIN_SUCCESS && account) {
//       msalInstance.setActiveAccount(account);
//     }
//   });
//   return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
// };

// export function useAuthProvider() {
//   return { AuthProvider };
// }

// AuthProvider.tsx
// import {
//   PublicClientApplication,
//   EventType,
//   AuthenticationResult,
// } from "@azure/msal-browser";
// import { msalConfig } from "../authConfig";
// import { ReactNode, useEffect } from "react";
// import { MsalProvider } from "@azure/msal-react";

// // 1. Create msalInstance OUTSIDE component
// const msalInstance = new PublicClientApplication(msalConfig);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   useEffect(() => {
//     // 2. Setup event listener ONCE
//     const callbackId = msalInstance.addEventCallback((event) => {
//       if (event.eventType === EventType.LOGIN_SUCCESS) {
//         const authenticationResult = event.payload as AuthenticationResult;
//         const account = authenticationResult?.account;
//         if (account) {
//           msalInstance.setActiveAccount(account);
//         }
//       }
//     });

//     // Optional: Clean up the callback when component unmounts
//     return () => {
//       if (callbackId) {
//         msalInstance.removeEventCallback(callbackId);
//       }
//     };
//   }, []);

//   // 3. Set active account if not already
//   useEffect(() => {
//     if (
//       !msalInstance.getActiveAccount() &&
//       msalInstance.getAllAccounts().length > 0
//     ) {
//       msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
//     }
//   }, []);

//   return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
// };
