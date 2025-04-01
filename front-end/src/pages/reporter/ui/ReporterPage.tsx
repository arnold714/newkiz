import { Shorts, ReporterNews } from "@/widgets/reporter"

export default function ReporterPage() {
  return (
    <div>
        <div className="my-5">
           <Shorts />
        </div>
        <div className="bg-white/65">
            <ReporterNews />
        </div>
    </div>
  )
}
