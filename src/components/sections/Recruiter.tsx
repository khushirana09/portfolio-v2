import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { CheckCircle2, Download, Mail, Linkedin } from 'lucide-react';
import type { NavSection } from '@/types';

const FACTS = [
  { label: 'Availability', value: 'Immediate', green: true },
  { label: 'Work Type', value: 'Remote / Hybrid', green: false },
  { label: 'Experience', value: '3+ Yrs Frontend', green: false },
  { label: 'Timezone', value: 'IST · UTC+5:30', green: false },
];

const HIGHLIGHTS = [
  'Led headless React/GraphQL migration → load times −62%, conversion +34%',
  'Built 60+ component design system adopted by 4 product teams',
  'Improved Lighthouse score from 41 to 94 through systematic audits',
  'Reduced product search from 6s to 180ms for a 500K+ SKU catalog',
  'Introduced TypeScript across frontend, cutting runtime errors by 45%',
];

const ROLES = ['Frontend Engineer', 'Senior React Dev', 'UI Engineer', 'Full-stack JS', 'Frontend Architect'];

interface Props { onNavigate: (s: NavSection) => void; }

export function Recruiter({ onNavigate }: Props) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section id="recruiter" ref={ref} className="py-24 border-t border-rule">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="pb-14 border-b border-rule mb-16">
          <p className="t-eyebrow mb-4">// for hiring managers</p>
          <h2 className="t-display text-ink">The TL;DR <span className="t-serif-italic">you need.</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,280px] gap-12">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {FACTS.map(f => (
                <div key={f.label} className="p-4 bg-paper-2 border border-rule rounded-xl">
                  <div className="font-mono text-[9px] text-ink-4 uppercase tracking-[0.12em] mb-2">{f.label}</div>
                  <div className={`font-display font-semibold text-[15px] ${f.green ? 'text-sage' : 'text-ink'}`}>{f.value}</div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="border border-rule rounded-2xl overflow-hidden mb-8">
              <div className="px-6 py-4 bg-ink">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.15em]">Career Highlights</span>
              </div>
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-4 border-b border-rule last:border-b-0 hover:bg-gold-dim transition-colors">
                  <CheckCircle2 size={14} className="text-sage mt-[2px] shrink-0" />
                  <span className="text-[13px] text-ink-2 leading-[1.55] font-light">{h}</span>
                </div>
              ))}
            </div>

            {/* Open to */}
            <div>
              <div className="font-mono text-[10px] text-ink-4 uppercase tracking-[0.15em] mb-4">Open to roles</div>
              <div className="flex flex-wrap gap-2">
                {ROLES.map(r => (
                  <span key={r} className="px-3 py-2 border border-ink text-ink font-display font-medium text-[13px] rounded-lg hover:bg-ink hover:text-paper transition-all duration-150 cursor-default">{r}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="space-y-3">
            <div className="bg-ink rounded-2xl p-7">
              <div className="font-display font-bold text-[34px] text-white leading-[1] mb-2">Khushi<br />Rana</div>
              <div className="text-[13px] text-white/40 mb-1">Frontend Developer</div>
              <div className="font-mono text-[11px] text-white/25 mb-7">3+ Years · India · Remote-first</div>

              <button className="w-full flex items-center justify-center gap-2 py-[11px] bg-gold text-ink font-display font-semibold text-[13px] rounded-xl mb-2 hover:opacity-90 transition-opacity">
                <Download size={14} /> Download Resume
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full flex items-center justify-center gap-2 py-[10px] border border-white/15 text-white/60 font-display font-medium text-[13px] rounded-xl mb-2 hover:border-white/30 hover:text-white transition-all"
              >
                <Mail size={14} /> Email Me
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-[10px] border border-white/15 text-white/60 font-display font-medium text-[13px] rounded-xl hover:border-white/30 hover:text-white transition-all">
                <Linkedin size={14} /> LinkedIn
              </button>

              <div className="flex items-center gap-2 mt-5 pt-5 border-t border-white/[0.07]">
                <span className="w-[5px] h-[5px] rounded-full bg-sage animate-blink inline-block" />
                <span className="font-mono text-[11px] text-white/25">Active · Replies within 24h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
