import { useState } from 'react';
import AddEditOverlay from '../../components/ui/overlay';

export default function ItineraryBuilder() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <div className="bg-[#FDFFFE] min-h-screen flex">
        {/* LEFT SIDE - 50% */}
        <div className="w-1/2 p-12 relative">
          {/* Back button */}
          <svg
            width="55"
            height="55"
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[55px] h-[55px] mb-4"
          >
            <path
              d="M27.5 18.3333L18.3333 27.4999M18.3333 27.4999L27.5 36.6666M18.3333 27.4999H36.6666M50.4166 27.4999C50.4166 40.1564 40.1565 50.4166 27.5 50.4166C14.8435 50.4166 4.58331 40.1564 4.58331 27.4999C4.58331 14.8434 14.8435 4.58325 27.5 4.58325C40.1565 4.58325 50.4166 14.8434 50.4166 27.4999Z"
              stroke="#419061"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Title */}
          <h1 className="text-[#08120C] font-manrope text-[40px] font-semibold mb-8">
            Exploring Munich
          </h1>

          {/* Activity Cards */}
          <div className="flex flex-col gap-4 mb-8">
            {/* BMW Museum Card */}
            <div className="flex py-6 px-8 flex-col gap-2.5 rounded-3xl border border-[#419061] bg-[#DCEFE4]">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#000] font-manrope text-2xl font-medium">
                  BMW Museum
                </p>
                <div className="flex gap-2">
                  <button className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]">
                    <p className="text-[#245136] font-manrope text-base font-medium">
                      View Posts
                    </p>
                  </button>
                  <button className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]">
                    <p className="text-[#245136] font-manrope text-base font-medium">
                      Edit
                    </p>
                  </button>
                </div>
              </div>

              <p className="text-[#245136] font-manrope text-xl font-medium">
                10:00 - 15:00
              </p>

              <p className="text-[#419061] font-manrope text-base font-medium">
                Browse the classic car collection Watch the restoration workshop demo
              </p>

              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setIsOverlayOpen(true)}
                  className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]"
                >
                  <p className="text-[#245136] font-manrope text-base font-medium">
                    All Activities (3 total)
                  </p>
                </button>

                <div className="flex justify-center items-center rounded-full border border-[#6FBE8F] bg-[#FDFFFE] w-12 h-12">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.7867 6.14666C27.1057 5.46533 26.2971 4.92485 25.4071 4.5561C24.5172 4.18735 23.5633 3.99756 22.6 3.99756C21.6367 3.99756 20.6828 4.18735 19.7929 4.5561C18.9029 4.92485 18.0943 5.46533 17.4133 6.14666L16 7.55999L14.5867 6.14666C13.2111 4.77107 11.3454 3.99827 9.4 3.99827C7.45462 3.99827 5.58892 4.77107 4.21333 6.14666C2.83774 7.52225 2.06494 9.38795 2.06494 11.3333C2.06494 13.2787 2.83774 15.1444 4.21333 16.52L16 28.3067L27.7867 16.52C28.468 15.839 29.0085 15.0304 29.3772 14.1405C29.746 13.2505 29.9358 12.2966 29.9358 11.3333C29.9358 10.37 29.746 9.41613 29.3772 8.52619C29.0085 7.63624 28.468 6.82767 27.7867 6.14666Z"
                      stroke="#6FBE8F"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Marienplatz Card */}
            <div className="flex py-6 px-8 flex-col gap-2.5 rounded-3xl border border-[#419061] bg-[#DCEFE4]">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#000] font-manrope text-2xl font-medium">
                  Marienplatz
                </p>
                <div className="flex gap-2">
                  <button className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]">
                    <p className="text-[#245136] font-manrope text-base font-medium">
                      View Posts
                    </p>
                  </button>
                  <button className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]">
                    <p className="text-[#245136] font-manrope text-base font-medium">
                      Edit
                    </p>
                  </button>
                </div>
              </div>

              <p className="text-[#245136] font-manrope text-xl font-medium">
                15:30 - 17:30
              </p>

              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setIsOverlayOpen(true)}
                  className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]"
                >
                  <p className="text-[#245136] font-manrope text-base font-medium">
                    All Activities (0 total)
                  </p>
                </button>

                <div className="flex justify-center items-center rounded-full border border-[#6FBE8F] bg-[#FDFFFE] w-12 h-12">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.7867 6.14666C27.1057 5.46533 26.2971 4.92485 25.4071 4.5561C24.5172 4.18735 23.5633 3.99756 22.6 3.99756C21.6367 3.99756 20.6828 4.18735 19.7929 4.5561C18.9029 4.92485 18.0943 5.46533 17.4133 6.14666L16 7.55999L14.5867 6.14666C13.2111 4.77107 11.3454 3.99827 9.4 3.99827C7.45462 3.99827 5.58892 4.77107 4.21333 6.14666C2.83774 7.52225 2.06494 9.38795 2.06494 11.3333C2.06494 13.2787 2.83774 15.1444 4.21333 16.52L16 28.3067L27.7867 16.52C28.468 15.839 29.0085 15.0304 29.3772 14.1405C29.746 13.2505 29.9358 12.2966 29.9358 11.3333C29.9358 10.37 29.746 9.41613 29.3772 8.52619C29.0085 7.63624 28.468 6.82767 27.7867 6.14666Z"
                      stroke="#6FBE8F"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Add New Place Button */}
            <button className="flex py-3 px-6 justify-center items-center gap-2.5 rounded-3xl border border-[#419061] bg-[#6FBE8F]">
              <p className="text-[#FDFFFE] font-manrope text-xl font-medium">
                Add a New Place
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
          </div>

          {/* Day Tabs - positioned at bottom */}
          <div className="absolute bottom-12 left-12 flex gap-2">
            <button className="flex py-3 px-5 justify-center items-center border border-[#419061] bg-[#419061] rounded">
              <p className="text-[#FDFFFE] font-manrope text-2xl font-semibold">
                Day 1
              </p>
            </button>
            <button className="flex py-3 px-5 justify-center items-center border border-[#6FBE8F] bg-[#FDFFFE] rounded">
              <p className="text-[#6FBE8F] font-manrope text-2xl font-semibold">
                Day 2
              </p>
            </button>
            <button className="flex py-3 px-5 justify-center items-center border border-[#6FBE8F] bg-[#FDFFFE] rounded">
              <p className="text-[#6FBE8F] font-manrope text-2xl font-semibold">
                Day 3
              </p>
            </button>
            <div className="flex justify-center items-center rounded-full border border-[#419061] bg-[#FDFFFE] w-[58px] h-[58px] ml-4">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.125 12.9166C27.125 21.9583 15.5 29.7083 15.5 29.7083C15.5 29.7083 3.875 21.9583 3.875 12.9166C3.875 9.83348 5.09977 6.87662 7.27988 4.69651C9.45999 2.5164 12.4169 1.29163 15.5 1.29163C18.5831 1.29163 21.54 2.5164 23.7201 4.69651C25.9002 6.87662 27.125 9.83348 27.125 12.9166Z"
                  stroke="#419061"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 16.7916C17.6401 16.7916 19.375 15.0567 19.375 12.9166C19.375 10.7765 17.6401 9.04163 15.5 9.04163C13.3599 9.04163 11.625 10.7765 11.625 12.9166C11.625 15.0567 13.3599 16.7916 15.5 16.7916Z"
                  stroke="#419061"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - 50% - Chat */}
        <div className="w-1/2 p-12 flex flex-col justify-between">
          {/* User message bubble */}
          <div className="flex flex-col gap-4">
            <button className="flex py-5 px-6 justify-start items-start rounded-3xl border border-[#419061] bg-[#DCEFE4]">
              <p className="text-[#000] font-manrope text-xl text-left">
                I'm planning to go to the Marienplatz after the BMW Museum. Can you
                help give some suggestions for activities to do in the Marienplatz?
              </p>
            </button>

            {/* AI response bubble */}
            <div className="flex py-5 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE]">
              <p className="text-[#000] font-manrope text-xl text-left whitespace-pre-line">
                1. Explore Marienkirche Cathedral (1 hour) - stunning Gothic architecture, climb the tower for city views
                
                2. Watch the Glockenspiel performance (30 mins) - the famous mechanical clock in the New Town Hall (runs at 11am, 12pm, 5pm)
                
                3. Lunch at a traditional Bavarian café (1 hour) - try local specialties like schnitzel or pretzels
                
                4. Photo stop at Mariensäule statue (15 mins) - iconic central monument, great photo spot
              </p>
            </div>
          </div>

          {/* Input box at bottom */}
          <div className="flex py-3 px-6 justify-between items-center gap-2.5 rounded-3xl border border-[#419061] bg-[#FDFFFE]">
            <input 
              type="text" 
              placeholder="Reply...." 
              className="text-[#4A5551] font-manrope text-xl flex-1 bg-transparent outline-none"
            />
            <div className="flex p-[5px] items-center justify-center shrink-0 rounded-3xl bg-[#419061] w-[39px] h-[39px]">
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 22.9583V6.04163M14.5 6.04163L6.04166 14.5M14.5 6.04163L22.9583 14.5"
                  stroke="#FDFFFE"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOverlayOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsOverlayOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddEditOverlay onClose={() => setIsOverlayOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
