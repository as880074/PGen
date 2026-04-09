import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import AddPromptForm from './components/AddPromptForm';
import SkillCollectionPage from './components/SkillCollectionPage';
import {
  DEFAULT_LOCALE,
  LOCALES,
  getCategoryLabel,
  getLocalizedPrompt,
  getMessages,
} from './i18n';

const PROMPTS_JSON_PATH = `${import.meta.env.BASE_URL}prompts.json`;
const SKILLS_JSON_PATH = `${import.meta.env.BASE_URL}skills.json`;

function getNextPromptId(promptList) {
  if (promptList.length === 0) {
    return 1;
  }

  return Math.max(...promptList.map((prompt) => Number(prompt.id) || 0)) + 1;
}

export default function App() {
  const [prompts, setPrompts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [activePage, setActivePage] = useState('prompts');
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);
  const [hasLoadPromptsError, setHasLoadPromptsError] = useState(false);
  const [skills, setSkills] = useState([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [hasLoadSkillsError, setHasLoadSkillsError] = useState(false);

  const messages = useMemo(() => getMessages(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    let isActive = true;

    async function loadPrompts() {
      try {
        setIsLoadingPrompts(true);
        setHasLoadPromptsError(false);

        const response = await fetch(PROMPTS_JSON_PATH);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid prompt JSON format');
        }

        if (isActive) {
          setPrompts(data);
        }
      } catch {
        if (isActive) {
          setHasLoadPromptsError(true);
          setPrompts([]);
        }
      } finally {
        if (isActive) {
          setIsLoadingPrompts(false);
        }
      }
    }

    loadPrompts();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadSkills() {
      try {
        setIsLoadingSkills(true);
        setHasLoadSkillsError(false);

        const response = await fetch(SKILLS_JSON_PATH);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid skill JSON format');
        }

        if (isActive) {
          setSkills(data);
        }
      } catch {
        if (isActive) {
          setHasLoadSkillsError(true);
          setSkills([]);
        }
      } finally {
        if (isActive) {
          setIsLoadingSkills(false);
        }
      }
    }

    loadSkills();

    return () => {
      isActive = false;
    };
  }, []);

  const localizedPrompts = useMemo(
    () => prompts.map((prompt) => getLocalizedPrompt(prompt, locale)),
    [locale, prompts],
  );

  const promptCounts = useMemo(() => {
    const counts = { all: prompts.length };
    prompts.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    return localizedPrompts.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q || p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [localizedPrompts, activeCategory, search]);

  const handleAdd = (newPrompt) => {
    setPrompts((prev) => [
      {
        ...newPrompt,
        id: getNextPromptId(prev),
        type: 'custom',
      },
      ...prev,
    ]);
  };

  const handleDelete = (id) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-700">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        promptCounts={promptCounts}
        locale={locale}
        locales={LOCALES}
        messages={messages}
        onLocaleChange={setLocale}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 px-8 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {activePage === 'prompts'
                ? getCategoryLabel(locale, activeCategory)
                : messages.skillCollectionPageTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {activePage === 'prompts'
                ? messages.countSummary(filteredPrompts.length, Boolean(search))
                : messages.skillCollectionPageSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 w-full max-w-md justify-end">
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setActivePage('prompts')}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activePage === 'prompts'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {messages.promptLibraryTab}
              </button>
              <button
                type="button"
                onClick={() => setActivePage('skills')}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activePage === 'skills'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {messages.skillCollectionTab}
              </button>
            </div>

            {activePage === 'prompts' ? (
              <div className="relative max-w-xs w-full">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={messages.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-slate-50 placeholder:text-slate-300"
                />
              </div>
            ) : null}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
          {activePage === 'skills' ? (
            isLoadingSkills ? (
              <div className="text-center py-24 text-slate-400">
                <p className="font-medium">{messages.loadingSkills}</p>
              </div>
            ) : hasLoadSkillsError ? (
              <div className="text-center py-24 text-red-500">
                <p className="font-medium">{messages.loadSkillsFailed}</p>
              </div>
            ) : skills.length === 0 ? (
              <div className="text-center py-24 text-slate-400">
                <p className="font-medium">{messages.emptySkillsTitle}</p>
                <p className="text-sm mt-1">{messages.emptySkillsSubtitle}</p>
              </div>
            ) : (
              <SkillCollectionPage locale={locale} skills={skills} />
            )
          ) : (
            <>
              <AddPromptForm
                categoryLabels={messages.categories}
                messages={messages}
                onAdd={handleAdd}
              />

              {isLoadingPrompts ? (
                <div className="text-center py-24 text-slate-400">
                  <p className="font-medium">{messages.loadingPrompts}</p>
                </div>
              ) : hasLoadPromptsError ? (
                <div className="text-center py-24 text-red-500">
                  <p className="font-medium">{messages.loadPromptsFailed}</p>
                </div>
              ) : filteredPrompts.length === 0 ? (
                <div className="text-center py-24 text-slate-400">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="font-medium">{messages.emptyTitle}</p>
                  <p className="text-sm mt-1">{messages.emptySubtitle}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredPrompts.map((prompt) => (
                    <PromptCard
                      categoryLabel={getCategoryLabel(locale, prompt.category)}
                      copyLabel={messages.copyLabel}
                      copiedLabel={messages.copiedLabel}
                      deleteTitle={messages.deletePromptTitle}
                      key={prompt.id}
                      prompt={prompt}
                      onDelete={() => handleDelete(prompt.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
