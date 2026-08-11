import { useEffect,useState } from "react";

 function PassportLoader() {
  return (
    <div className="flex items-center justify-center p-5 w-full">
     
      <style>{`
        @keyframes custom-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes custom-pulse {
          0%, 100% { transform: scale(0.85); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .animate-custom-spin {
          animation: custom-spin 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        .animate-custom-pulse {
          animation: custom-pulse 1.4s ease-in-out infinite;
        }
      `}</style>

      
      <div className="w-[210px] h-[270px] rounded-2xl bg-white/75 backdrop-blur-md border border-white/40 shadow-xl flex flex-col items-center justify-center gap-4 font-sans">
        
       
        <div className="relative w-14 h-14 flex items-center justify-center">
          
          <div className="w-full h-full rounded-full border-[3px] border-indigo-500/15 border-t-indigo-600 border-r-purple-500 animate-custom-spin" />
          
          
          <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-indigo-600 to-purple-500 animate-custom-pulse shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
        </div>

        
        <p className="text-xs font-semibold text-gray-600 tracking-wider m-0">
          Uploading...
          Wait It takes time
        </p>
      </div>
    </div>
  );
}
export {PassportLoader}