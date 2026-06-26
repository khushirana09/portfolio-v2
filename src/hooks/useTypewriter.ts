import { useState, useEffect, useRef } from 'react';
const WORDS = ['React Applications', 'Design Systems', 'E-commerce Platforms', 'UI Architectures', 'Performance Solutions'];

export function useTypewriter() {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const target = WORDS[wordIdx];
    if (!deleting && text === target) {
      t.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIdx(i => (i + 1) % WORDS.length);
    } else {
      t.current = setTimeout(() => {
        setText(prev => deleting ? prev.slice(0, -1) : target.slice(0, prev.length + 1));
      }, deleting ? 42 : 88);
    }
    return () => clearTimeout(t.current);
  }, [text, deleting, wordIdx]);

  return text;
}
