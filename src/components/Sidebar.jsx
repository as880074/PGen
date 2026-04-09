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
  isOpen,
}) {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 transform lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="px-6 py-8 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
            <span className="text-xl" role="img" aria-label="Sparkles">✨</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">PGen</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{messages.sidebarTitle}</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
            {messages.languageHeading}
          </p>
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
            {locales.map((item) => {
              const isActive = item.id === locale;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onLocaleChange(item.id)}
                  className={`rounded-lg px-2 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-violet-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-3 mb-4">
          {messages.categoryHeading}
        </p>
        {CATEGORIES.map((cat) => {
          const count = promptCounts[cat.id] ?? 0;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg opacity-80" role="img" aria-label={cat.id}>{cat.icon}</span>
                {messages.categories[cat.id] ?? cat.id}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-lg font-black transition-colors ${
                  isActive
                    ? 'bg-violet-200 text-violet-700'
                    : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-slate-100 bg-slate-50/50">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {messages.totalPrompts(promptCounts.all ?? 0)}
        </p>
      </div>
    </aside>
  );
}
