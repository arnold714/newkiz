import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CookiesProvider>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </CookiesProvider>
  );
}

export default App;