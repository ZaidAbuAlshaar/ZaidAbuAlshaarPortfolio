// Shared form primitives for the admin panels.

export const inputCls =
  'w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors';

export const Field = ({
  label, hint, children,
}: {
  label: string; hint?: string; children: React.ReactNode;
}) => (
  <label className="block space-y-1">
    <span className="text-xs font-medium text-zinc-400">
      {label}
      {hint && <span className="text-zinc-600"> · {hint}</span>}
    </span>
    {children}
  </label>
);

export const Bilingual = ({
  label, en, ar, onEn, onAr, textarea,
}: {
  label: string; en: string; ar: string;
  onEn: (v: string) => void; onAr: (v: string) => void; textarea?: boolean;
}) => (
  <div className="grid sm:grid-cols-2 gap-3">
    <Field label={`${label} (EN)`}>
      {textarea ? (
        <textarea value={en} onChange={(e) => onEn(e.target.value)} rows={3} className={inputCls} dir="ltr" />
      ) : (
        <input value={en} onChange={(e) => onEn(e.target.value)} className={inputCls} dir="ltr" />
      )}
    </Field>
    <Field label={`${label} (AR)`}>
      {textarea ? (
        <textarea value={ar} onChange={(e) => onAr(e.target.value)} rows={3} className={inputCls} dir="rtl" />
      ) : (
        <input value={ar} onChange={(e) => onAr(e.target.value)} className={inputCls} dir="rtl" />
      )}
    </Field>
  </div>
);
