import { useState, useEffect } from "react";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { apiScopes } from "@/auth/authConfig";

// API base URL - matching the provided example
const API_BASE_URL = "http://localhost:8080";

const DocsPage = () => {
  const { instance, accounts } = useMsal();
  const [apiEndpoint, setApiEndpoint] = useState("auth/azure-b2c");
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenVerificationStatus, setTokenVerificationStatus] =
    useState<any>(null);
  const [accountDetails, setAccountDetails] = useState<any>(null);
  const [requestMethod, setRequestMethod] = useState<string>("GET");
  const [requestBody, setRequestBody] = useState<string>(
    '{\n  "key": "value"\n}',
  );
  const [hasAttemptedRequest, setHasAttemptedRequest] = useState(false);

  useEffect(() => {
    if (accounts.length > 0) {
      setAccountDetails(accounts[0]);
    }
  }, [accounts]);

  // Function to get an access token for the API
  async function getAccessTokenForApi() {
    if (accounts.length === 0) {
      console.error("No authenticated user");
      return null;
    }

    console.log("Using account:", accounts[0].username);
    console.log("Account home_account_id:", accounts[0].homeAccountId);

    const request = {
      scopes: apiScopes.scopes,
      account: accounts[0],
    };

    console.log(
      "Requesting token with scopes:",
      JSON.stringify(apiScopes.scopes),
    );

    try {
      console.log("Attempting silent token acquisition...");
      const response = await instance.acquireTokenSilent(request);

      if (!response || !response.accessToken) {
        console.error(
          "Token response returned but no accessToken property:",
          response,
        );
        return null;
      }

      console.log("Access token acquired successfully");
      return response.accessToken;
    } catch (error) {
      console.error("Silent token acquisition failed:", error);

      if (error instanceof InteractionRequiredAuthError) {
        console.log("Interactive acquisition required, showing popup...");
        try {
          const response = await instance.acquireTokenPopup(request);

          if (!response || !response.accessToken) {
            console.error(
              "Interactive response returned but no accessToken property:",
              response,
            );
            return null;
          }

          console.log("Access token acquired via popup");
          return response.accessToken;
        } catch (err) {
          console.error("Interactive token acquisition failed:", err);
          return null;
        }
      }
      return null;
    }
  }

  // Function to call the API with authentication
  async function callSecureApi() {
    setApiError(null);
    setTokenVerificationStatus(null);
    setApiResponse(null);
    setIsLoading(true);
    setHasAttemptedRequest(true);

    try {
      const token = await getAccessTokenForApi();

      if (!token) {
        throw new Error("Failed to acquire access token");
      }

      // Extract object ID from the current account
      const objectId = accounts[0]?.idTokenClaims?.sub || "";

      const options: RequestInit = {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-User-ObjectId": objectId,
        },
      };

      // Add body for POST, PUT, PATCH requests
      if (["POST", "PUT", "PATCH"].includes(requestMethod)) {
        try {
          // Validate JSON
          const jsonBody = JSON.parse(requestBody);
          options.body = JSON.stringify(jsonBody);
        } catch (e) {
          throw new Error("Invalid JSON in request body");
        }
      }

      console.log(
        `Making ${requestMethod} request to ${API_BASE_URL}/${apiEndpoint}`,
      );

      const response = await fetch(`${API_BASE_URL}/${apiEndpoint}`, options);
      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response
          .text()
          .catch((e) => "Could not read error response");
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      setTokenVerificationStatus({
        success: true,
        message: "Request successful",
        details: result,
      });

      setApiResponse(result);
      setIsLoading(false);
    } catch (error) {
      console.error("API request failed:", error);
      setApiError(error.message);

      setTokenVerificationStatus({
        success: false,
        message: "Request failed",
        error: error.message,
      });

      setIsLoading(false);
    }
  }

  function handleLogout() {
    instance.logoutPopup().catch((error) => {
      console.error("Logout failed: ", error);
    });
  }

  function handleLogin() {
    instance
      .loginPopup()
      .then((response) => {
        console.log("Login response:", JSON.stringify(response, null, 2));
        instance.setActiveAccount(response.account);
      })
      .catch((e) => {
        console.log("Login error:", e);
      });
  }

  // Clear all state when changing request method
  function handleMethodChange(newMethod: string) {
    setRequestMethod(newMethod);
    if (hasAttemptedRequest) {
      setTokenVerificationStatus(null);
      setApiResponse(null);
      setApiError(null);
      setHasAttemptedRequest(false);
    }
  }

  // Reset the form and clear results
  function handleReset() {
    setTokenVerificationStatus(null);
    setApiResponse(null);
    setApiError(null);
    setHasAttemptedRequest(false);
  }

  // Get the object ID from the account details
  const objectId = accountDetails?.idTokenClaims?.sub || "Not available";

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          API Documentation
        </h1>

        <AuthenticatedTemplate>
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold">You're logged in!</h3>
            {accountDetails && accountDetails.idTokenClaims && (
              <div className="mt-2">
                <p>
                  Name: {accountDetails.idTokenClaims.name || "Unknown Name"}
                </p>
                <p>
                  Email:{" "}
                  {accountDetails.idTokenClaims.emails
                    ? accountDetails.idTokenClaims.emails[0]
                    : accountDetails.idTokenClaims.email || "Unknown Email"}
                </p>
                <p className="font-medium">
                  Object ID:{" "}
                  <span className="font-mono text-blue-600">{objectId}</span>
                </p>
              </div>
            )}
          </div>

          {/* API Request Reference Section */}
          <div className="mb-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              API Request Format Reference
            </h2>
            <div className="text-sm font-mono bg-gray-200 p-3 rounded">
              <p className="mb-1"># Required Headers Format</p>
              <p className="mb-1">Authorization: Bearer eyJ0eXAiOi...token</p>
              <p className="mb-1">Content-Type: application/json</p>
              <p className="mb-1">X-User-ObjectId: {objectId}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Test API Connection
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                API Endpoint (appended to {API_BASE_URL}/)
              </label>
              <div className="flex items-center">
                <span className="bg-gray-200 px-3 py-2 rounded-l-md text-gray-700">
                  {API_BASE_URL}/
                </span>
                <input
                  type="text"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-r-md"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Request Method</label>
              <select
                value={requestMethod}
                onChange={(e) => handleMethodChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            {["POST", "PUT", "PATCH"].includes(requestMethod) && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Request Body (JSON)
                </label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded font-mono text-sm"
                />
              </div>
            )}

            <div className="text-center space-x-2">
              <button
                onClick={callSecureApi}
                disabled={isLoading}
                className={`px-6 py-2 rounded ${
                  isLoading
                    ? "bg-yellow-500"
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-semibold`}
              >
                {isLoading ? "Sending Request..." : "Send API Request"}
              </button>

              {hasAttemptedRequest && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Display API errors if any */}
          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <h3 className="font-bold text-center">API Error:</h3>
              <p className="text-center">{apiError}</p>
            </div>
          )}

          {/* Display token verification status if available */}
          {tokenVerificationStatus && (
            <div
              className={`mb-6 p-4 border rounded ${
                tokenVerificationStatus.success
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              }`}
            >
              <h3 className="font-bold text-center">
                {tokenVerificationStatus.success
                  ? "Request Successful"
                  : "Request Failed"}
              </h3>
              <p className="text-center">{tokenVerificationStatus.message}</p>
              {tokenVerificationStatus.error && (
                <p className="text-center">{tokenVerificationStatus.error}</p>
              )}
            </div>
          )}

          {/* Display API response data if available */}
          {apiResponse && (
            <div className="border border-gray-300 px-4 py-3 rounded mb-6">
              <h3 className="font-bold text-gray-800 text-center">
                API Response Data:
              </h3>
              <pre className="mt-2 bg-gray-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-center mt-6">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <div className="text-center py-12">
            <p className="text-xl mb-4">Please log in to test the API</p>
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </UnauthenticatedTemplate>
      </div>
    </div>
  );
};

export default DocsPage;
