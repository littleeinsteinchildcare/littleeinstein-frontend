// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "@/firebase";
// import {
//   GoogleAuthProvider,
//   OAuthProvider,
//   sendSignInLinkToEmail,
//   onAuthStateChanged,
//   AuthProvider,
// } from "firebase/auth";
// import { signInWithProvider } from "@/auth/signInWithProvider";
// import { signInWithEmail } from "@/auth/signInWithEmail";

// const SignInPage = () => {

//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       const emailLinkUsed = window.localStorage.getItem("emailForSignIn");

//       if (user && emailLinkUsed) {
//         window.localStorage.removeItem("emailForSignIn");
//         navigate("/profile");
//       }
//     });

//     return unsubscribe;
//   }, [navigate]);

//   const handleEmailPasswordSignIn = async () => {
//   try {
//     await signInWithEmail(email, password);
//     navigate("/profile");
//   } catch (error) {
//     alert("Sign-in failed: " + (error as Error).message);
//   }
// };

//   const handleSignInPopup = async (provider: AuthProvider) => {
//     try {
//       const data = await signInWithProvider(provider);
//       console.log("this is the back end data: ", data);
//       navigate("/profile");
//     } catch (error) {
//       console.error("Sign-in failed:", error);
//     }
//   };

//   const handleEmailLinkSignIn = async () => {
//     if (!email) {
//       alert("Please enter your email before continuing.");
//       return;
//     }

//     const actionCodeSettings = {
//       url: "http://localhost:5173/finishSignIn",
//       handleCodeInApp: true,
//     };

//     try {
//       await sendSignInLinkToEmail(auth, email, actionCodeSettings);
//       window.localStorage.setItem("emailForSignIn", email);
//       alert("Email link sent! Please check your inbox.");
//     } catch (error) {
//       console.error("Failed to send email link:", error);
//     }
//   };

//   //   return (
//   //   <div className="h-screen flex justify-center items-center bg-[#FFFBCF] px-4">
//   //     <div className="bg-[#94EE8F] shadow-2xl rounded-2xl p-10 w-full max-w-sm text-center space-y-6">
//   //       {/* Logo */}
//   //       <div className="flex justify-center">
//   //         <img
//   //           src="/logo.svg" // replace with your actual logo path
//   //           alt="Logo"
//   //           className="h-16 w-16"
//   //         />
//   //       </div>

//   //       <h1 className="text-3xl font-bold text-black">Welcome Back</h1>
//   //       <p className="text-sm text-black">Sign in to continue to your dashboard</p>

//   //       {/* OAuth Buttons */}
//   //       <div className="space-y-3">
//   //         <button
//   //           onClick={() => handleSignInPopup(new OAuthProvider("microsoft.com"))}
//   //           className="bg-white text-black w-full py-2 rounded-xl shadow hover:bg-gray-100 transition"
//   //         >
//   //           Sign in with Microsoft
//   //         </button>

//   //         <button
//   //           onClick={() => handleSignInPopup(new GoogleAuthProvider())}
//   //           className="bg-white text-black w-full py-2 rounded-xl shadow hover:bg-gray-100 transition"
//   //         >
//   //           Sign in with Google
//   //         </button>
//   //       </div>

//   //       {/* Email Sign-In */}
//   //       <div className="pt-6 border-t border-green-200">
//   //         <p className="text-sm text-black mb-2">Or sign in via email</p>
//   //         <input
//   //           type="email"
//   //           placeholder="you@example.com"
//   //           className="w-full mb-3 p-2 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-green-400"
//   //           value={email}
//   //           onChange={(e) => setEmail(e.target.value)}
//   //         />
//   //         <button
//   //           onClick={handleEmailLinkSignIn}
//   //           className="bg-green-300 text-black w-full py-2 rounded-xl shadow hover:bg-green-200 transition"
//   //         >
//   //           Send Email Link
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   return (
//     <div className="h-screen flex justify-center items-center bg-[#FFFBCF] px-4">
//       <div className="bg-[#94EE8F] shadow-2xl rounded-2xl p-10 w-full max-w-sm text-center space-y-6">
//         {/* Logo */}
//         {/* <div className="flex justify-center">
//         <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
//       </div> */}

//         <h1 className="text-3xl font-bold text-black">Welcome Back</h1>
//         <p className="text-sm text-black">
//           Sign in to continue to your dashboard
//         </p>

//         {/* Email + Password Form */}
//         <div className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             // className="w-full p-2 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-green-400"
//             className="w-full p-2 rounded-xl bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-green-400"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 rounded-xl bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-green-400"
//             value = {password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             className="bg-green-300 text-black w-full py-2 rounded-xl shadow hover:bg-green-200 transition"
//             onClick={handleEmailPasswordSignIn}
//           >
//             Sign in
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-green-200 pt-4">
//           <p className="text-sm text-black mb-3">Other sign-in options</p>

//           <div className="space-y-3">
//             <button
//               onClick={() =>
//                 handleSignInPopup(new OAuthProvider("microsoft.com"))
//               }
//               className="bg-white text-black w-full py-2 rounded-xl shadow hover:bg-gray-100 transition"
//             >
//               Sign in with Microsoft
//             </button>

//             <button
//               onClick={() => handleSignInPopup(new GoogleAuthProvider())}
//               className="bg-white text-black w-full py-2 rounded-xl shadow hover:bg-gray-100 transition"
//             >
//               Sign in with Google
//             </button>

//             <button
//               onClick={handleEmailLinkSignIn}
//               className="bg-green-200 text-black w-full py-2 rounded-xl shadow hover:bg-green-100 transition"
//             >
//               Send Email Link
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
