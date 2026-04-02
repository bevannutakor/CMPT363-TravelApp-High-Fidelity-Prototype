export default function ConfirmationDialog() {
  return (
    <div className="flex pt-8 pr-6 pb-5 pl-6 justify-center items-center gap-2.5 rounded-3xl border border-[#419061] bg-[#FDFFFE] shadow-[04px4px0rgba(0,0,0,0.25)] min-w-screen min-h-screen absolute left-[380px] top-[317px]">
      <div className="flex flex-col items-start gap-8 shrink-0 w-[421px] h-[132px]">
        <p className="text-[#000] font-manrope text-xl w-full">
          Are you sure? This activity &quot;&#91;Activity Name&#93;&quot; will
          be permanently removed.
        </p>
        <div className="inline-grid w-[421px] relative">
          <button className="cursor-pointer text-nowrap flex pt-[15px] pr-[33px] pb-3.5 pl-[33px] justify-center items-center gap-2.5 rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE] w-[131px] h-[46px] absolute left-0 top-0">
            <p className="text-[#245136] font-manrope text-xl font-medium w-fit">
              Keep
            </p>
          </button>
          <button className="cursor-pointer text-nowrap flex pt-[15px] pr-[33px] pb-3.5 pl-[33px] justify-center items-center gap-2.5 rounded-3xl border border-[#6FBE8F] bg-[#419061] w-full h-[46px] absolute left-[276px] top-0">
            <p className="text-[#FDFFFE] font-manrope text-xl font-medium w-fit">
              Remove
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
