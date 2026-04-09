export const DEFAULT_LOCALE = 'zh-TW';

export const LOCALES = [
  { id: 'zh-TW', label: '繁中' },
  { id: 'en', label: 'EN' },
];

const MESSAGES = {
  'zh-TW': {
    categories: {
      all: '全部提示詞',
      work: '工作',
      creative: '創作',
      technical: '技術',
      learning: '學習',
      other: '其他',
    },
    sidebarTitle: '提示詞管理器',
    categoryHeading: '分類',
    languageHeading: '語言',
    totalPrompts: (count) => `總共 ${count} 筆提示詞`,
    countSummary: (count, hasSearch) =>
      `共 ${count} 筆提示詞${hasSearch ? '，符合目前搜尋條件' : ''}`,
    searchPlaceholder: '搜尋提示詞...',
    emptyTitle: '找不到符合條件的提示詞',
    emptySubtitle: '請嘗試其他搜尋關鍵字或分類',
    addPromptCta: '新增提示詞...',
    newPromptTitle: '新增提示詞',
    titleLabel: '標題',
    titlePlaceholder: '例如：每週站會摘要',
    categoryLabel: '分類',
    promptTextLabel: '提示詞內容',
    promptTextPlaceholder: '在這裡輸入你的提示詞內容...',
    cancelLabel: '取消',
    submitLabel: '新增提示詞',
    deletePromptTitle: '刪除提示詞',
    copyLabel: '複製',
    copiedLabel: '已複製',
    loadingPrompts: '正在載入提示詞...',
    loadPromptsFailed: '載入提示詞失敗，請稍後再試',
    promptLibraryTab: '提示詞庫',
    skillCollectionTab: 'Skill 收集',
    bmadWorkshopTab: 'BMAD 實戰',
    skillCollectionPageTitle: 'Skill 收集頁',
    skillCollectionPageSubtitle: '探索 Agent Skill 介紹與分享網站規格草案',
    bmadPageTitle: 'BMAD 實戰工作坊',
    bmadPageSubtitle: '掌握 Behavior, Memory, Ability, Document 四大核心，打造專業 AI 團隊',
    bmadHeroTitle: '什麼是 BMAD 模型？',
    bmadHeroSubtitle: '透過結構化的配置，將 Gemini 轉化為協作開發團隊。',
    bmadConcepts: {
      behavior: {
        title: 'Behavior 行為規範',
        desc: '定義 Agent 的專業角色與互動規則。例如透過 *agent pm 啟動引導式對話。',
      },
      memory: {
        title: 'Memory 上下文管理',
        desc: '利用 GEMINI.md 集中管理專案背景，確保長對話中的邏輯連貫性與效率。',
      },
      ability: {
        title: 'Ability 專業能力',
        desc: '載入特定領域的擴充包（Packs），如遊戲開發、DevOps 或創意寫作。',
      },
      document: {
        title: 'Document 文件分片',
        desc: '將大型 PRD 拆分為 Epic/Story 小檔案，實現精確引用並節省上下文空間。',
      },
    },
    bmadBuilderTitle: 'BMAD 配置產生器',
    bmadBuilderSubtitle: '填寫專案需求，自動生成標準的 GEMINI.md 配置內容',
    projectNameLabel: '專案名稱',
    projectNamePlaceholder: '輸入你的專案名稱',
    projectDescLabel: '專案目標',
    projectDescPlaceholder: '描述專案的核心目標與背景',
    selectRolesLabel: '選擇團隊成員 (Behavior)',
    selectAbilityLabel: '選擇核心能力 (Ability)',
    generateConfigLabel: '生成 GEMINI.md',
    copyConfigLabel: '複製配置內容',
    loadingSkills: '正在載入 Skill 資料...',
    loadSkillsFailed: '載入 Skill 資料失敗，請稍後再試',
    emptySkillsTitle: '目前沒有可顯示的 Skill',
    emptySkillsSubtitle: '請先新增 skills.json 內容',
  },
  en: {
    categories: {
      all: 'All Prompts',
      work: 'Work',
      creative: 'Creative',
      technical: 'Technical',
      learning: 'Learning',
      other: 'Other',
    },
    sidebarTitle: 'Prompt Manager',
    categoryHeading: 'Categories',
    languageHeading: 'Language',
    totalPrompts: (count) => `${count} prompts total`,
    countSummary: (count, hasSearch) =>
      `${count} prompt${count === 1 ? '' : 's'}${hasSearch ? ' matching your search' : ''}`,
    searchPlaceholder: 'Search prompts...',
    emptyTitle: 'No prompts found',
    emptySubtitle: 'Try a different search or category',
    addPromptCta: 'Add a new prompt...',
    newPromptTitle: 'New Prompt',
    titleLabel: 'Title',
    titlePlaceholder: 'e.g. Weekly standup summary',
    categoryLabel: 'Category',
    promptTextLabel: 'Prompt Text',
    promptTextPlaceholder: 'Write your prompt here...',
    cancelLabel: 'Cancel',
    submitLabel: 'Add Prompt',
    deletePromptTitle: 'Delete prompt',
    copyLabel: 'Copy',
    copiedLabel: 'Copied!',
    loadingPrompts: 'Loading prompts...',
    loadPromptsFailed: 'Failed to load prompts. Please try again later.',
    promptLibraryTab: 'Prompt Library',
    skillCollectionTab: 'Skill Collection',
    bmadWorkshopTab: 'BMAD Workshop',
    skillCollectionPageTitle: 'Skill Collection',
    skillCollectionPageSubtitle: 'Agent Skill overview and sharing platform draft',
    bmadPageTitle: 'BMAD Workshop',
    bmadPageSubtitle: 'Master Behavior, Memory, Ability, Document to build expert AI teams',
    bmadHeroTitle: 'What is the BMAD Model?',
    bmadHeroSubtitle: 'Transform Gemini into a collaborative team through structured configurations.',
    bmadConcepts: {
      behavior: {
        title: 'Behavior (Interaction)',
        desc: 'Define roles and interaction rules, like using *agent pm to start a guided session.',
      },
      memory: {
        title: 'Memory (Context)',
        desc: 'Centralize project context via GEMINI.md to ensure consistency in long chats.',
      },
      ability: {
        title: 'Ability (Capabilities)',
        desc: 'Load domain-specific packs like Game dev, DevOps, or Creative Writing Studio.',
      },
      document: {
        title: 'Document (Sharding)',
        desc: 'Split large PRDs into Epic/Story shards for precision and context efficiency.',
      },
    },
    bmadBuilderTitle: 'BMAD Config Generator',
    bmadBuilderSubtitle: 'Fill in your project needs to generate a standard GEMINI.md configuration',
    projectNameLabel: 'Project Name',
    projectNamePlaceholder: 'Enter your project name',
    projectDescLabel: 'Project Goal',
    projectDescPlaceholder: 'Describe the core objective and background',
    selectRolesLabel: 'Team Members (Behavior)',
    selectAbilityLabel: 'Core Capability (Ability)',
    generateConfigLabel: 'Generate GEMINI.md',
    copyConfigLabel: 'Copy Config',
    loadingSkills: 'Loading skill data...',
    loadSkillsFailed: 'Failed to load skill data. Please try again later.',
    emptySkillsTitle: 'No skills available',
    emptySkillsSubtitle: 'Please add entries to skills.json',
  },
};

export function getMessages(locale) {
  return MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];
}

export function getCategoryLabel(locale, category) {
  const messages = getMessages(locale);
  return messages.categories[category] ?? category;
}

export function getLocalizedPrompt(prompt, locale) {
  if (!prompt.translations) {
    return prompt;
  }

  const translation =
    prompt.translations[locale] ?? prompt.translations[DEFAULT_LOCALE] ?? null;

  if (!translation) {
    return prompt;
  }

  return {
    ...prompt,
    title: translation.title,
    text: translation.text,
  };
}
