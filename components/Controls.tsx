
import React from 'react';
import { Clapperboard, Sparkles, Wand2, Loader2, Play, Layout } from 'lucide-react';
import { Persona, AspectRatio } from '../types';

interface ControlsProps {
  persona: Persona | null;
  scenarioInput: string;
  setScenarioInput: (val: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (val: AspectRatio) => void;
  onGenerate: (isAuto: boolean) => void;
  appState: string;
  disabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  persona, 
  scenarioInput, 
  setScenarioInput, 
  aspectRatio,
  setAspectRatio,
  onGenerate, 
  appState, 
  disabled 
}) => {
  
  const isProcessing = appState === 'PLANNING' || appState === 'GENERATING';

  const getStatusText = () => {
    if (appState === 'PLANNING') return "Writing Storyboard...";
    if (appState === 'GENERATING') return "Filming 8 Scenes...";
    return "Processing...";
  };

  const ratios: AspectRatio[] = ["1:1", "3:4", "4:3", "9:16", "16:9"];

  return (
    <div className="bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <Clapperboard className="text-purple-500" size={24} />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Story Director</h2>
      </div>

      <div className="space-y-6">
        
        {/* Aspect Ratio Selector */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <Layout size={14} /> 
            Aspect Ratio
          </label>
          <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-x-auto">
             {ratios.map(ratio => (
               <button
                 key={ratio}
                 onClick={() => setAspectRatio(ratio)}
                 disabled={disabled || isProcessing}
                 className={`
                   flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap
                   ${aspectRatio === ratio 
                     ? 'bg-white dark:bg-zinc-700 text-purple-600 dark:text-purple-300 shadow-sm ring-1 ring-black/5 dark:ring-white/5' 
                     : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'}
                 `}
               >
                 {ratio}
               </button>
             ))}
          </div>
        </div>

        {/* Scenario Input */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <Wand2 size={14} /> 
            Scenario Prompt (Optional)
          </label>
          <textarea
            value={scenarioInput}
            onChange={(e) => setScenarioInput(e.target.value)}
            placeholder={`e.g. ${persona ? persona.nickname : 'She'} goes on a luxury ski trip in the Alps, ending with hot cocoa by the fire.`}
            className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600 min-h-[100px] resize-none"
            disabled={disabled || isProcessing}
          />
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Leave empty to let the AI invent a day based on the persona.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Auto Button */}
          <button
            onClick={() => onGenerate(true)}
            disabled={disabled || isProcessing}
            className={`
              relative overflow-hidden group py-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all border
              ${disabled || isProcessing
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800 cursor-not-allowed' 
                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-white border-zinc-200 dark:border-zinc-700'}
            `}
          >
            <Sparkles size={16} className={isProcessing ? "" : "text-yellow-500"} />
            {isProcessing && scenarioInput.length === 0 ? "Working..." : "Auto-Generate Story"}
          </button>

          {/* Custom Scenario Button */}
          <button
            onClick={() => onGenerate(false)}
            disabled={disabled || isProcessing || !scenarioInput.trim()}
            className={`
              py-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all
              ${disabled || isProcessing || !scenarioInput.trim()
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white hover:scale-[1.01] hover:shadow-purple-500/20'}
            `}
          >
             {isProcessing && scenarioInput.length > 0 ? (
               <>
                 <Loader2 size={18} className="animate-spin" />
                 {getStatusText()}
               </>
             ) : (
               <>
                 <Play size={18} fill="currentColor" />
                 Action! (Generate 8 Frames)
               </>
             )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
