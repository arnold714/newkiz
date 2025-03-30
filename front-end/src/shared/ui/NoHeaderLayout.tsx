import NavBar from "./NavBar"
import { LayoutProps } from "@shared/types/common"

export const NoHeaderLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <div>{children}</div>
      <NavBar />
    </div>
  )
}
