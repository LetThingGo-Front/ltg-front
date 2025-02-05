import LandingModal from "@/features/landing/components/Landing";
import LandingMap from "@/features/landing/components/LandingMap";

export default function page() {
  return (
    <div className="flex h-full justify-center pb-[1.375rem] pt-[0.875rem] sm:overflow-y-auto sm:pb-[5.125rem] sm:pt-[4.25rem]">
      <div className="relative mx-5 h-full w-full sm:mx-10 sm:min-h-[41.875rem]">
        <div className="absolute left-0 top-0 h-full w-full rounded-[1.875rem]">
          <LandingMap />
        </div>
        <LandingModal />
      </div>
    </div>
  );
}
