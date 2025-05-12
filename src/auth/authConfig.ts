// import { LogLevel } from "@azure/msal-browser";

// const tenantName = "littleeinsteinchildcare"; // Removed .onmicrosoft.com as it's added in the authority URL
// // const clientId = `b4905105-35bf-47f5-86df-d6ef5d668a62`
// const clientId = `ffa503d7-c4aa-43cf-a047-8d80e5be4360`;
// const flows = {
//   localAccSignIn: "B2C_1_main_flow", //e.g., B2C_1_main_flow
//   msid: "B2C_1_msid",
// };

// const activeFlow = flows.localAccSignIn;

// export const b2cPolicies = {
//   names: {
//     signUpSignIn: activeFlow,
//   },
//   authorities: {
//     signUpSignIn: {
//       authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${activeFlow}`,
//     },
//   },
//   authorityDomain: `${tenantName}.b2clogin.com`,
//   // Removed the authorityMetadata as it's pointing to regular Microsoft login endpoints
// };
// export const msalConfig = {
//   auth: {
//     clientId: clientId,
//     authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1_main_flow`,
//     // authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
//     knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
//     // authority: "https://login.microsoftonline.com/5bb0b122-8061-4bec-b8d1-2330bcd708c9/",
//     redirectUri: "http://localhost:5173/signin",
//     postLogoutRedirectUri: "http://localhost:5173",
//     navigateToLoginRequestUrl: false,
//   },
//   cache: {
//     cacheLocation: "sessionStorage",
//     storeAuthStateInCookie: false,
//   },
//   system: {
//     loggerOptions: {
//       loggerCallback: (
//         level: LogLevel,
//         message: string,
//         containsPii: boolean,
//       ) => {
//         if (containsPii) {
//           return;
//         }
//         switch (level) {
//           case LogLevel.Error:
//             console.error(message);
//             return;
//           case LogLevel.Info:
//             console.info(message);
//             return;
//           case LogLevel.Verbose:
//             console.debug(message);
//             return;
//           case LogLevel.Warning:
//             console.warn(message);
//             return;
//           default:
//             return;
//         }
//       },
//     },
//   },
// };
// /**
//  * Authentication scopes configuration
//  */

// // Login scopes (used during the initial login flow)
// export const loginRequest = {
//   scopes: ["openid", "profile", "email"],
// };

// // The API scope uses the backend API ID
// export const apiScopes = {
//   scopes: [
//     "https://littleeinsteinchildcare.onmicrosoft.com/bac428ae-b0ba-4b2d-a68e-6cf4762a93b7/.default",
//   ],
// };

// // Combine scopes for scenarios where you need both authentication and API access
// export const allScopes = {
//   scopes: [...loginRequest.scopes, ...apiScopes.scopes],
// };
// // export const loginRequest = {
// //   scopes: [],
// // };
