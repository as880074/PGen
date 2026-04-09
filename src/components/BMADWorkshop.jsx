import { useState } from 'react';

const TEAM_ROLES = [
  { id: 'pm', label: 'Product Manager (PM)', icon: '📋' },
  { id: 'architect', label: 'System Architect', icon: '🏗️' },
  { id: 'dev', label: 'Developer (Dev)', icon: '💻' },
  { id: 'qa', label: 'QA Engineer', icon: '🧪' },
  { id: 'scrum-master', label: 'Scrum Master', icon: '⏱️' },
];

const ABILITY_PACKS = [
  { id: 'fullstack', label: 'Greenfield Fullstack Pack', icon: '🌐' },
  { id: 'game-phaser', label: 'Phaser 3 Game Pack', icon: '🎮' },
  { id: 'devops', label: 'Infrastructure & DevOps Pack', icon: '☁️' },
  { id: 'writing', label: 'Creative Writing Pack', icon: '✍️' },
];

export default function BMADWorkshop({ locale, messages }) {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [selectedRoles, setSelectedRoles] = useState(['pm', 'dev']);
  const [selectedAbility, setSelectedAbility] = useState('fullstack');
  const [generatedConfig, setGeneratedConfig] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const toggleRole = (roleId) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId) ? prev.filter((r) => r !== roleId) : [...prev, roleId]
    );
  };

  const handleGenerate = () => {
    const rolesText = selectedRoles
      .map((r) => `- ${TEAM_ROLES.find((role) => role.id === r).label}`)
      .join('\n');
    const ability = ABILITY_PACKS.find((a) => a.id === selectedAbility).label;

    const config = `# GEMINI.md - ${projectName || 'New Project'}

## Project Overview
- **Goal**: ${projectDesc || 'Not specified'}
- **Framework**: BMAD-METHOD

## Behavior (Roles)
${rolesText}
- **Interaction Style**: Guided inquiry & multi-agent party mode.

## Memory
- Context is centralized in this file for consistency across agents.

## Ability
- **Core Pack**: ${ability}

## Document (Sharding)
- Shard documentation into docs/prd/ (Epics/Stories) for context efficiency.
`;
    setGeneratedConfig(config);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedConfig);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">{messages.bmadHeroTitle}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">{messages.bmadHeroSubtitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {Object.entries(messages.bmadConcepts).map(([key, concept]) => (
            <div key={key} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-left group">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4 font-black group-hover:bg-violet-600 group-hover:text-white transition-colors">
                {key[0].toUpperCase()}
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{concept.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{concept.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Builder Section */}
      <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 space-y-8">
          <div>
            <h2 className="text-xl font-black text-slate-800">{messages.bmadBuilderTitle}</h2>
            <p className="text-sm text-slate-400 mt-1">{messages.bmadBuilderSubtitle}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{messages.projectNameLabel}</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder={messages.projectNamePlaceholder}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 bg-slate-50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{messages.projectDescLabel}</label>
              <textarea
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                placeholder={messages.projectDescPlaceholder}
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 bg-slate-50 transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{messages.selectRolesLabel}</label>
              <div className="flex flex-wrap gap-2">
                {TEAM_ROLES.map((role) => {
                  const isActive = selectedRoles.includes(role.id);
                  return (
                    <button
                      key={role.id}
                      onClick={() => toggleRole(role.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                        isActive
                          ? 'border-violet-300 bg-violet-50 text-violet-700'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      <span>{role.icon}</span>
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{messages.selectAbilityLabel}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ABILITY_PACKS.map((pack) => {
                  const isActive = selectedAbility === pack.id;
                  return (
                    <button
                      key={pack.id}
                      onClick={() => setSelectedAbility(pack.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'border-violet-300 bg-violet-50 text-violet-700 ring-2 ring-violet-100'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      <span className="text-xl">{pack.icon}</span>
                      <span className="text-xs font-bold leading-tight">{pack.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-4 bg-violet-600 text-white rounded-2xl font-black text-sm hover:bg-violet-700 active:scale-[0.98] transition-all shadow-lg shadow-violet-200"
            >
              {messages.generateConfigLabel}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 p-8 sm:p-10 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Preview: GEMINI.md</span>
            {generatedConfig && (
              <button
                onClick={handleCopy}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isCopied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isCopied ? messages.copiedLabel : messages.copyConfigLabel}
              </button>
            )}
          </div>
          
          <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700 p-6 font-mono text-sm text-slate-300 overflow-y-auto max-h-[600px] whitespace-pre-wrap">
            {generatedConfig || (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center py-20">
                <span className="text-4xl mb-4">📄</span>
                <p>Generated configuration will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
