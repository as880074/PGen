import { useEffect, useMemo, useState } from 'react';

const PAGE_CONTENT = {
  'zh-TW': {
    badge: 'Agent Skill 專題頁',
    title: 'Skill 收集與分享藍圖',
    subtitle:
      '把常用工作流變成可重用技能，從個人效率工具走向團隊共用知識庫。',
    notice:
      '此頁面為產品規格草案整理，平台機制（會員、商業模式、治理規則）仍建議再做市場驗證。',
    sections: [
      {
        title: '壹、什麼是 Agent Skill',
        bullets: [
          '可重用的任務說明包：把背景、步驟、輸出格式與注意事項一次定義。',
          '同一對話中可切換多個 Skill，不必開多個視窗重做設定。',
          '支援工具與 MCP 授權，能串接外部系統完成資料流。',
          '一份 SKILL.md 可跨多平台使用，降低重工成本。',
        ],
      },
      {
        title: '貳、SKILL.md 三大核心',
        bullets: [
          '觸發時機：名稱、關鍵字、使用情境。',
          '工具權限：是否需要網路、雲端硬碟、第三方服務。',
          '執行 SOP：步驟順序、限制條件、輸出格式。',
        ],
      },
      {
        title: '參、Skill 分享網站功能草案',
        bullets: [
          '技能探索市集：分類、標籤、熱門榜、跨平台相容篩選。',
          '技能詳情頁：PTCF 視覺化、依賴工具、安裝指引、一鍵複製下載。',
          '線上 Skill 產生器：表單輸入後自動生成標準 SKILL.md。',
          '社群與版本控制：Fork/Remix、評分留言、版本演進紀錄。',
        ],
      },
      {
        title: '肆、商業模式與擴展方向',
        bullets: [
          '免費版：瀏覽與下載開源 Skill。',
          '企業版：私有 Skill 庫、權限控管、內部 MCP 整合。',
          '治理機制：品質審核、衝突標記、內容健康度分級。',
        ],
      },
    ],
    checklistTitle: '建議下一步（MVP）',
    checklist: [
      '先做「技能探索市集 + 技能詳情頁 + 一鍵複製」。',
      '建立最小資料結構（名稱、平台標籤、分類、描述、SKILL.md 內容）。',
      '加入基本評分與收藏，蒐集真實使用訊號再擴功能。',
    ],
    marketplaceTitle: 'Skill 探索市集（Demo）',
    marketplaceSubtitle: '可依分類、平台與 MCP 需求快速篩選。',
    searchPlaceholder: '搜尋 Skill 名稱或描述...',
    categoryLabel: '分類',
    platformLabel: '平台',
    mcpLabel: 'MCP',
    allOption: '全部',
    mcpAll: '全部',
    mcpYes: '需要 MCP',
    mcpNo: '不需要 MCP',
    copySkillLabel: '複製 SKILL 範本',
    copiedLabel: '已複製',
    viewDetailLabel: '查看詳情',
    detailTitle: 'Skill 詳情',
    closeLabel: '關閉',
    downloadMdLabel: '下載 .md',
    ptcfTitle: 'PTCF 架構',
    personaLabel: 'Persona 角色',
    taskLabel: 'Task 任務',
    contextLabel: 'Context 背景',
    formatLabel: 'Format 格式',
    installGuideTitle: '安裝路徑',
    dependencyTitle: '依賴與需求',
    supportedPlatformsLabel: '支援平台',
    mcpRequirementLabel: 'MCP 需求',
    installCount: (count) => `安裝 ${count.toLocaleString()} 次`,
    noResultTitle: '找不到符合條件的 Skill',
    noResultSubtitle: '請調整篩選條件或搜尋關鍵字。',
    categories: {
      work: '工作',
      creative: '創作',
      technical: '技術',
      learning: '學習',
      other: '其他',
    },
  },
  en: {
    badge: 'Agent Skill Overview',
    title: 'Skill Collection & Sharing Blueprint',
    subtitle:
      'Turn repeatable workflows into reusable skills and scale from personal productivity to team knowledge.',
    notice:
      'This page summarizes an early product draft. Marketplace and business features should be validated with user research.',
    sections: [
      {
        title: '1. What is an Agent Skill',
        bullets: [
          'A reusable task package with context, process, format, and constraints.',
          'Switch across multiple skills in the same conversation.',
          'Connect external tools through MCP-enabled flows.',
          'Reuse one SKILL.md across multiple AI platforms.',
        ],
      },
      {
        title: '2. SKILL.md Core Structure',
        bullets: [
          'Trigger: name, keywords, scenarios.',
          'Tools: required permissions and integrations.',
          'SOP: execution steps, rules, output format.',
        ],
      },
      {
        title: '3. Marketplace Feature Draft',
        bullets: [
          'Discovery: categories, tags, trending, platform filters.',
          'Detail page: PTCF view, dependencies, install guide, copy/download.',
          'Creator studio: form-to-SKILL.md generation.',
          'Community: fork/remix, ratings, comments, version history.',
        ],
      },
      {
        title: '4. Business Expansion',
        bullets: [
          'Free tier for open skills.',
          'Enterprise private libraries and access control.',
          'Quality governance and conflict reporting.',
        ],
      },
    ],
    checklistTitle: 'Suggested MVP Next Steps',
    checklist: [
      'Launch discovery + detail + copy first.',
      'Define minimal skill schema.',
      'Collect usage signals before scaling features.',
    ],
    marketplaceTitle: 'Skill Marketplace (Demo)',
    marketplaceSubtitle: 'Filter by category, platform, and MCP dependency.',
    searchPlaceholder: 'Search skill name or summary...',
    categoryLabel: 'Category',
    platformLabel: 'Platform',
    mcpLabel: 'MCP',
    allOption: 'All',
    mcpAll: 'All',
    mcpYes: 'Requires MCP',
    mcpNo: 'No MCP',
    copySkillLabel: 'Copy SKILL template',
    copiedLabel: 'Copied',
    viewDetailLabel: 'View details',
    detailTitle: 'Skill Details',
    closeLabel: 'Close',
    downloadMdLabel: 'Download .md',
    ptcfTitle: 'PTCF Structure',
    personaLabel: 'Persona',
    taskLabel: 'Task',
    contextLabel: 'Context',
    formatLabel: 'Format',
    installGuideTitle: 'Install Paths',
    dependencyTitle: 'Dependencies',
    supportedPlatformsLabel: 'Supported platforms',
    mcpRequirementLabel: 'MCP requirement',
    installCount: (count) => `${count.toLocaleString()} installs`,
    noResultTitle: 'No matching skills found',
    noResultSubtitle: 'Try changing filters or search keywords.',
    categories: {
      work: 'Work',
      creative: 'Creative',
      technical: 'Technical',
      learning: 'Learning',
      other: 'Other',
    },
  },
};

function getSkillInfo(skill, locale) {
  const fallback = { title: 'Untitled Skill', summary: '' };

  if (!skill || !skill.translations) {
    return fallback;
  }

  return skill.translations[locale] ?? skill.translations['zh-TW'] ?? fallback;
}

function getSkillPlatforms(skill) {
  return Array.isArray(skill?.platforms) ? skill.platforms : [];
}

function buildSkillTemplate(skill, locale) {
  const info = getSkillInfo(skill, locale);
  const platforms = getSkillPlatforms(skill);

  return `# SKILL.md\n\n## Name\n${info.title}\n\n## Trigger\n- Use when task matches: [define scenario]\n\n## Tools\n- Platforms: ${platforms.join(', ')}\n- MCP required: ${skill.requiresMcp ? 'yes' : 'no'}\n\n## SOP\n1. Gather input context\n2. Validate constraints\n3. Generate structured output\n4. Ask for one refinement round\n\n## Output Format\n- Bullet summary\n- Action items\n- Next prompt recommendations\n`;
}

function getPtcf(skill, locale) {
  const info = getSkillInfo(skill, locale);
  const platforms = getSkillPlatforms(skill);

  if (locale === 'zh-TW') {
    return {
      persona: `你是「${info.title}」的專業任務助理，需遵守格式與品質規範。`,
      task: `根據輸入內容執行 ${info.title}，產出可直接使用的結果。`,
      context: `分類為「${skill.category}」，支援平台：${platforms.join('、')}，MCP 需求：${skill.requiresMcp ? '需要' : '不需要'}。`,
      format: '輸出需包含：重點摘要、可執行清單、下一步建議，必要時標註資料依據。',
    };
  }

  return {
    persona: `You are a specialist assistant for "${info.title}" with strict quality and formatting discipline.`,
    task: `Execute ${info.title} from user input and produce an output that can be used immediately.`,
    context: `Category: ${skill.category}. Platforms: ${platforms.join(', ')}. MCP: ${skill.requiresMcp ? 'required' : 'not required'}.`,
    format: 'Return: concise summary, executable checklist, and next-step suggestions, with evidence notes when needed.',
  };
}

function getInstallPath(platform) {
  const map = {
    Claude: '.claude/skills/<skill-name>/SKILL.md',
    Gemini: '.gemini/skills/<skill-name>/SKILL.md',
    'OpenAI CLI': '.openai/skills/<skill-name>/SKILL.md',
    Cursor: '.cursor/skills/<skill-name>/SKILL.md',
    Windsurf: '.windsurf/skills/<skill-name>/SKILL.md',
  };

  return map[platform] ?? '<workspace>/.skills/<skill-name>/SKILL.md';
}

function getCategoryColor(category) {
  const map = {
    work: 'bg-blue-100 text-blue-700',
    creative: 'bg-pink-100 text-pink-700',
    technical: 'bg-emerald-100 text-emerald-700',
    learning: 'bg-amber-100 text-amber-700',
    other: 'bg-slate-100 text-slate-700',
  };

  return map[category] ?? map.other;
}

export default function SkillCollectionPage({ locale, skills = [] }) {
  const content = PAGE_CONTENT[locale] ?? PAGE_CONTENT['zh-TW'];
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [platform, setPlatform] = useState('all');
  const [mcpFilter, setMcpFilter] = useState('all');
  const [copiedSkillId, setCopiedSkillId] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    if (!selectedSkill) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedSkill(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedSkill]);

  const platformOptions = useMemo(() => {
    const values = new Set();

    skills.forEach((skill) => {
      const platforms = getSkillPlatforms(skill);
      platforms.forEach((item) => values.add(item));
    });

    return [...values].sort();
  }, [skills]);

  const filteredSkills = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return skills.filter((skill) => {
      const info = getSkillInfo(skill, locale);
      const platforms = getSkillPlatforms(skill);
      const matchesSearch =
        !keyword ||
        info.title.toLowerCase().includes(keyword) ||
        info.summary.toLowerCase().includes(keyword);
      const matchesCategory = category === 'all' || skill.category === category;
      const matchesPlatform = platform === 'all' || platforms.includes(platform);
      const matchesMcp =
        mcpFilter === 'all' ||
        (mcpFilter === 'required' && skill.requiresMcp) ||
        (mcpFilter === 'not-required' && !skill.requiresMcp);

      return matchesSearch && matchesCategory && matchesPlatform && matchesMcp;
    });
  }, [category, locale, mcpFilter, platform, search, skills]);

  const handleCopySkillTemplate = async (skill) => {
    const text = buildSkillTemplate(skill, locale);

    try {
      await navigator.clipboard.writeText(text);
      setCopiedSkillId(skill.id);
      setTimeout(() => setCopiedSkillId(''), 1800);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedSkillId(skill.id);
      setTimeout(() => setCopiedSkillId(''), 1800);
    }
  };

  const handleDownloadSkill = (skill) => {
    const text = buildSkillTemplate(skill, locale);
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${skill.id}.md`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-6 shadow-sm">
        <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          {content.badge}
        </span>
        <h2 className="mt-3 text-2xl font-bold text-slate-800">{content.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{content.subtitle}</p>
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
          {content.notice}
        </p>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-800">{content.marketplaceTitle}</h3>
            <p className="mt-1 text-sm text-slate-500">{content.marketplaceSubtitle}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {filteredSkills.length} / {skills.length}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={content.searchPlaceholder}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-200"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-200"
          >
            <option value="all">{content.categoryLabel}: {content.allOption}</option>
            {Object.keys(content.categories).map((key) => (
              <option key={key} value={key}>
                {content.categoryLabel}: {content.categories[key]}
              </option>
            ))}
          </select>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-200"
          >
            <option value="all">{content.platformLabel}: {content.allOption}</option>
            {platformOptions.map((item) => (
              <option key={item} value={item}>
                {content.platformLabel}: {item}
              </option>
            ))}
          </select>

          <select
            value={mcpFilter}
            onChange={(e) => setMcpFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-200"
          >
            <option value="all">{content.mcpLabel}: {content.mcpAll}</option>
            <option value="required">{content.mcpLabel}: {content.mcpYes}</option>
            <option value="not-required">{content.mcpLabel}: {content.mcpNo}</option>
          </select>
        </div>

        {filteredSkills.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
            <p className="text-sm font-medium text-slate-600">{content.noResultTitle}</p>
            <p className="mt-1 text-xs text-slate-500">{content.noResultSubtitle}</p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredSkills.map((skill) => {
              const info = getSkillInfo(skill, locale);
              const copied = copiedSkillId === skill.id;
              const platforms = getSkillPlatforms(skill);

              return (
                <article key={skill.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">{info.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{info.summary}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${getCategoryColor(skill.category)}`}>
                      {content.categories[skill.category] ?? skill.category}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {platforms.map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                        {item}
                      </span>
                    ))}
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${skill.requiresMcp ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {skill.requiresMcp ? content.mcpYes : content.mcpNo}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>★ {Number(skill.rating || 0).toFixed(1)}</span>
                    <span>{content.installCount(Number(skill.installs || 0))}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800"
                    >
                      {content.viewDetailLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopySkillTemplate(skill)}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                        copied
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                      }`}
                    >
                      {copied ? content.copiedLabel : content.copySkillLabel}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </article>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {content.sections.map((section) => (
          <article key={section.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800">{section.title}</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
              {section.bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 text-violet-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-800">{content.checklistTitle}</h3>
        <ol className="mt-3 space-y-2 text-sm text-slate-600">
          {content.checklist.map((item, index) => (
            <li key={item}>
              {index + 1}. {item}
            </li>
          ))}
        </ol>
      </article>

      {selectedSkill ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
                  {content.detailTitle}
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-800">
                  {getSkillInfo(selectedSkill, locale).title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {getSkillInfo(selectedSkill, locale).summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-800"
              >
                {content.closeLabel}
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold text-slate-800">{content.ptcfTitle}</h4>
              {(() => {
                const ptcf = getPtcf(selectedSkill, locale);
                return (
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-700">{content.personaLabel}:</span>{' '}
                      {ptcf.persona}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">{content.taskLabel}:</span>{' '}
                      {ptcf.task}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">{content.contextLabel}:</span>{' '}
                      {ptcf.context}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">{content.formatLabel}:</span>{' '}
                      {ptcf.format}
                    </p>
                  </div>
                );
              })()}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-slate-200 p-4">
                <h4 className="text-sm font-semibold text-slate-800">{content.dependencyTitle}</h4>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-700">{content.supportedPlatformsLabel}:</span>{' '}
                    {getSkillPlatforms(selectedSkill).join(', ')}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">{content.mcpRequirementLabel}:</span>{' '}
                    {selectedSkill.requiresMcp ? content.mcpYes : content.mcpNo}
                  </p>
                </div>
              </article>

              <article className="rounded-xl border border-slate-200 p-4">
                <h4 className="text-sm font-semibold text-slate-800">{content.installGuideTitle}</h4>
                <ul className="mt-3 space-y-2 text-xs text-slate-600">
                  {getSkillPlatforms(selectedSkill).map((item) => (
                    <li key={item}>
                      <span className="font-semibold text-slate-700">{item}</span>: {getInstallPath(item)}
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => handleCopySkillTemplate(selectedSkill)}
                className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700 hover:bg-violet-100"
              >
                {content.copySkillLabel}
              </button>
              <button
                type="button"
                onClick={() => handleDownloadSkill(selectedSkill)}
                className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-700"
              >
                {content.downloadMdLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
