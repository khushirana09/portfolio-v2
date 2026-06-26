export function Footer() {
  return (
    <footer className="border-t border-rule py-7">
      <div className="section-wrap flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center">
            <span className="font-display font-bold text-[10px] text-paper">KR</span>
          </div>
          <span className="font-mono text-[11px] text-ink-4">Khushi Rana · Frontend Developer · India</span>
        </div>
        <span className="font-mono text-[11px] text-ink-4">React · TypeScript · Magento 2 · © 2024</span>
      </div>
    </footer>
  );
}
