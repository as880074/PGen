import { useState } from 'react';

const CATEGORIES = ['work', 'creative', 'technical', 'learning', 'other'];

export default function AddPromptForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('other');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedText = text.trim();
    if (!trimmedTitle || !trimmedText) return;
    onAdd({ title: trimmedTitle, text: trimmedText, category });
    setTitle('');
    setText('');
    setCategory('other');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-400 hover:border-violet-400 hover:text-violet-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add a new prompt…
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">New Prompt</h2>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600 text-xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Weekly standup summary"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder:text-slate-300"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white capitalize"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="capitalize">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">Prompt Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your prompt here…"
          rows={4}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder:text-slate-300 resize-none"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold bg-violet-600 text-white rounded-lg hover:bg-violet-700 active:bg-violet-800 transition-colors disabled:opacity-50"
          disabled={!title.trim() || !text.trim()}
        >
          Add Prompt
        </button>
      </div>
    </form>
  );
}
