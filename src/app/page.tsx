import MainMap from "@/components/MainMap";
import LandingModal from "@/components/modal/Landing";

export default function page() {
  return (
    <div className="relative flex items-center justify-center">
      <MainMap />
      <LandingModal />
    </div>
  );
}
