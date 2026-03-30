import { useState, useEffect} from 'react';

export default function AddEditActivityOverlay({ onClose, place, onSaveActivities}) {
  const [activities, setActivities] = useState([]);
  const [errors, setErrors] = useState({});
  
  const TrashIcon = () => (
    <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.375 7.00001H5.625M5.625 7.00001H23.625M5.625 7.00001V23.3333C5.625 23.9522 5.86205 24.5457 6.28401 24.9833C6.70597 25.4208 7.27826 25.6667 7.875 25.6667H19.125C19.7217 25.6667 20.294 25.4208 20.716 24.9833C21.1379 24.5457 21.375 23.9522 21.375 23.3333V7.00001M9 7.00001V4.66668C9 4.04784 9.23705 3.45435 9.65901 3.01676C10.081 2.57918 10.6533 2.33334 11.25 2.33334H15.75C16.3467 2.33334 16.919 2.57918 17.341 3.01676C17.7629 3.45435 18 4.04784 18 4.66668V7.00001"
        stroke="#F3F3F3"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const handleAddActivityLocal = () => {
    setActivities(prev => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        name: ''
      }
    ]);
  };

  const handleDeleteActivityLocal = (id) => {
    setActivities(prev => prev.filter(act => act.id !== id));
  };

  const handleSave = () => {
    const newErrors = {};
  
    activities.forEach(act => {
      if (!act.name.trim()) {
        newErrors[act.id] = true;
      }
    });
  
    setErrors(newErrors);
  
    // If any errors exist → stop save
    if (Object.keys(newErrors).length > 0) return;
  
    onSaveActivities(place.id, activities);
    onClose();
  };

  useEffect(() => {
    if (place?.activities) {
      setActivities(place.activities);
    } else {
      setActivities([]);
    }
  }, [place]);
  
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
        {place?.name ? `${place.name} Activities` : 'Activities'}
      </p>

      <div className="flex flex-col gap-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex py-4 px-6 items-center gap-3 rounded-3xl border border-[#419061] bg-[#FDFFFE]">
            <input
              type="text"
              value={activity.name}
              onChange={(e) => {
                const value = e.target.value;
            
                setActivities(prev =>
                  prev.map((act, i) =>
                    i === index ? { ...act, name: value } : act
                  )
                );
            
                // Clear error as user types
                if (value.trim()) {
                  setErrors(prev => {
                    const copy = { ...prev };
                    delete copy[activity.id];
                    return copy;
                  });
                }
              }}
              placeholder={
                errors[activity.id]
                  ? "Warning, please enter activity name"
                  : "Enter activity..."
              }
              className={`text-[#08120C] font-manrope text-xl flex-1 bg-transparent outline-none border rounded-xl px-3 py-2
                ${
                  errors[activity.id]
                    ? 'border-red-500 placeholder-red-400'
                    : 'border-transparent'
                }
              `}
            />
            <button onClick={() => handleDeleteActivityLocal(activity.id)} className="flex-shrink-0 p-2 rounded-3xl bg-[#419061] hover:bg-[#245136] w-[41px] h-[42px] flex items-center justify-center">
              <TrashIcon />
            </button>
          </div>
        ))}

        {activities.length.length === 0 && (
          <p className="text-[#4A5551] font-manrope text-base italic px-2">
            No activities yet. Add one below or ask the AI assistant.
          </p>
        )}

        {/* Add New Activity Button */}
        <button onClick={handleAddActivityLocal} className="flex py-4 px-6 justify-center items-center gap-2.5 rounded-3xl border border-[#419061] bg-[#6FBE8F] hover:bg-[#5AAD7F] mt-2">
          <p className="text-[#FDFFFE] font-manrope text-xl font-medium">
            Add a New Activity
          </p>
          <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.625 24.375H9.375V20.625H20.625V9.375H24.375V20.625H35.625V24.375H24.375V35.625H20.625V24.375Z"
              fill="#FDFFFE"
            />
          </svg>
        </button>

        {/* Save Button */}
        <button onClick={handleSave} className="flex py-3 px-8 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE] hover:bg-[#F0F0F0]">
          <p className="text-[#245136] font-manrope text-xl font-medium">
            Save
          </p>
        </button>
      </div>
    </div>
  );
}
