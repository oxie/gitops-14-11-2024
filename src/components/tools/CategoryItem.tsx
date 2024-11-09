import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Terminal, FolderTree } from 'lucide-react';

interface CategoryItemProps {
  item: {
    name: string;
    description: string;
    command?: string;
    tags?: string[];
  };
}

const CategoryItem = memo(function CategoryItem({ item }: CategoryItemProps) {
  return (
    <motion.div 
      className="group relative bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative p-4 h-full">
        {/* Terminal window styling */}
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="text-xs text-slate-400 font-mono">~/services/{item.name.toLowerCase()}</div>
          </div>
          <Terminal className="h-3.5 w-3.5 text-slate-500" />
        </div>
        
        {/* Content */}
        <div className="space-y-2 font-mono">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gold-500/70">$</span>
            <span className="text-slate-300">tree .</span>
          </div>

          <div className="pl-4 text-sm">
            <div className="flex items-center space-x-2">
              <FolderTree className="h-4 w-4 text-gold-400" />
              <span className="text-gold-400">{item.name}</span>
            </div>
            
            <div className="pl-6 pt-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-slate-500">├── </span>
                <span className="text-slate-300">{item.description}</span>
              </div>
              
              {item.command && (
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">├── </span>
                  <span className="text-green-400">cmd:</span>
                  <span className="text-slate-300">{item.command}</span>
                </div>
              )}
              
              {item.tags && (
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">└── </span>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] text-gold-400"
                      >
                        [{tag}]
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm pt-2">
            <span className="text-gold-500/70">$</span>
            <span className="text-slate-300">_</span>
          </div>
        </div>

        {/* Terminal window effects */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
});

export default CategoryItem;