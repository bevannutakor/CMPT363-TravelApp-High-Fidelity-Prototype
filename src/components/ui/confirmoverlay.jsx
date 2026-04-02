export default function ConfirmationDialog({ message, type, onConfirm, onCancel }) {
  const isDelete = type === "delete";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      
      <div className="flex flex-col gap-8 p-8 rounded-3xl border border-[#419061] bg-[#FDFFFE] shadow-[0_8px_24px_rgba(0,0,0,0.15)] w-[420px] animate-[fadeIn_0.2s_ease-out]">
        
        {/* Message */}
        <p className="text-[#08120C] font-manrope text-xl font-medium">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          
          {/* Cancel */}
          <button
            onClick={onCancel}
            className="flex py-3 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE] hover:bg-[#F0F0F0] transition"
          >
            <p className="text-[#245136] font-manrope text-lg font-medium">
              Cancel
            </p>
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            className={`flex py-3 px-6 justify-center items-center rounded-3xl border transition
              ${
                isDelete
                  ? "border-[#D96C6C] bg-[#FDECEC] hover:bg-[#F8DADA]"
                  : "border-[#6FBE8F] bg-[#419061] hover:bg-[#357a52]"
              }
            `}
          >
            <p
              className={`font-manrope text-lg font-medium
                ${isDelete ? "text-[#A94444]" : "text-[#FDFFFE]"}
              `}
            >
              {isDelete ? "Delete" : "Confirm"}
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}
