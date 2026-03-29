export default function AddEditPlaceOverlay({ onClose, place }) {
  return (
    <div className="relative flex flex-col gap-8 rounded-3xl border border-[#419061] bg-[#FDFFFE] shadow-lg p-10 max-w-[600px] w-full">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-[#419061] hover:text-[#245136]"
      >
        ✕
      </button>

      <div className="flex flex-col gap-5">
        {/* Destination */}
        <div className="flex flex-col gap-2">
          <label className="text-[#000] font-manrope text-xl">
            {place ? `Edit: ${place.name}` : 'Destination:'}
          </label>
          <input
            type="text"
            placeholder="Discover the hidden charms..."
            defaultValue={place?.name ?? ''}
            className="py-3 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE] text-[#353D3A] font-manrope text-xl outline-none w-full"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-[#000] font-manrope text-xl">
            Date:
          </label>
          <input
            type="date"
            className="py-3 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE] text-[#353D3A] font-manrope text-xl outline-none w-full"
          />
        </div>

        {/* Time From */}
        <div className="flex flex-col gap-2">
          <label className="text-[#000] font-manrope text-base">
            Time From
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              min="1"
              max="12"
              defaultValue="12"
              className="py-3 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE] text-[#000] font-manrope text-xl outline-none w-full text-center"
            />
            <input
              type="number"
              min="0"
              max="59"
              defaultValue="00"
              className="py-3 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE] text-[#000] font-manrope text-xl outline-none w-full text-center"
            />
            <select className="py-3 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE] text-[#000] font-manrope text-xl outline-none w-full text-center">
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        </div>

        {/* Time To */}
        <div className="flex flex-col gap-2">
          <label className="text-[#000] font-manrope text-base">
            To
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              min="1"
              max="12"
              defaultValue="12"
              className="py-3 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE] text-[#000] font-manrope text-xl outline-none w-full text-center"
            />
            <input
              type="number"
              min="0"
              max="59"
              defaultValue="00"
              className="py-3 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE] text-[#000] font-manrope text-xl outline-none w-full text-center"
            />
            <select className="py-3 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE] text-[#000] font-manrope text-xl outline-none w-full text-center">
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center items-center gap-8">
        <button
          onClick={onClose}
          className="flex py-3 px-8 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE] hover:bg-[#F0F0F0]"
        >
          <p className="text-[#245136] font-manrope text-xl font-medium">
            Save
          </p>
        </button>
        <button
          onClick={onClose}
          className="flex py-3 px-8 justify-center items-center rounded-3xl border border-[#419061] bg-[#6FBE8F] hover:bg-[#5AAD7F]"
        >
          <p className="text-[#FDFFFE] font-manrope text-xl font-medium">
            Cancel
          </p>
        </button>
      </div>
    </div>
  );
}
