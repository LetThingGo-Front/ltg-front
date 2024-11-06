import MainMap from "@/components/MainMap";
import LandingModal from "@/components/modal/Landing";

export default function page() {
  return (
    <div className="flex h-[calc(100%-5.375rem)] justify-center pt-[0.875rem] sm:h-[calc(100%-9.375rem)] sm:overflow-y-auto sm:pt-[4.25rem]">
      <div className="relative mx-5 h-full w-full sm:mx-10 sm:min-h-[42.5rem]">
        <div className="absolute left-0 top-0 h-full w-full rounded-[1.875rem]">
          <MainMap />
        </div>
        <LandingModal />
      </div>
    </div>
  );
}
