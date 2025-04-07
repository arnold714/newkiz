import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  );
}

export default App;