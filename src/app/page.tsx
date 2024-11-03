import MainMap from "@/components/MainMap";
import LandingModal from "@/components/modal/Landing";

export default function page() {
  return (
    <div className="mx-5 flex h-[calc(100%-9.875rem)] items-center justify-center pt-[4.25rem] sm:mx-10">
      <div className="h-full min-h-[32.5rem] w-full rounded-[1.875rem]">
        <MainMap />
      </div>
      <LandingModal />
    </div>
  );
}
