import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { experiences } from '@/data/portfolio';
import { CheckCircle2 } from 'lucide-react';

export function Experience() {
  const { ref, inView } = useInView<HTMLElement>();
  const [active, setActive] = useState(experiences[0].id);
  const exp = experiences.find(e => e.id === active) ?? experiences[0];

  return (
    <section id="experience" ref={ref} className="py-24 border-t border-rule">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="pb-14 border-b border-rule mb-16">
          <p className="t-eyebrow mb-4">// experience</p>
          <h2 className="t-display text-ink">Where I've made <span className="t-serif-italic">impact.</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-[200px,1fr] gap-12">
          {/* Tabs */}
          <div className="flex flex-row lg:flex-col gap-2">
            {experiences.map((e, i) => (
              <motion.button
                key={e.id}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => setActive(e.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 w-full lg:w-auto ${
                  active === e.id ? 'border-ink bg-paper' : 'border-rule hover:border-ink-4 bg-transparent'
                }`}
              >
                <div className="font-display font-semibold text-[13px] text-ink mb-1">{e.company}</div>
                <div className="font-mono text-[10px] text-ink-4">{e.period}</div>
              </motion.button>
            ))}
          </div>

          {/* Panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-paper border border-rule rounded-2xl p-10"
          >
            <div className="flex items-start justify-between mb-7">
              <div>
                <h3 className="font-display font-bold text-[22px] text-ink mb-1">{exp.role}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-ink-3 text-[14px]">{exp.company}</span>
                  <span className="pill">{exp.type}</span>
                  <span className="font-mono text-[11px] text-gold">{exp.duration}</span>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="px-5 py-4 border-l-[3px] border-gold bg-gold-dim rounded-r-xl mb-7">
              <div className="font-mono text-[9px] text-gold uppercase tracking-[0.15em] mb-2">Key Impact</div>
              <div className="font-medium text-[14px] text-ink">{exp.impact}</div>
            </div>

            <p className="text-[14px] text-ink-2 leading-[1.75] mb-7 font-light">{exp.description}</p>

            <div className="font-mono text-[10px] text-ink-4 uppercase tracking-[0.15em] mb-5">Achievements</div>
            <ul className="divide-y divide-rule mb-7">
              {exp.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-3 py-[11px]">
                  <CheckCircle2 size={14} className="text-sage mt-[3px] shrink-0" />
                  <span className="text-[13px] text-ink-2 leading-[1.6] font-light">{a}</span>
                </li>
              ))}
            </ul>

            <div className="font-mono text-[10px] text-ink-4 uppercase tracking-[0.15em] mb-4">Technologies</div>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map(t => <span key={t} className="pill">{t}</span>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
