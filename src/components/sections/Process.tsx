import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { processPhases } from '@/data/portfolio';

export function Process() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section id="process" ref={ref} className="py-24 border-t border-rule bg-paper-2">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="pb-14 border-b border-rule mb-0">
          <p className="t-eyebrow mb-4">// how I work</p>
          <h2 className="t-display text-ink">My engineering <span className="t-serif-italic">process.</span></h2>
          <p className="text-[15px] text-ink-3 mt-4 max-w-md font-light leading-relaxed">
            Repeatable, defensible, and built around shipping things that work in production — not just in demos.
          </p>
        </motion.div>

        <div className="divide-y divide-rule">
          {processPhases.map((phase, i) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid md:grid-cols-[72px,1fr,1fr] gap-10 py-12 group hover:pl-2 transition-all duration-200"
            >
              <div className="font-display font-bold text-[52px] text-rule leading-none group-hover:text-gold transition-colors duration-300">
                {phase.number}
              </div>
              <div>
                <h3 className="font-display font-bold text-[20px] text-ink mb-3">{phase.title}</h3>
                <p className="text-[14px] text-ink-3 leading-[1.7] mb-5 font-light">{phase.description}</p>
                <blockquote className="text-[13px] italic text-ink-4 border-t border-rule pt-4 leading-[1.6]">"{phase.quote}"</blockquote>
              </div>
              <ul className="space-y-0 divide-y divide-rule">
                {phase.activities.map(a => (
                  <li key={a} className="flex items-start gap-3 py-[10px]">
                    <span className="w-[4px] h-[4px] rounded-full bg-gold mt-[7px] flex-shrink-0" />
                    <span className="text-[13px] text-ink-3 font-light leading-[1.5]">{a}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
