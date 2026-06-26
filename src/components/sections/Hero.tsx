import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks';
import { stats, techTicker } from '@/data/portfolio';
import type { NavSection } from '@/types';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] },
});

interface Props { onNavigate: (s: NavSection) => void; }

const HERO_METRICS = [
  { label: 'Experience', value: `${stats.years}+`, unit: ' yrs', sub: 'In production' },
  { label: 'Projects Shipped', value: `${stats.projects}+`, unit: '', sub: 'Live in production' },
  { label: 'Components Built', value: `${stats.components}+`, unit: '', sub: 'Across 4 teams' },
  { label: 'Load Reduction', value: `−${stats.loadReduction}`, unit: '%', sub: 'Best result achieved' },
];

export function Hero({ onNavigate }: Props) {
  const typed = useTypewriter();

  return (
    <section id="hero" className="pt-14 min-h-screen flex flex-col justify-center">
      <div className="section-wrap py-20">

        {/* Top — headline + card */}
        <div className="grid lg:grid-cols-[1fr,320px] gap-16 items-start mb-16 pb-16 border-b border-rule">

          {/* Left — headline */}
          <div>
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-3 py-[5px] border border-rule rounded-full">
                <span className="w-[5px] h-[5px] rounded-full bg-sage animate-blink inline-block" />
                <span className="font-mono text-[11px] text-ink-3">Available for new roles · Remote · India</span>
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.2)} className="t-hero text-ink mb-6">
              Frontend<br />
              Engineer<br />
              <span className="t-serif-italic">&amp; Craftsperson.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.35)} className="text-[16px] text-ink-2 leading-[1.75] max-w-[500px] mb-10 font-light">
              I build <strong className="font-medium text-ink">
                <span className="text-gold">{typed || '\u00A0'}</span>
                <span className="inline-block w-[2px] h-[1.1em] bg-gold ml-[2px] align-middle animate-blink" />
              </strong>{' '}
              that perform, scale, and feel inevitable. {stats.years}+ years turning product complexity
              into clean, measurable solutions.
            </motion.p>

            <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-3">
              <button className="btn-ink" onClick={() => onNavigate('projects')}>
                See My Work →
              </button>
              <button className="btn-ring" onClick={() => onNavigate('contact')}>
                Get In Touch
              </button>
            </motion.div>
          </div>

          {/* Right — dark card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="bg-ink rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Monogram */}
            <div className="absolute top-6 right-6 w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
              <span className="font-display font-bold text-[11px] text-ink">KR</span>
            </div>

            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em] mb-6 relative">
              Live Metrics · 2024
            </div>

            {[
              { val: '94', unit: '/100', label: 'Best Lighthouse Score' },
              { val: '−62', unit: '%', label: 'Page Load Reduction' },
              { val: '+34', unit: '%', label: 'Conversion Lift' },
            ].map((m, i) => (
              <div key={m.label} className="relative">
                <div className="mb-5">
                  <div className="font-display font-bold text-[38px] text-white leading-none mb-1">
                    {m.val}<span className="text-[20px] text-gold font-normal">{m.unit}</span>
                  </div>
                  <div className="font-mono text-[10px] text-white/30">{m.label}</div>
                </div>
                {i < 2 && <div className="h-px bg-white/[0.07] mb-5" />}
              </div>
            ))}

            <div className="h-px bg-white/[0.07] mb-5" />
            <div className="flex flex-wrap gap-[5px]">
              {['React 18', 'TypeScript', 'GraphQL', 'Tailwind', 'Magento 2'].map(t => (
                <span key={t} className="px-2 py-[3px] border border-white/10 rounded text-[10px] font-mono text-white/35">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-rule border border-rule rounded-xl overflow-hidden mb-14"
        >
          {HERO_METRICS.map(m => (
            <div key={m.label} className="px-6 py-5 bg-paper hover:bg-gold-dim transition-colors duration-200 cursor-default">
              <div className="font-mono text-[10px] text-ink-4 uppercase tracking-[0.12em] mb-2">{m.label}</div>
              <div className="font-display font-bold text-[30px] text-ink leading-none mb-1">
                {m.value}<span className="text-[16px] font-normal text-ink-3">{m.unit}</span>
              </div>
              <div className="text-[12px] text-ink-3">{m.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="overflow-hidden border-t border-b border-rule py-[13px] -mx-10"
        >
          <div className="ticker-track">
            {[...techTicker, ...techTicker].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-8 font-mono text-[11px] text-ink-3">
                {t}<span className="text-gold text-[16px]">·</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
