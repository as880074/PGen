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