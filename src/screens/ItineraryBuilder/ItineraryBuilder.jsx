import {useState, useRef, useEffect} from 'react';
import AddEditActivityOverlay from '../../components/ui/activityoverlay';
import AddEditPlaceOverlay from '../../components/ui/placeoverlay';
import DayTab from '../../components/ui/DayTab';
import ChatBubble from '../../components/ui/ChatBubble'
import ConfirmationDialog from '../../components/ui/confirmoverlay'
import ConfirmedNotify from '../../components/ui/confirmednotify'


export default function ItineraryBuilder() {
  const [itinerary, setItinerary] = useState({
    tripName: "Exploring Munich",
    days: [
      {
        id: 1,
        name: "Day 1",
        places: [
          {
            id: "bmw-museum",
            name: "BMW Museum",
            timeStart: "10:00",
            timeEnd: "15:00",
            isFavorite: false,
            activities: [
              { id: "act1", name: "Browse the classic car collection" },
              { id: "act2", name: "Watch the restoration workshop demo" },
              { id: "act3", name: "Lunch at the museum cafe" }
            ]
          },
          {
            id: "marienplatz",
            name: "Marienplatz",
            timeStart: "15:30",
            timeEnd: "17:30",
            description: "",
            isFavorite: true,
            activities: []
          }
        ]
      },
      { id: 2, name: "Day 2", places: [] },
      { id: 3, name: "Day 3", places: [] }
    ],
    chatHistory: [
      { role: "user", message: "I'm planning to go to the Marienplatz after the BMW Museum. Can you help give some suggestions for activities to do in the Marienplatz?" },
      { role: "assistant", message: "1. Explore Marienkirche Cathedral (1 hour)\n\n2. Watch the Glockenspiel performance (30 mins)\n\n3. Lunch at a traditional Bavarian café (1 hour)\n\n4. Photo stop at Mariensäule statue (15 mins)" }
    ]
  });

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isPlaceOverlayOpen, setIsPlaceOverlayOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmType, setConfirmType] = useState(null);

  const [showConfirmNotify, setShowConfirmNotify] = useState(false);
  const [confirmMessageNotify, setConfirmMessageNotify] = useState('');
  const chatEndRef = useRef(null);

  const currentDayObj = itinerary.days.find(d => d.id === currentDay);
  const currentPlaces = currentDayObj?.places ?? [];
  //const selectedPlace = currentPlaces.find(p => p.id === selectedPlaceId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [itinerary.chatHistory, isLoading]);

  
  const handleChatSubmit = async () => {
    const message = chatInput.trim();
    if (!message || isLoading) return;

    setChatInput('');
    setIsLoading(true);

    setItinerary(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, { role: "user", message }]
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, itinerary }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Always show the AI reply in chat immediately
      setItinerary(prev => ({
        ...prev,
        chatHistory: data.updatedItinerary.chatHistory
      }));

      // Check if AI actually changed places/days structure
      const daysChanged = JSON.stringify(data.updatedItinerary.days) !== JSON.stringify(itinerary.days);

      if (daysChanged) {
        // Require user confirmation before applying structural changes
        setPendingAction(() => () => {
          setItinerary(prev => ({
            ...prev,
            days: data.updatedItinerary.days,
            tripName: data.updatedItinerary.tripName,
          }));
          setConfirmMessageNotify('Itinerary updated!');
          setShowConfirmNotify(true);
        });
        setConfirmType("edit");
        setConfirmMessage(data.reply);
        setIsConfirmOpen(true);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setItinerary(prev => ({
        ...prev,
        chatHistory: [
          ...prev.chatHistory,
          { role: "assistant", message: "Sorry, I encountered an error. Please try again." }
        ]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };


  //Manual Itinerary editing
  //Update an existing place
  const handleAddPlace = (newPlace, dayId) => {
    setItinerary(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id !== dayId) return day;
  
        return {
          ...day,
          places: [
            ...day.places,
            {
              ...newPlace,
              id: `place-${Date.now()}`,
              activities: []
            }
          ]
        };
      })
    }));
  
    setIsPlaceOverlayOpen(false);
  
    // Trigger notification
    setConfirmMessageNotify(`Place "${newPlace.name}" successfully added!`);
    setShowConfirmNotify(true);
  };

  // Update an existing place
  const handleUpdatePlace = (placeId, updatedPlace) => {
    setItinerary(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id !== currentDay) return day;
  
        return {
          ...day,
          places: day.places.map(place =>
            place.id === placeId
              ? { ...place, ...updatedPlace }
              : place
          )
        };
      })
    }));
  
    setIsPlaceOverlayOpen(false);
  };

  // Delete a place
 const handleDeletePlace = (placeId, placeName) => {
   setPendingAction(() => () => {
     setItinerary(prev => ({
       ...prev,
       days: prev.days.map(day =>
         day.id === currentDay
           ? { ...day, places: day.places.filter(place => place.id !== placeId) }
           : day
       )
     }));
 
     setIsPlaceOverlayOpen(false);
 
     // Trigger notification
     setConfirmMessageNotify(`Place "${placeName}" successfully deleted!`);
     setShowConfirmNotify(true);
   });
 
   setConfirmType("delete");
   setConfirmMessage("Are you sure you want to delete this place? This cannot be undone.");
   setIsConfirmOpen(true);
 };

const handleSaveActivities = (placeId, updatedActivities) => {
  setPendingAction(() => () => {
    setItinerary(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id !== currentDay) return day;

        return {
          ...day,
          places: day.places.map(place =>
            place.id === placeId
              ? { ...place, activities: updatedActivities }
              : place
          )
        };
      })
    }));

    setIsOverlayOpen(false);
  });

  const place = currentDayObj.places.find(p => p.id === placeId);
  setConfirmType("edit");
  setConfirmMessage(`Save changes to "${place.name}"'s activities?`);
  setIsConfirmOpen(true);
};

  const toggleFavorite = (placeId) => {
    setItinerary(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id !== currentDay) return day;
  
        return {
          ...day,
          places: day.places.map(place =>
            place.id === placeId
              ? { ...place, isFavorite: !place.isFavorite }
              : place
          )
        };
      })
    }));
  };

  //Toggle days
  const handleAddDay = () => {
    const newDayId =
      Math.max(...itinerary.days.map(d => d.id), 0) + 1;
  
    setItinerary(prev => ({
      ...prev,
      days: [
        ...prev.days,
        {
          id: newDayId,
          name: `Day ${newDayId}`,
          places: []
        }
      ]
    }));
  
    setCurrentDay(newDayId);
  };
  
  return (
    <>
      <div className="bg-[#FDFFFE] h-screen flex overflow-hidden">
        {/* LEFT SIDE - 50% */}
        <div className="w-1/2 p-12 flex flex-col h-full">
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
            {itinerary.tripName}
          </h1>

          {/* Activity Cards */}
          <div className="flex-1 overflow-y-auto mb-4">
          <div className="flex flex-col gap-4">
            {currentPlaces.map(place => (
              <div key={place.id} className="flex py-6 px-8 flex-col gap-2.5 rounded-3xl border border-[#419061] bg-[#DCEFE4]">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[#000] font-manrope text-2xl font-medium">
                    {place.name}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]">
                      <p className="text-[#245136] font-manrope text-base font-medium">
                        View Posts
                      </p>
                    </button>
                    <button
                      onClick={() => { setSelectedPlace(place); setIsPlaceOverlayOpen(true); }}
                      className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]"
                    >
                      <p className="text-[#245136] font-manrope text-base font-medium">
                        Edit
                      </p>
                    </button>
                    <button
                        onClick={() => handleDeletePlace(place.id, place.name)}
                        className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]"
                      >
                        <p className="text-[#245136] font-manrope text-base font-medium">
                          Delete
                        </p>
                      </button>
                  </div>
                </div>

                <p className="text-[#245136] font-manrope text-xl font-medium">
                  {place.timeStart} - {place.timeEnd}
                </p>

                {place.activities?.length > 0 && (
                  <p className="text-[#419061] font-manrope text-base font-medium">
                    {place.activities[0].name}
                  </p>
                )}

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => { setSelectedPlace(place); setIsOverlayOpen(true); }}
                    className="flex py-2 px-6 justify-center items-center rounded-3xl border border-[#6FBE8F] bg-[#FDFFFE]"
                  >
                    <p className="text-[#245136] font-manrope text-base font-medium">
                      All Activities ({place.activities.length} total)
                    </p>
                  </button>

                  <div onClick={() => toggleFavorite(place.id)} className="flex justify-center items-center rounded-full border border-[#6FBE8F] bg-[#FDFFFE] w-12 h-12">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill={place.isFavorite ? "#6FBE8F" : "none"}
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
              
            ))}

            {/* Add New Place Button */}
            <button
              onClick={() => { setSelectedPlace(null); setIsPlaceOverlayOpen(true); }}
              className="flex py-3 px-6 justify-center items-center gap-2.5 rounded-3xl border border-[#419061] bg-[#6FBE8F]"
            >
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
          </div>

          {/* Day Tabs - positioned at bottom */}
          <div className="bg-[#FDFFFE] pt-4 flex gap-2 overflow-x-auto">
            {itinerary.days.map(day => (
                <DayTab
                  key={day.id}
                  day={day}
                  isActive={currentDay === day.id}
                  onClick={() => setCurrentDay(day.id)}
                />
              ))}
           	<button
           	  onClick={handleAddDay}
           	  className="flex py-3 px-5 justify-center items-center border-2 border-dashed rounded
           	             border-[#6FBE8F] bg-[#FDFFFE] hover:bg-[#DCEFE4] transition"
           	>
           	  <p className="font-manrope text-2xl font-semibold text-[#6FBE8F]">
           	    + Add Day
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
        <div className="w-1/2 p-12 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-4">
            {itinerary.chatHistory.map((msg, idx) => (
                <ChatBubble
                  key={idx}
                  message={msg.message}
                  isUser={msg.role === 'user'}
                />
            ))}
            {isLoading && (
              <div className="flex py-5 px-6 rounded-3xl border border-[#419061] bg-[#FDFFFE]">
                <p className="text-[#4A5551] font-manrope text-xl italic">Thinking...</p>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input box at bottom */}
          <div className="flex py-3 px-6 justify-between items-center gap-2.5 rounded-3xl border border-[#419061] bg-[#FDFFFE]">
            <input
              type="text"
              placeholder="Reply...."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="text-[#4A5551] font-manrope text-xl flex-1 bg-transparent outline-none disabled:opacity-50"
            />
            <div
              onClick={handleChatSubmit}
              className={`flex p-[5px] items-center justify-center shrink-0 rounded-3xl w-[39px] h-[39px] cursor-pointer ${
                isLoading ? 'bg-[#A0C8B0]' : 'bg-[#419061]'
              }`}
            >
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

      {isOverlayOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsOverlayOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddEditActivityOverlay 
              onClose={() => {setIsOverlayOpen(false); setSelectedPlace(null);}}
              place={selectedPlace}
              onSaveActivities={handleSaveActivities}
              onConfirmAction={(action, message, type) => {
                setPendingAction(() => action);
                setConfirmMessage(message);
                setConfirmType(type);
                setIsConfirmOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {isPlaceOverlayOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsPlaceOverlayOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddEditPlaceOverlay 
              onClose={() => setIsPlaceOverlayOpen(false)} 
              place={selectedPlace} 
              days={itinerary.days}
              currentDay={currentDay}
              onAddDay={handleAddDay}
              onSave={(placeData) => {
                const isEditing = !!selectedPlace;
              
                setPendingAction(() => () => {
                  if (isEditing) {
                    handleUpdatePlace(selectedPlace.id, placeData);
                  } else {
                    handleAddPlace(placeData, placeData.dayId);
                  }
                });
              
                setConfirmType(isEditing ? "edit" : "add");
              
                setConfirmMessage(
                  isEditing
                    ? `Save changes to "${placeData.name}"?`
                    : `Add "${placeData.name}" to your itinerary?`
                );
              
                setIsConfirmOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <ConfirmationDialog
          message={confirmMessage}
          type={confirmType}
          onCancel={() => {
            setIsConfirmOpen(false);
            setPendingAction(null);
          }}
          onConfirm={() => {
            if (pendingAction) pendingAction();
            setIsConfirmOpen(false);
            setPendingAction(null);
          }}
        />
      )}

      {showConfirmNotify && (
        <ConfirmedNotify
          message={confirmMessageNotify}
          duration={3000}
          onClose={() => setShowConfirmNotify(false)}
        />
      )}
    </>
  );
}
