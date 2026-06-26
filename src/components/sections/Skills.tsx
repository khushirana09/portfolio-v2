import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks';
import { skills } from '@/data/portfolio';

const CATS = ['All', 'Frontend', 'Architecture', 'Performance', 'Backend', 'Design', 'Collaboration'];

function SkillRow({ skill, delay }: { skill: typeof skills[0]; delay: number }) {
  const { ref, inView } = useInView<HTMLTableRowElement>(0.05);
  return (
    <tr ref={ref} className="border-b border-rule hover:bg-gold-dim transition-colors duration-150 group">
      <td className="py-4 pr-6 pl-0">
        <span className="font-display font-medium text-[14px] text-ink">{skill.name}</span>
      </td>
      <td className="py-4 pr-6">
        <span className="pill">{skill.category}</span>
      </td>
      <td className="py-4 pr-6 w-40">
        <div className="h-[3px] bg-rule rounded-full overflow-hidden w-full">
          <motion.div
            className="sk-fill"
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.1, delay, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>
      </td>
      <td className="py-4 pr-6">
        <span className="font-mono text-[12px] text-ink-3">{skill.level}%</span>
      </td>
      <td className="py-4 text-right">
        <span className="font-mono text-[11px] text-ink-4">{skill.experience}</span>
      </td>
    </tr>
  );
}

export function Skills() {
  const { ref, inView } = useInView<HTMLElement>();
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All' ? skills : skills.filter(s => s.category === cat);

  return (
    <section id="skills" ref={ref} className="py-24 border-t border-rule bg-paper-2">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="pb-14 border-b border-rule mb-12">
          <p className="t-eyebrow mb-4">// capabilities</p>
          <h2 className="t-display text-ink">Skills &amp; <span className="t-serif-italic">expertise.</span></h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 mb-10">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-[6px] border rounded-lg font-mono text-[11px] transition-all duration-150 ${cat === c ? 'bg-ink text-paper border-ink' : 'border-rule text-ink-3 hover:border-ink-3 hover:text-ink'}`}>
              {c}
            </button>
          ))}
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-rule">
                {['Skill', 'Category', 'Proficiency', '', 'Experience'].map(h => (
                  <th key={h} className="text-left py-3 font-mono text-[10px] text-ink-4 uppercase tracking-[0.15em] font-normal pb-3 first:pl-0 last:text-right pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={cat}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filtered.map((s, i) => <SkillRow key={s.name} skill={s} delay={i * 0.04} />)}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        <p className="text-center font-mono text-[11px] text-ink-4 mt-10">Percentages reflect confidence &amp; practical experience, not years alone.</p>
      </div>
    </section>
  );
}
