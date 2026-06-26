import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import type { NavSection } from '@/types';

interface Cmd { id: string; label: string; description: string; category: string; action: () => void; }

interface Props { isOpen: boolean; onClose: () => void; onNavigate: (s: NavSection) => void; }

export function CommandPalette({ isOpen, onClose, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const nav = (s: NavSection) => { onNavigate(s); onClose(); };

  const ALL_CMDS: Cmd[] = [
    { id: 'home',       label: 'Home',              description: 'Jump to the top',           category: 'Navigation', action: () => nav('hero') },
    { id: 'projects',   label: 'View Work',          description: 'Case studies & projects',   category: 'Navigation', action: () => nav('projects') },
    { id: 'about',      label: 'About Me',           description: 'My story & values',         category: 'Navigation', action: () => nav('about') },
    { id: 'skills',     label: 'Skills',             description: 'Tech capabilities',         category: 'Navigation', action: () => nav('skills') },
    { id: 'exp',        label: 'Experience',         description: 'Career timeline',           category: 'Navigation', action: () => nav('experience') },
    { id: 'process',    label: 'How I Build',        description: 'My engineering process',    category: 'Navigation', action: () => nav('process') },
    { id: 'rec',        label: 'For Recruiters',     description: 'Quick facts & resume',      category: 'Navigation', action: () => nav('recruiter') },
    { id: 'contact',    label: 'Contact',            description: 'Get in touch',              category: 'Navigation', action: () => nav('contact') },
    { id: 'resume',     label: 'Download Resume',    description: 'Get my CV as PDF',          category: 'Actions',    action: () => { window.open('/resume.pdf', '_blank'); onClose(); } },
    { id: 'github',     label: 'GitHub Profile',     description: 'View open source work',     category: 'Links',      action: () => { window.open('https://github.com/khushirana', '_blank'); onClose(); } },
    { id: 'linkedin',   label: 'LinkedIn',           description: 'Connect professionally',    category: 'Links',      action: () => { window.open('https://linkedin.com/in/khushirana', '_blank'); onClose(); } },
    { id: 'email',      label: 'Send Email',         description: 'khushi@example.com',        category: 'Links',      action: () => { window.location.href = 'mailto:khushi@example.com'; onClose(); } },
  ];

  const filtered = query.trim()
    ? ALL_CMDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase()))
    : ALL_CMDS;

  const grouped = filtered.reduce<Record<string, Cmd[]>>((acc, c) => {
    (acc[c.category] ??= []).push(c); return acc;
  }, {});

  useEffect(() => { if (isOpen) { setQuery(''); setFocused(0); setTimeout(() => inputRef.current?.focus(), 60); } }, [isOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setFocused(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); filtered[focused]?.action(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, focused, filtered]);

  let idx = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 w-full max-w-[520px] mx-4 z-[101]"
          >
            <div className="bg-paper border border-ink rounded-2xl shadow-2xl overflow-hidden"
              style={{ boxShadow: '0 32px 64px rgba(13,13,13,0.25)' }}>
              {/* Search */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-rule">
                <Search size={15} className="text-ink-4 shrink-0" />
                <input
                  ref={inputRef} value={query}
                  onChange={e => { setQuery(e.target.value); setFocused(0); }}
                  placeholder="Search commands…"
                  className="flex-1 bg-transparent text-ink text-[14px] font-body outline-none placeholder-ink-4"
                />
                <kbd className="px-2 py-[3px] border border-rule rounded text-ink-4 text-[11px] font-mono">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-5 py-8 text-center text-ink-4 text-[13px] font-mono">No results for "{query}"</div>
                ) : (
                  Object.entries(grouped).map(([cat, items]) => (
                    <div key={cat}>
                      <div className="px-5 py-2 text-[10px] font-mono text-ink-4 uppercase tracking-widest">{cat}</div>
                      {items.map(cmd => {
                        const current = idx++;
                        const isOn = current === focused;
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setFocused(current)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors duration-100 ${isOn ? 'bg-paper-2' : ''}`}
                          >
                            <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-[12px] transition-colors ${isOn ? 'bg-ink border-ink text-paper' : 'border-rule text-ink-3'}`}>
                              →
                            </div>
                            <div className="flex-1">
                              <div className="text-ink text-[13px] font-medium font-display">{cmd.label}</div>
                              <div className="text-ink-4 text-[11px] font-mono">{cmd.description}</div>
                            </div>
                            {isOn && <ArrowRight size={13} className="text-gold" />}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-rule flex gap-4 text-[10px] font-mono text-ink-4">
                <span>↑↓ navigate</span><span>↵ select</span><span>esc close</span>
                <span className="ml-auto">⌘K to open</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
