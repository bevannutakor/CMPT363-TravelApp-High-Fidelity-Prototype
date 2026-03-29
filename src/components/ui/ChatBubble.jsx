export default function ChatBubble({ message, isUser }) {
  return (
    <div className={`flex py-5 px-6 rounded-3xl border border-[#419061] ${
      isUser ? 'bg-[#DCEFE4]' : 'bg-[#FDFFFE]'
    }`}>
      <p className="text-[#000] font-manrope text-xl text-left whitespace-pre-line">
        {message}
      </p>
    </div>
  );
}
