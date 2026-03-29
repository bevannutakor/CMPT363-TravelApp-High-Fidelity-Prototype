export default function DayTab({ day, isActive, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex py-3 px-5 justify-center items-center border rounded ${
        isActive 
          ? 'border-[#419061] bg-[#419061]' 
          : 'border-[#6FBE8F] bg-[#FDFFFE]'
      }`}
    >
      <p className={`font-manrope text-2xl font-semibold ${
        isActive ? 'text-[#FDFFFE]' : 'text-[#6FBE8F]'
      }`}>
        {day.name}
      </p>
    </button>
  );
}
