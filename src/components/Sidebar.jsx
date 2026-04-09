const CATEGORIES = [
  { id: 'all', icon: '🗂️' },
  { id: 'work', icon: '💼' },
  { id: 'creative', icon: '🎨' },
  { id: 'technical', icon: '⚙️' },
  { id: 'learning', icon: '📚' },
  { id: 'other', icon: '📌' },
];

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  promptCounts,
  locale,
  locales,
  messages,
  onLocaleChange,
}) {
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="px-5 py-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">PGen</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">{messages.sidebarTitle}</p>

        <div className="mt-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
            {messages.languageHeading}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {locales.map((item) => {
              const isActive = item.id === locale;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onLocaleChange(item.id)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'border-violet-300 bg-violet-50 text-violet-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-2 mb-3">
          {messages.categoryHeading}
        </p>
        {CATEGORIES.map((cat) => {
          const count = promptCounts[cat.id] ?? 0;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{cat.icon}</span>
                {messages.categories[cat.id] ?? cat.id}
              </span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-violet-200 text-violet-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-slate-200">
        <p className="text-xs text-slate-400">
          {messages.totalPrompts(promptCounts.all ?? 0)}
        </p>
      </div>
    </aside>
  );
}
