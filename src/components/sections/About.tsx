import { motion } from 'framer-motion';
import { useInView } from '@/hooks';

const values = [
  { n: '01', title: 'Performance is a feature', body: 'Every millisecond is a UX decision. I treat Core Web Vitals as product KPIs, not technical footnotes.' },
  { n: '02', title: 'Code should explain itself', body: 'If your future self needs a comment to understand your logic, the logic needs refactoring. I write for the humans who maintain it next.' },
  { n: '03', title: 'Design and engineering are one', body: "The gap between design intent and implementation is where UX dies. I close that gap by working closely with Figma and product specs." },
];

const timeline = [
  { year: '2021', title: 'First Production React', body: "Joined a digital agency. Shipped 8 client projects in year one. Learned that clean code is a business decision, not an aesthetic one." },
  { year: '2022', title: 'Performance Obsession', body: "Fixed a 6-second search query to 180ms. Became obsessed with Core Web Vitals. Never looked back." },
  { year: '2023', title: 'Led First Design System', body: "Built 60+ components that four teams use daily. The best architecture is the one developers actually follow." },
  { year: '2024', title: 'Headless Commerce at Scale', body: "Led React PWA migration. Load times −62%, conversion +34%. Architecture decisions that compound." },
];

export function About() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section id="about" ref={ref} className="py-24 border-t border-rule">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="pb-14 border-b border-rule mb-16">
          <p className="t-eyebrow mb-5">// about</p>
          <blockquote className="font-serif text-[clamp(1.7rem,3.5vw,3rem)] italic font-normal text-ink leading-[1.2] border-l-[3px] border-gold pl-7">
            "I build the interface between<br />engineering rigour and human delight."
          </blockquote>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,320px] gap-20">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <p className="text-[15px] text-ink-2 leading-[1.8] mb-5 font-light">
              I'm a Frontend Developer based in India with <strong className="font-medium text-ink">3+ years</strong> turning complex product challenges into performant, accessible React applications. My background spans full-stack JavaScript, but my craft lives in the browser.
            </p>
            <p className="text-[15px] text-ink-2 leading-[1.8] mb-12 font-light">
              I've spent these years making <strong className="font-medium text-ink">e-commerce platforms faster</strong>, design systems more consistent, and developer teams more productive. I measure success in milliseconds saved, conversion rates lifted, and engineers who enjoy using the tools I build.
            </p>

            <div className="border-t border-rule pt-10">
              <p className="t-eyebrow mb-7">Engineering Values</p>
              {values.map((v, i) => (
                <motion.div
                  key={v.n}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  className="grid grid-cols-[72px,1fr] gap-6 py-5 border-b border-rule last:border-b-0 hover:pl-2 transition-all duration-200"
                >
                  <span className="font-mono text-[11px] text-gold pt-[3px]">{v.n}</span>
                  <div>
                    <div className="font-display font-semibold text-[14px] text-ink mb-2">{v.title}</div>
                    <div className="text-[13px] text-ink-3 leading-[1.6] font-light">{v.body}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline (sticky) */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="lg:sticky lg:top-20 self-start">
            <p className="t-eyebrow mb-6">Career Timeline</p>
            {timeline.map((t) => (
              <div key={t.year} className="grid grid-cols-[52px,1fr] gap-4 py-5 border-b border-rule last:border-b-0">
                <span className="font-mono text-[11px] text-gold pt-[3px]">{t.year}</span>
                <div>
                  <div className="font-display font-semibold text-[13px] text-ink mb-2">{t.title}</div>
                  <div className="text-[12px] text-ink-3 leading-[1.6] font-light">{t.body}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
