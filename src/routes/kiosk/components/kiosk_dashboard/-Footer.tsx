export default function Footer() {
  return (
    <footer className="flex justify-center py-1 space-x-6 bg-white font-poppins">
      <p className="self-center text-xs">
        Powered by{" "}
        <span className="hover-card-wrapper">
          <span className="hover-card-trigger text-blue-500 underline">
            Unicenter Communications
          </span>
          <span className="hover-card flex flex-col gap-2">
            <img src="/unicenter-logo.svg" className="w-20 mb-3 self-center" />
            <div className="flex flex-row gap-2">
              <img src="/sms.svg"  />
              <p className="self-center">unicenter.ph</p>
            </div>
            <div className="flex flex-row gap-1 ">
              <img src="/mail.svg"  />
              <p className="self-center">careers@works-telemondo.com</p>
            </div>
          </span>
        </span>{" "}
        and{" "}
        <span className="hover-card-wrapper">
          <span className="hover-card-trigger text-blue-500 underline">
            Telemondo
          </span>
          <span className="hover-card flex flex-col gap-2">
            <img src="/telemondo-logo.svg" className="w-40 mb-3 self-center" />
            <div className="flex flex-row gap-2">
              <img src="/sms.svg"  />
              <p className="self-center">works-telemondo.com</p>
            </div>
            <div className="flex flex-row gap-1 ">
              <img src="/mail.svg"  />
              <p className="self-center">careers@works-telemondo.com</p>
            </div>
          </span>
        </span>
      </p>
    </footer>
  );
}
