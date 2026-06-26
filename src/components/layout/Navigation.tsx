import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { NavSection } from '@/types';

const LINKS: { label: string; id: NavSection }[] = [
  { label: 'Work', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Process', id: 'process' },
  { label: 'Recruiters', id: 'recruiter' },
];

interface Props {
  active: NavSection;
  onNavigate: (s: NavSection) => void;
  onCmdOpen: () => void;
}

export function Navigation({ active, onNavigate, onCmdOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const nav = (id: NavSection) => { onNavigate(id); setMobileOpen(false); };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-paper/95 backdrop-blur-xl border-b border-rule shadow-sm shadow-black/[0.04]' : 'bg-paper/90 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-[1080px] mx-auto px-10 h-14 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => nav('hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center group-hover:bg-gold transition-colors duration-200">
              <span className="font-display font-bold text-[11px] text-paper tracking-wider">KR</span>
            </div>
            <span className="font-display font-semibold text-[14px] text-ink hidden sm:block">Khushi Rana</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => nav(l.id)}
                className={`px-3 py-2 rounded-lg text-[13px] transition-colors duration-150 font-body ${
                  active === l.id
                    ? 'text-ink font-medium bg-paper-2'
                    : 'text-ink-3 hover:text-ink hover:bg-paper-2'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCmdOpen}
              className="hidden md:flex items-center gap-2 px-3 py-[7px] border border-rule rounded-lg font-mono text-[11px] text-ink-3 hover:border-gold hover:text-gold transition-colors duration-150"
            >
              <span>⌘K</span>
            </button>
            <button
              onClick={() => nav('contact')}
              className="btn-ink text-[13px] px-4 py-2 hidden sm:flex"
            >
              Hire Me →
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-rule text-ink-3"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-14 left-3 right-3 z-40 bg-paper border border-rule rounded-xl shadow-xl p-3 md:hidden"
          >
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => nav(l.id)}
                className="w-full text-left px-4 py-3 rounded-lg text-[14px] text-ink-2 hover:text-ink hover:bg-paper-2 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-rule">
              <button onClick={() => nav('contact')} className="btn-ink w-full justify-center text-[13px]">
                Get in Touch →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
