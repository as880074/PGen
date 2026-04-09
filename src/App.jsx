import { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import AddPromptForm from './components/AddPromptForm';

const DEFAULT_PROMPTS = [
  {
    id: 1,
    title: 'Weekly Standup Summary',
    text: 'Summarize the following meeting notes into a concise weekly standup update. Focus on: what was accomplished, what is in progress, and any blockers. Keep it under 150 words.\n\n[Paste meeting notes here]',
    category: 'work',
  },
  {
    id: 2,
    title: 'Debug Helper',
    text: 'I have the following code that is producing an unexpected result. Please identify the bug, explain why it occurs, and provide a corrected version with a brief explanation.\n\nLanguage: [language]\nCode:\n[paste code here]\n\nExpected behavior:\nActual behavior:',
    category: 'technical',
  },
  {
    id: 3,
    title: 'Short Story Starter',
    text: 'Write the opening paragraph of a short story with the following elements:\n- Genre: [genre]\n- Setting: [setting]\n- Main character: [brief description]\n- Opening mood: [e.g. mysterious, hopeful, tense]\n\nMake it vivid and end the paragraph on a hook that draws the reader in.',
    category: 'creative',
  },
  {
    id: 4,
    title: 'Concept Explainer (ELI5)',
    text: 'Explain the concept of [topic] as if I were a curious 10-year-old. Use a simple analogy from everyday life, avoid jargon, and keep the explanation under 200 words.',
    category: 'learning',
  },
  {
    id: 5,
    title: 'Code Review Request',
    text: 'Please review the following code and provide feedback on:\n1. Code quality and readability\n2. Potential bugs or edge cases\n3. Performance improvements\n4. Security concerns\n5. Best practices\n\n[paste code here]',
    category: 'technical',
  },
  {
    id: 6,
    title: 'Email Draft',
    text: 'Write a professional email with the following details:\n- Purpose: [purpose]\n- Recipient: [who/role]\n- Key points to cover: [bullet points]\n- Tone: [formal / friendly / urgent]\n- Desired outcome: [what you want them to do]\n\nKeep it concise and clear.',
    category: 'work',
  },
];

let nextId = DEFAULT_PROMPTS.length + 1;

export default function App() {
  const [prompts, setPrompts] = useState(DEFAULT_PROMPTS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const promptCounts = useMemo(() => {
    const counts = { all: prompts.length };
    prompts.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q || p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [prompts, activeCategory, search]);

  const handleAdd = (newPrompt) => {
    setPrompts((prev) => [{ ...newPrompt, id: nextId++ }, ...prev]);
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
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 px-8 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 capitalize">
              {activeCategory === 'all' ? 'All Prompts' : activeCategory}
            </h2>
            <p className="text-xs text-slate-400">
              {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''}
              {search && ' matching your search'}
            </p>
          </div>
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
              placeholder="Search prompts…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-slate-50 placeholder:text-slate-300"
            />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
          <AddPromptForm onAdd={handleAdd} />

          {filteredPrompts.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-medium">No prompts found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  onDelete={() => handleDelete(prompt.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
