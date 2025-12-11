import React from 'react';
import { Persona } from '../types';
import { Sparkles, Hash, Briefcase, Calendar, Smile, Coffee } from 'lucide-react';

interface PersonaCardProps {
  persona: Persona;
  onReset: () => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onReset }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-colors">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 dark:bg-purple-600/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold uppercase text-xs tracking-wider">
            <Sparkles size={14} />
            AI Persona Profile
          </div>
          <button 
            onClick={onReset}
            className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 underline"
          >
            Reset Identity
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{persona.nickname}</h2>
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-medium border border-purple-200 dark:border-purple-500/20">
            {persona.vibe}
          </span>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
           <div className="bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                 <Calendar size={12} /> 나이 (Age)
              </div>
              <div className="text-zinc-900 dark:text-zinc-200 font-semibold text-sm">{persona.age}</div>
           </div>
           
           <div className="bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                 <Briefcase size={12} /> 직업 (Job)
              </div>
              <div className="text-zinc-900 dark:text-zinc-200 font-semibold text-sm">{persona.occupation}</div>
           </div>

           <div className="bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                 <Smile size={12} /> 성격 (Personality)
              </div>
              <div className="text-zinc-900 dark:text-zinc-200 font-semibold text-sm">{persona.personality}</div>
           </div>

           <div className="bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                 <Coffee size={12} /> 라이프스타일
              </div>
              <div className="text-zinc-900 dark:text-zinc-200 font-semibold text-sm">{persona.lifestyle}</div>
           </div>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm italic mb-6 border-l-2 border-zinc-300 dark:border-zinc-700 pl-3 leading-relaxed">
          "{persona.description}"
        </p>

        <div className="flex flex-wrap gap-2">
          {persona.hashtags.map((tag, i) => (
            <span key={i} className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 px-2 py-1 rounded">
              <Hash size={10} />
              {tag.replace('#', '')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;