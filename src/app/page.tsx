import MainMap from "@/components/MainMap";
import LandingModal from "@/components/modal/Landing";

export default function page() {
  return (
    <div className="flex h-[calc(100%-6rem)] justify-center sm:h-[calc(100%-9.875rem)] sm:overflow-y-auto">
      <div className="relative mx-5 h-full w-full sm:mx-10 sm:min-h-[47.0625rem] sm:pt-[4.25rem]">
        <div className="absolute left-0 top-0 h-full w-full rounded-[1.875rem]">
          <MainMap />
        </div>
        <LandingModal />
      </div>
    </div>
  );
}
