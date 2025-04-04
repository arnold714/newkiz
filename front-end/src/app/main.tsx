import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/index.css"
import App from "./App.tsx"
import { registerSW } from "virtual:pwa-register"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("새 버전이 있습니다. 새로고침할까요?")) {
      updateSW(true)
    }
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
