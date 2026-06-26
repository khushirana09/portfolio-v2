import { useState, lazy, Suspense } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ReadingProgress, CustomCursor } from '@/components/ui/Cursor';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { Hero } from '@/components/sections/Hero';
import { useCommandPalette } from '@/hooks';
import type { NavSection } from '@/types';

const Projects    = lazy(() => import('@/components/sections/Projects').then(m => ({ default: m.Projects })));
const About       = lazy(() => import('@/components/sections/About').then(m => ({ default: m.About })));
const Skills      = lazy(() => import('@/components/sections/Skills').then(m => ({ default: m.Skills })));
const Experience  = lazy(() => import('@/components/sections/Experience').then(m => ({ default: m.Experience })));
const Process     = lazy(() => import('@/components/sections/Process').then(m => ({ default: m.Process })));
const Recruiter   = lazy(() => import('@/components/sections/Recruiter').then(m => ({ default: m.Recruiter })));
const Contact     = lazy(() => import('@/components/sections/Contact').then(m => ({ default: m.Contact })));

function Skeleton() {
  return (
    <div className="py-24 section-wrap">
      <div className="h-3 w-20 bg-rule rounded-full mb-6 animate-pulse" />
      <div className="h-12 w-64 bg-paper-2 rounded-xl mb-4 animate-pulse" />
      <div className="h-8 w-96 bg-paper-2 rounded-xl animate-pulse" />
    </div>
  );
}

export function App() {
  const [section, setSection] = useState<NavSection>('hero');
  const { isOpen, open, close } = useCommandPalette();

  const navigate = (s: NavSection) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSection = () => {
    switch (section) {
      case 'hero':       return <Hero onNavigate={navigate} />;
      case 'projects':   return <Suspense fallback={<Skeleton />}><Projects /></Suspense>;
      case 'about':      return <Suspense fallback={<Skeleton />}><About /></Suspense>;
      case 'skills':     return <Suspense fallback={<Skeleton />}><Skills /></Suspense>;
      case 'experience': return <Suspense fallback={<Skeleton />}><Experience /></Suspense>;
      case 'process':    return <Suspense fallback={<Skeleton />}><Process /></Suspense>;
      case 'recruiter':  return <Suspense fallback={<Skeleton />}><Recruiter onNavigate={navigate} /></Suspense>;
      case 'contact':    return <Suspense fallback={<Skeleton />}><Contact /></Suspense>;
      default:           return <Hero onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <ReadingProgress />
      <CustomCursor />
      <Navigation active={section} onNavigate={navigate} onCmdOpen={open} />
      <CommandPalette isOpen={isOpen} onClose={close} onNavigate={navigate} />
      <main>{renderSection()}</main>
      <Footer />
    </div>
  );
}
