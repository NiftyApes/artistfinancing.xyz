const NOTIFICATION_COUNT = 3;

export const FloatingButton = () => {
  return ( 
    <button className="fixed bottom-10 right-10">
      <div className="relative cursor-pointer">
        {NOTIFICATION_COUNT && (
          <div className="absolute rounded-full h-8 w-8 -top-4 -right-4 border-2 border-orange-300 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
            {NOTIFICATION_COUNT}
          </div>
        )}
        <div className="border-2 border-gray-200/30 h-10 w-10 rounded-xl bg-black flex items-center justify-center">
          🍌
        </div>
      </div>
    </button>
   );
};
