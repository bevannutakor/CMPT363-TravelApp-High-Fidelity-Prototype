import { useNavigate } from "react-router-dom";

export default function UnderConstruction() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <p className="text-3xl font-manrope text-[#419061]">
        🚧 Page under construction
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE] hover:bg-[#DCEFE4] transition"
      >
        <p className="text-[#245136] font-manrope text-lg font-medium">
          ← Back to Itinerary
        </p>
      </button>
    </div>
  );
}
