import React from 'react';
import { DRIFT_TILES } from '../constants';
import { motion } from 'motion/react';

export default function DriftFeed() {
  return (
    <div className="space-y-12 pb-12">
      <header className="text-center space-y-2">
        <h2 className="font-serif italic text-3xl">Drift</h2>
        <p className="text-xs opacity-50 uppercase tracking-widest">Psychological Mirroring Feed</p>
      </header>

      <div className="space-y-24">
        {DRIFT_TILES.map((tile, index) => (
          <motion.div
            key={tile.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-6"
          >
            {tile.type === 'image' ? (
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[40px] shadow-xl">
                <img
                  src={tile.imageUrl}
                  alt={tile.content}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-line" />
              </div>
            ) : (
              <div className="py-12 px-6 border-y border-line w-full">
                <p className="font-serif text-2xl leading-relaxed italic opacity-80 text-ink">
                  "{tile.content}"
                </p>
              </div>
            )}
            <div className="data-value text-[10px] opacity-30 text-ink">
              TILE_REF_00{tile.id} // MIRROR_MODE_ACTIVE
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-12">
        <div className="inline-block w-1 h-12 bg-line rounded-full animate-bounce" />
        <p className="text-[10px] uppercase tracking-widest opacity-30 mt-4 text-ink">End of Drift</p>
      </div>
    </div>
  );
}
