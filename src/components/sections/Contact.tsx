import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks';
import { Github, Linkedin, Mail, ArrowUpRight, Send } from 'lucide-react';

const SOCIALS = [
  { icon: <Github size={17} />, name: 'GitHub', handle: '@khushirana', href: 'https://github.com/khushirana' },
  { icon: <Linkedin size={17} />, name: 'LinkedIn', handle: 'Khushi Rana', href: 'https://linkedin.com/in/khushirana' },
  { icon: <Mail size={17} />, name: 'Email', handle: 'khushi@example.com', href: 'mailto:khushi@example.com' },
];

export function Contact() {
  const { ref, inView } = useInView<HTMLElement>();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:khushi@example.com?subject=Portfolio Contact: ${form.name}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`;
    setSent(true);
  };

  return (
    <section id="contact" ref={ref} className="py-24 border-t border-rule bg-paper-2">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="pb-14 border-b border-rule mb-16">
          <p className="t-eyebrow mb-4">// let's talk</p>
          <h2 className="t-display text-ink">Start a <span className="t-serif-italic">conversation.</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            {sent ? (
              <div className="bg-paper border border-rule rounded-2xl p-16 text-center">
                <div className="w-14 h-14 rounded-xl bg-ink flex items-center justify-center mx-auto mb-5">
                  <Send size={22} className="text-paper" />
                </div>
                <div className="font-display font-bold text-[22px] text-ink mb-2">Sent!</div>
                <p className="text-ink-3 text-[14px]">I'll reply within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-6 btn-ring text-[13px] px-4 py-2">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-paper border border-rule rounded-2xl p-8">
                <div className="mb-5">
                  <label className="block font-mono text-[10px] text-ink-4 uppercase tracking-[0.12em] mb-2" htmlFor="c-name">Your name</label>
                  <input id="c-name" required value={form.name} onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full bg-paper-2 border border-rule rounded-lg px-4 py-3 text-ink text-[14px] font-body outline-none focus:border-gold transition-colors placeholder-ink-4" />
                </div>
                <div className="mb-5">
                  <label className="block font-mono text-[10px] text-ink-4 uppercase tracking-[0.12em] mb-2" htmlFor="c-email">Email address</label>
                  <input id="c-email" type="email" required value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                    placeholder="jane@company.com"
                    className="w-full bg-paper-2 border border-rule rounded-lg px-4 py-3 text-ink text-[14px] font-body outline-none focus:border-gold transition-colors placeholder-ink-4" />
                </div>
                <div className="mb-6">
                  <label className="block font-mono text-[10px] text-ink-4 uppercase tracking-[0.12em] mb-2" htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" required rows={5} value={form.message} onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                    placeholder="Tell me about the role or project you have in mind..."
                    className="w-full bg-paper-2 border border-rule rounded-lg px-4 py-3 text-ink text-[14px] font-body outline-none focus:border-gold transition-colors placeholder-ink-4 resize-none" />
                </div>
                <button type="submit" className="btn-ink w-full justify-center">
                  <Send size={14} /> Send Message →
                </button>
              </form>
            )}
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <p className="text-[16px] text-ink-2 leading-[1.8] font-light mb-10">
              Whether you have a role in mind, a product to build, or just want to talk React architecture — I'd love to hear from you.
            </p>
            <div className="divide-y divide-rule mb-10">
              {SOCIALS.map(s => (
                <a key={s.name} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  className="flex items-center justify-between py-5 group hover:pl-2 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl border border-rule bg-paper flex items-center justify-center text-ink-3 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all duration-150">
                      {s.icon}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-[15px] text-ink">{s.name}</div>
                      <div className="font-mono text-[11px] text-ink-4">{s.handle}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-ink-4 group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Closing quote */}
        <div className="bg-ink rounded-2xl p-16 text-center">
          <blockquote className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] italic text-white leading-[1.35] mb-5">
            "I love what I do. I care about the craft.<br />And I'm always looking for teams that feel the same way."
          </blockquote>
          <div className="font-display font-semibold text-[15px] text-white/40">— Khushi Rana, Frontend Developer</div>
        </div>
      </div>
    </section>
  );
}
