import { useState, useEffect} from 'react';

export default function AddEditPlaceOverlay({ onClose, place,currentDay,days, onAddDay, onSave, onDelete}) {
  
  const [name, setName] = useState('');
  const [timeStart, setTimeStart] = useState('10:00');
  const [timeEnd, setTimeEnd] = useState('12:00');
  const [selectedDayId, setSelectedDayId] = useState(currentDay);

  const handleSave = () => {
    onSave({
      name,
      timeStart,
      timeEnd,
      dayId: selectedDayId,
      description: '',
      isFavorite: false
    });
  };

  useEffect(() => {
      if (place) {
        setName(place.name || '');
        setTimeStart(place.timeStart || '10:00');
        setTimeEnd(place.timeEnd || '12:00');
      } else {
        setName('');
        setTimeStart('10:00');
        setTimeEnd('12:00');
      }
      setSelectedDayId(currentDay);
    }, [place, currentDay]);
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
            placeholder="Enter a new Destination..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE] text-[#353D3A] font-manrope text-xl outline-none w-full"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-3">
          <label className="text-[#000] font-manrope text-xl">
            Select Day
          </label>
        
          <div className="flex flex-wrap gap-2">
            {days.map(day => (
              <button
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
                className={`px-5 py-2 rounded-2xl border font-manrope text-base transition
                  ${
                    selectedDayId === day.id
                      ? 'bg-[#6FBE8F] text-white border-[#6FBE8F]'
                      : 'bg-[#FDFFFE] text-[#245136] border-[#6FBE8F] hover:bg-[#DCEFE4]'
                  }
                `}
              >
                {day.name}
              </button>
            ))}
        
            {/* Add Day Button */}
            <button
              onClick={() => {
                const newDayId = onAddDay();
                setSelectedDayId(newDayId);
              }}
              className="px-5 py-2 rounded-2xl border border-[#419061] 
                         text-[#419061] font-manrope text-base 
                         hover:bg-[#DCEFE4] transition"
            >
              + Add Day
            </button>
          </div>
        </div>

        {/* Time From */}
        <div className="flex flex-col gap-2">
          <label className="text-[#000] font-manrope text-base text-xl">
            Time
          </label>
        
          <div className="flex gap-4">
            <input
              type="time"
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
              className="flex-1 py-3 px-5 rounded-2xl border border-[#6FBE8F] bg-[#FDFFFE] 
                         text-[#245136] font-manrope text-lg outline-none 
                         focus:border-[#419061] focus:ring-2 focus:ring-[#DCEFE4]"
            />
        
            <span className="flex items-center text-[#419061] font-medium">
              →
            </span>
        
            <input
              type="time"
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
              className="flex-1 py-3 px-5 rounded-2xl border border-[#6FBE8F] bg-[#FDFFFE] 
                         text-[#245136] font-manrope text-lg outline-none 
                         focus:border-[#419061] focus:ring-2 focus:ring-[#DCEFE4]"
            />
          </div>
        </div>
		</div>
      {/* Buttons */}
      <div className="flex justify-center items-center gap-8">
        <button
          onClick={handleSave}
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
