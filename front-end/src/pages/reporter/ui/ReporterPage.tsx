import { ReporterNews } from "@/widgets/reporter";
import FunctionButton from "@/widgets/reporter/ui/FunctionButton";
import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "@shared/styles/CustomScroll.css";

export default function ReporterPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  return (
    <div ref={scrollRef} className="overflow-y-auto h-screen scroll pb-15 relative">
      {location.pathname === "/reporter" && (
        <>
          <div className="bg-white/75">
            <ReporterNews />
          </div>
          <FunctionButton scrollRef={scrollRef} />
        </>
      )}

      <Outlet />
    </div>
  );
}
