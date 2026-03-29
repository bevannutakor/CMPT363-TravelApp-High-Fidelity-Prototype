export default function AddEditActivityOverlay({ onClose }) {
  return (
    <div className="relative rounded-3xl border border-[#419061] bg-[#FDFFFE] shadow-lg p-12 max-w-[700px] w-full">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-[#419061] hover:text-[#245136]"
      >
        ✕
      </button>

      <p className="text-[#000] font-manrope text-2xl font-medium mb-6">
        BMW Museum Activities
      </p>

      <div className="flex flex-col gap-4">
        {/* Activity 1 */}
        <div className="flex py-4 px-6 items-center gap-3 rounded-3xl border border-[#419061] bg-[#FDFFFE]">
          <input 
            type="text" 
            defaultValue="Browse the classic car collection"
            className="text-[#08120C] font-manrope text-xl flex-1 bg-transparent outline-none"
          />
          <button className="flex-shrink-0 p-2 rounded-3xl bg-[#419061] hover:bg-[#245136] w-[41px] h-[42px] flex items-center justify-center">
            <svg
              width="27"
              height="28"
              viewBox="0 0 27 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.375 7.00001H5.625M5.625 7.00001H23.625M5.625 7.00001V23.3333C5.625 23.9522 5.86205 24.5457 6.28401 24.9833C6.70597 25.4208 7.27826 25.6667 7.875 25.6667H19.125C19.7217 25.6667 20.294 25.4208 20.716 24.9833C21.1379 24.5457 21.375 23.9522 21.375 23.3333V7.00001M9 7.00001V4.66668C9 4.04784 9.23705 3.45435 9.65901 3.01676C10.081 2.57918 10.6533 2.33334 11.25 2.33334H15.75C16.3467 2.33334 16.919 2.57918 17.341 3.01676C17.7629 3.45435 18 4.04784 18 4.66668V7.00001"
                stroke="#F3F3F3"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Activity 2 */}
        <div className="flex py-4 px-6 items-center gap-3 rounded-3xl border border-[#419061] bg-[#FDFFFE]">
          <input 
            type="text" 
            defaultValue="Watch the restoration workshop demo"
            className="text-[#08120C] font-manrope text-xl flex-1 bg-transparent outline-none"
          />
          <button className="flex-shrink-0 p-2 rounded-3xl bg-[#419061] hover:bg-[#245136] w-[41px] h-[42px] flex items-center justify-center">
            <svg
              width="27"
              height="28"
              viewBox="0 0 27 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.375 7.00001H5.625M5.625 7.00001H23.625M5.625 7.00001V23.3333C5.625 23.9522 5.86205 24.5457 6.28401 24.9833C6.70597 25.4208 7.27826 25.6667 7.875 25.6667H19.125C19.7217 25.6667 20.294 25.4208 20.716 24.9833C21.1379 24.5457 21.375 23.9522 21.375 23.3333V7.00001M9 7.00001V4.66668C9 4.04784 9.23705 3.45435 9.65901 3.01676C10.081 2.57918 10.6533 2.33334 11.25 2.33334H15.75C16.3467 2.33334 16.919 2.57918 17.341 3.01676C17.7629 3.45435 18 4.04784 18 4.66668V7.00001"
                stroke="#F3F3F3"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Activity 3 */}
        <div className="flex py-4 px-6 items-center gap-3 rounded-3xl border border-[#419061] bg-[#FDFFFE]">
          <input 
            type="text" 
            defaultValue="Lunch at the museum cafe"
            className="text-[#08120C] font-manrope text-xl flex-1 bg-transparent outline-none"
          />
          <button className="flex-shrink-0 p-2 rounded-3xl bg-[#419061] hover:bg-[#245136] w-[41px] h-[42px] flex items-center justify-center">
            <svg
              width="27"
              height="28"
              viewBox="0 0 27 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.375 7.00001H5.625M5.625 7.00001H23.625M5.625 7.00001V23.3333C5.625 23.9522 5.86205 24.5457 6.28401 24.9833C6.70597 25.4208 7.27826 25.6667 7.875 25.6667H19.125C19.7217 25.6667 20.294 25.4208 20.716 24.9833C21.1379 24.5457 21.375 23.9522 21.375 23.3333V7.00001M9 7.00001V4.66668C9 4.04784 9.23705 3.45435 9.65901 3.01676C10.081 2.57918 10.6533 2.33334 11.25 2.33334H15.75C16.3467 2.33334 16.919 2.57918 17.341 3.01676C17.7629 3.45435 18 4.04784 18 4.66668V7.00001"
                stroke="#F3F3F3"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Activity 4 */}
        <div className="flex py-4 px-6 items-center gap-3 rounded-3xl border border-[#419061] bg-[#FDFFFE]">
          <input 
            type="text" 
            defaultValue="Visit the BMW Group Classic section"
            className="text-[#202524] font-manrope text-xl flex-1 bg-transparent outline-none"
          />
          <button className="flex-shrink-0 p-2 rounded-3xl bg-[#419061] hover:bg-[#245136] w-[41px] h-[42px] flex items-center justify-center">
            <svg
              width="27"
              height="28"
              viewBox="0 0 27 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.375 6.99998H5.625M5.625 6.99998H23.625M5.625 6.99998V23.3333C5.625 23.9522 5.86205 24.5456 6.28401 24.9832C6.70597 25.4208 7.27826 25.6666 7.875 25.6666H19.125C19.7217 25.6666 20.294 25.4208 20.716 24.9832C21.1379 24.5456 21.375 23.9522 21.375 23.3333V6.99998M9 6.99998V4.66665C9 4.04781 9.23705 3.45432 9.65901 3.01673C10.081 2.57915 10.6533 2.33331 11.25 2.33331H15.75C16.3467 2.33331 16.919 2.57915 17.341 3.01673C17.7629 3.45432 18 4.04781 18 4.66665V6.99998"
                stroke="#F3F3F3"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Add New Activity Button */}
        <button className="flex py-4 px-6 justify-center items-center gap-2.5 rounded-3xl border border-[#419061] bg-[#6FBE8F] hover:bg-[#5AAD7F] mt-2">
          <p className="text-[#FDFFFE] font-manrope text-xl font-medium">
            Add a New Activity
          </p>
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.625 24.375H9.375V20.625H20.625V9.375H24.375V20.625H35.625V24.375H24.375V35.625H20.625V24.375Z"
              fill="#FDFFFE"
            />
          </svg>
        </button>

		{/*Save Button*/}
        <button className="flex py-3 px-8 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE] hover:bg-[#F0F0F0]">
          <p className="text-[#245136] font-manrope text-xl font-medium">
            Save
          </p>
        </button>
      </div>
    </div>
  );
}
