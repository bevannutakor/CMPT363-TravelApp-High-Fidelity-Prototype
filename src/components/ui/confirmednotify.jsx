import { useEffect, useState } from 'react';

export default function ConfirmedNotify({ message, duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose(); // optional callback to inform parent
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed left-1/2 top-12 transform -translate-x-1/2 z-50 flex py-4 px-6 justify-center items-center gap-2.5 rounded-3xl border border-[#419061] bg-[#FDFFFE] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <p className="text-[#08120C] font-manrope text-xl font-medium">
        {message}
      </p>
    </div>
  );
}
