import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/index.css"
import App from "./App.tsx"
import { registerSW } from "virtual:pwa-register"


const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("새 버전이 있습니다. 새로고침할까요?")) {
      updateSW(true)
    }
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
