import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import AddPromptForm from './components/AddPromptForm';
import SkillCollectionPage from './components/SkillCollectionPage';
import BMADWorkshop from './components/BMADWorkshop';
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

function slugifySkillId(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const messages = useMemo(() => getMessages(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Load initial prompts
  useEffect(() => {
    let isActive = true;

    async function loadPrompts() {
      try {
        setIsLoadingPrompts(true);
        setHasLoadPromptsError(false);

        // Check localStorage first
        const localData = localStorage.getItem('pgen_prompts');
        if (localData) {
          setPrompts(JSON.parse(localData));
          setIsLoadingPrompts(false);
          return;
        }

        const response = await fetch(PROMPTS_JSON_PATH);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid prompt JSON format');

        if (isActive) {
          setPrompts(data);
        }
      } catch {
        if (isActive) {
          setHasLoadPromptsError(true);
          setPrompts([]);
        }
      } finally {
        if (isActive) setIsLoadingPrompts(false);
      }
    }

    loadPrompts();
    return () => { isActive = false; };
  }, []);

  // Load initial skills
  useEffect(() => {
    let isActive = true;

    async function loadSkills() {
      try {
        setIsLoadingSkills(true);
        setHasLoadSkillsError(false);

        // Check localStorage first
        const localData = localStorage.getItem('pgen_skills');
        if (localData) {
          setSkills(JSON.parse(localData));
          setIsLoadingSkills(false);
          return;
        }

        const response = await fetch(SKILLS_JSON_PATH);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid skill JSON format');

        if (isActive) {
          setSkills(data);
        }
      } catch {
        if (isActive) {
          setHasLoadSkillsError(true);
          setSkills([]);
        }
      } finally {
        if (isActive) setIsLoadingSkills(false);
      }
    }

    loadSkills();
    return () => { isActive = false; };
  }, []);

  // Persist prompts to localStorage
  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('pgen_prompts', JSON.stringify(prompts));
    }
  }, [prompts]);

  // Persist skills to localStorage
  useEffect(() => {
    if (skills.length > 0) {
      localStorage.setItem('pgen_skills', JSON.stringify(skills));
    }
  }, [skills]);

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
      return matchesCategory && (!q || p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q));
    });
  }, [localizedPrompts, activeCategory, search]);

  const handleAdd = (newPrompt) => {
    setPrompts((prev) => [
      { ...newPrompt, id: getNextPromptId(prev), type: 'custom' },
      ...prev,
    ]);
  };

  const handleDelete = (id) => {
    if (window.confirm(messages.deletePromptTitle + '?')) {
      setPrompts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddSkill = (newSkill) => {
    setSkills((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const baseId = slugifySkillId(newSkill.idHint || newSkill.translations?.en?.title || newSkill.translations?.['zh-TW']?.title || `skill-${Date.now()}`) || `skill-${Date.now()}`;
      let nextId = baseId;
      let suffix = 2;

      while (existingIds.has(nextId)) {
        nextId = `${baseId}-${suffix}`;
        suffix += 1;
      }

      return [{ ...newSkill, id: nextId }, ...prev];
    });
  };

  const handleDeleteSkill = (id) => {
    if (window.confirm(messages.deleteSkillLabel + '?')) {
      setSkills((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-700 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={(cat) => {
          setActiveCategory(cat);
          setIsSidebarOpen(false);
        }}
        promptCounts={promptCounts}
        locale={locale}
        locales={LOCALES}
        messages={messages}
        onLocaleChange={setLocale}
        isOpen={isSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top bar */}
        <header className="shrink-0 px-4 sm:px-8 py-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-800 leading-none">
                {activePage === 'prompts'
                  ? getCategoryLabel(locale, activeCategory)
                  : activePage === 'skills'
                  ? messages.skillCollectionPageTitle
                  : messages.bmadPageTitle}
              </h2>
              <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-medium">
                {activePage === 'prompts'
                  ? messages.countSummary(filteredPrompts.length, Boolean(search))
                  : activePage === 'skills'
                  ? messages.skillCollectionPageSubtitle
                  : messages.bmadPageSubtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full max-w-2xl justify-end">
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 shrink-0">
              <button
                type="button"
                onClick={() => setActivePage('prompts')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
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
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  activePage === 'skills'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {messages.skillCollectionTab}
              </button>
              <button
                type="button"
                onClick={() => setActivePage('bmad')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  activePage === 'bmad'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {messages.bmadWorkshopTab}
              </button>
            </div>

            <div className="relative flex-1 max-w-xs">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={messages.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 bg-slate-50 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          {activePage === 'bmad' ? (
            <BMADWorkshop locale={locale} messages={messages} />
          ) : activePage === 'skills' ? (
            isLoadingSkills ? (
              <div className="flex items-center justify-center py-24 text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mr-3"></div>
                <p className="font-medium">{messages.loadingSkills}</p>
              </div>
            ) : hasLoadSkillsError ? (
              <div className="text-center py-24 text-red-500">
                <p className="font-medium">{messages.loadSkillsFailed}</p>
              </div>
            ) : (
              <SkillCollectionPage
                locale={locale}
                onAddSkill={handleAddSkill}
                onDeleteSkill={handleDeleteSkill}
                skills={skills}
                searchFilter={search}
              />
            )
          ) : (
            <div className="max-w-7xl mx-auto space-y-6">
              <AddPromptForm
                categoryLabels={messages.categories}
                messages={messages}
                onAdd={handleAdd}
              />

              {isLoadingPrompts ? (
                <div className="flex items-center justify-center py-24 text-slate-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mr-3"></div>
                  <p className="font-medium">{messages.loadingPrompts}</p>
                </div>
              ) : hasLoadPromptsError ? (
                <div className="text-center py-24 text-red-500">
                  <p className="font-medium">{messages.loadPromptsFailed}</p>
                </div>
              ) : filteredPrompts.length === 0 ? (
                <div className="text-center py-24 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="font-bold text-slate-600">{messages.emptyTitle}</p>
                  <p className="text-sm mt-2">{messages.emptySubtitle}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
