import { Link } from "@tanstack/react-router";
import { useState } from "react";

const pages = [
  {
    name: "Dashboard",
    position: "160px",
    path: "/admin/dashboard/",
  },
  {
    name: "Appointments",
    position: "205px",
    path: "/admin/appointments/",
  },
  {
    name: "Queueing",
    position: "250px",
    path: "/admin/queueing/",
  },
  {
    name: "Analytics",
    position: "295px",
    path: "/admin/analytics/",
  },
  {
    name: "Management",
    position: "340px",
    path: "/admin/management/",
  },
];

export default function Navbar() {
  const [translateYPos, setTranslateYPos] = useState(pages[0].position);
  return (
    <div className="w-[17vw] relative bg-main_primary h-screen flex flex-col justify-start items-end rounded-tr-2xl rounded-br-2xl">
      <div
        style={{
          transform: `translateY(${translateYPos})`,
        }}
        className="absolute bg-white h-[45px] w-[85%] rounded-tl-xl rounded-bl-xl transition-all ${translate-y-[${translateYPos}]}"
      >
        <div className="absolute right-0 w-12 h-6 bg-white -top-6">
          <div className="absolute size-full rounded-br-3xl bg-main_primary"></div>
        </div>
        <div className="absolute right-0 w-12 h-6 bg-white -bottom-6">
          <div className="absolute size-full rounded-tr-3xl bg-main_primary"></div>
        </div>
      </div>
      <div className="w-[85%] flex flex-col items-center">
        <img src="/kiosk-logo.png" className="my-10 rounded-lg size-20"/>
        {pages.map((page, i) => {
          return (
            <Link key={i} to={page.path} className="z-10 w-full">
              <button
                onClick={() => {
                  setTranslateYPos(page.position);
                }}
                className="flex items-center w-full gap-4 py-3 pl-7"
              >
                <img
                  src={`${translateYPos === page.position ? "/dashboard-logo-darkblue.svg" : "/dashboard-logo-white.svg"}`}
                />
                <p
                  className={`${translateYPos === page.position ? "text-blue-950" : "text-white"} text-sm`}
                >
                  {page.name}
                </p>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
