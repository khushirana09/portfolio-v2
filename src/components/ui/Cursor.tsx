import { useScrollProgress } from '@/hooks';
import { useEffect, useRef, useState } from 'react';

export function ReadingProgress() {
  const p = useScrollProgress();
  return <div className="progress-bar" style={{ width: `${p}%` }} />;
}

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const rPos = useRef({ x: -200, y: -200 });
  const raf = useRef<number>();
  const [hov, setHov] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 900) return;
    const animate = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.11;
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.11;
      if (dot.current) { dot.current.style.left = `${pos.current.x}px`; dot.current.style.top = `${pos.current.y}px`; }
      if (ring.current) { ring.current.style.left = `${rPos.current.x}px`; ring.current.style.top = `${rPos.current.y}px`; }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    const mv = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const over = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a,button,[data-cursor]')) setHov(true); };
    const out = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a,button,[data-cursor]')) setHov(false); };
    window.addEventListener('mousemove', mv);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); window.removeEventListener('mousemove', mv); document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out); };
  }, []);

  return (
    <>
      <div ref={dot} className="cur-dot" />
      <div ref={ring} className={`cur-ring ${hov ? 'hov' : ''}`} />
    </>
  );
}
