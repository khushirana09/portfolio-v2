import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks';
import { projects } from '@/data/portfolio';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '@/types';

const CATS = ['All', 'E-commerce', 'SaaS', 'Architecture', 'Performance'] as const;
const CAT_MAP: Record<string, string> = { 'E-commerce': 'ecommerce', 'SaaS': 'saas', 'Architecture': 'architecture', 'Performance': 'performance' };

function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-ink/50 backdrop-blur-md z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="bg-paper border border-rule rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-paper border-b border-rule px-8 py-5 flex items-center justify-between">
          <div>
            <div className="font-display font-bold text-[18px] text-ink">{p.title}</div>
            <div className="font-mono text-[11px] text-ink-4">{p.year} · {p.duration}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-rule bg-paper-2 flex items-center justify-center text-ink-3 hover:bg-ink hover:text-paper hover:border-ink transition-all">
            <X size={14} />
          </button>
        </div>

        <div className="p-8">
          <p className="text-[15px] text-ink-2 leading-[1.75] mb-8 font-light">{p.tagline}</p>

          {/* Metrics */}
          <div className="grid grid-cols-4 divide-x divide-rule border border-rule rounded-xl overflow-hidden mb-8">
            {p.metrics.map(m => (
              <div key={m.label} className="px-4 py-4 text-center bg-paper">
                <div className="font-display font-bold text-[20px] text-ink mb-1">{m.value}</div>
                <div className="font-mono text-[9px] text-ink-4 uppercase tracking-[0.1em]">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Sections */}
          {[
            { icon: '◈', label: 'The Problem', content: p.problem },
            { icon: '◉', label: 'My Role', content: p.role },
            { icon: '◫', label: 'Architecture', content: p.architecture },
          ].map(s => (
            <div key={s.label} className="mb-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gold text-[14px]">{s.icon}</span>
                <h4 className="font-display font-semibold text-[13px] text-ink">{s.label}</h4>
              </div>
              <p className="text-[13px] text-ink-2 leading-[1.75] pl-6 font-light">{s.content}</p>
            </div>
          ))}

          {/* Results */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sage text-[14px]">◆</span>
              <h4 className="font-display font-semibold text-[13px] text-ink">Business Impact</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 pl-6">
              {p.results.map(r => (
                <div key={r.label} className="flex items-center justify-between px-3 py-2.5 bg-paper-2 rounded-lg border border-rule">
                  <span className="font-mono text-[10px] text-ink-3">{r.label}</span>
                  <span className="font-mono text-[11px] font-semibold text-sage">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <h4 className="font-display font-semibold text-[13px] text-ink mb-3">Stack</h4>
            <div className="flex flex-wrap gap-2">
              {p.stack.map(t => <span key={t} className="pill">{t}</span>)}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { ref, inView } = useInView<HTMLElement>();
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = cat === 'All' ? projects : projects.filter(p => p.category === CAT_MAP[cat]);
  const [featured, ...rest] = filtered;

  return (
    <section id="projects" ref={ref} className="py-24">
      <div className="section-wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="pb-14 border-b border-rule mb-12"
        >
          <p className="t-eyebrow mb-4">// selected work</p>
          <h2 className="t-display text-ink">
            Products I've built<br /><span className="t-serif-italic">&amp; shipped.</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-[6px] border rounded-lg font-mono text-[11px] transition-all duration-150 ${
                cat === c ? 'bg-ink text-paper border-ink' : 'border-rule text-ink-3 hover:border-ink-3 hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Featured project */}
        <AnimatePresence mode="popLayout">
          {featured && (
            <motion.div
              key={featured.id + '-feat'}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelected(featured)}
              className="grid md:grid-cols-2 border border-rule rounded-2xl overflow-hidden mb-5 cursor-pointer group hover:border-ink transition-all duration-200"
            >
              {/* Left */}
              <div className="p-10 bg-paper">
                <div className="font-mono text-[10px] text-ink-4 tracking-widest uppercase mb-6">
                  Featured · {featured.year} · {featured.duration}
                </div>
                <h3 className="font-display font-bold text-[26px] text-ink leading-tight mb-3">{featured.title}</h3>
                <p className="text-[13px] text-ink-3 leading-[1.65] mb-6">{featured.tagline}</p>
                <div className="inline-flex items-center gap-2 px-3 py-2 bg-gold-dim border border-gold/30 rounded-lg mb-6">
                  <span className="text-gold text-[12px]">⚡</span>
                  <span className="font-mono text-[11px] text-ink-2">
                    {featured.results[0].label}: <strong className="text-ink">{featured.results[0].value}</strong>
                  </span>
                </div>
                <div className="flex flex-wrap gap-[5px]">
                  {featured.stack.slice(0, 5).map(t => <span key={t} className="pill">{t}</span>)}
                </div>
              </div>
              {/* Right */}
              <div className="bg-ink p-10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.035]"
                  style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/30 group-hover:border-gold group-hover:text-gold transition-colors text-[16px]">
                  <ArrowUpRight size={16} />
                </div>
                {featured.metrics.slice(0, 3).map((m, i) => (
                  <div key={m.label} className="relative mb-7">
                    <div className="font-display font-bold text-[34px] text-white leading-none mb-1">{m.value}</div>
                    <div className="font-mono text-[10px] text-white/30">{m.label}</div>
                    {i < 2 && <div className="h-px bg-white/[0.07] mt-6" />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {rest.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                onClick={() => setSelected(p)}
                className="border border-rule rounded-xl p-6 cursor-pointer group hover:border-ink bg-paper transition-all duration-200"
              >
                <div className="font-mono text-[10px] text-ink-4 tracking-widest uppercase mb-4">
                  {String(i + 2).padStart(2, '0')} · {p.year}
                </div>
                <h3 className="font-display font-bold text-[17px] text-ink mb-2 leading-tight">{p.title}</h3>
                <p className="text-[12px] text-ink-3 leading-[1.6] mb-4">{p.tagline}</p>
                <div className="font-mono text-[12px] text-sage font-medium mb-4">{p.results[0].value} {p.results[0].label}</div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-[4px]">
                    {p.stack.slice(0, 3).map(t => <span key={t} className="pill">{t}</span>)}
                  </div>
                  <ArrowUpRight size={14} className="text-ink-4 group-hover:text-gold transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
