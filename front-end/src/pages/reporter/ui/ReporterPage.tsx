import { Shorts, ReporterNews } from "@/widgets/reporter"
import "@shared/styles/CustomScroll.css"

export default function ReporterPage() {
  return (
    <div>
        <div className="my-5">
           <Shorts />
        </div>
        <div className="bg-white/75">
            <ReporterNews />
        </div>
    </div>
  )
}
