export const DEFAULT_LOCALE = 'zh-TW';

export const LOCALES = [
  { id: 'zh-TW', label: '繁中' },
  { id: 'en', label: 'EN' },
];

const PROMPT_DEFINITIONS = {
  weeklyStandup: {
    category: 'work',
    translations: {
      'zh-TW': {
        title: '每週站會摘要',
        text: '請將以下會議筆記整理成精簡的每週站會更新，重點包含：已完成事項、進行中事項，以及目前的阻礙。請控制在 150 字內。\n\n[請在此貼上會議筆記]',
      },
      en: {
        title: 'Weekly Standup Summary',
        text: 'Summarize the following meeting notes into a concise weekly standup update. Focus on: what was accomplished, what is in progress, and any blockers. Keep it under 150 words.\n\n[Paste meeting notes here]',
      },
    },
  },
  debugHelper: {
    category: 'technical',
    translations: {
      'zh-TW': {
        title: '除錯助手',
        text: '以下程式碼產生了非預期的結果。請幫我找出 bug、說明原因，並提供修正後的版本與簡短解釋。\n\n語言：[language]\n程式碼：\n[請在此貼上程式碼]\n\n預期行為：\n實際行為：',
      },
      en: {
        title: 'Debug Helper',
        text: 'I have the following code that is producing an unexpected result. Please identify the bug, explain why it occurs, and provide a corrected version with a brief explanation.\n\nLanguage: [language]\nCode:\n[paste code here]\n\nExpected behavior:\nActual behavior:',
      },
    },
  },
  shortStoryStarter: {
    category: 'creative',
    translations: {
      'zh-TW': {
        title: '短篇故事開頭',
        text: '請根據以下元素，寫出一篇短篇故事的開場段落：\n- 類型：[genre]\n- 場景：[setting]\n- 主角：[brief description]\n- 開場氛圍：[例如：神祕、充滿希望、緊張]\n\n請描寫得生動，並在段落結尾留下能吸引讀者繼續看的懸念。',
      },
      en: {
        title: 'Short Story Starter',
        text: 'Write the opening paragraph of a short story with the following elements:\n- Genre: [genre]\n- Setting: [setting]\n- Main character: [brief description]\n- Opening mood: [e.g. mysterious, hopeful, tense]\n\nMake it vivid and end the paragraph on a hook that draws the reader in.',
      },
    },
  },
  conceptExplainer: {
    category: 'learning',
    translations: {
      'zh-TW': {
        title: '概念白話解釋',
        text: '請把 [topic] 這個概念解釋給一位好奇的 10 歲小朋友聽。請用生活化的比喻、避免術語，並將說明控制在 200 字內。',
      },
      en: {
        title: 'Concept Explainer (ELI5)',
        text: 'Explain the concept of [topic] as if I were a curious 10-year-old. Use a simple analogy from everyday life, avoid jargon, and keep the explanation under 200 words.',
      },
    },
  },
  codeReviewRequest: {
    category: 'technical',
    translations: {
      'zh-TW': {
        title: '程式碼審查請求',
        text: '請審查以下程式碼，並針對這些面向提供回饋：\n1. 程式碼品質與可讀性\n2. 潛在 bug 或邊界情況\n3. 效能改善建議\n4. 安全性疑慮\n5. 最佳實務\n\n[請在此貼上程式碼]',
      },
      en: {
        title: 'Code Review Request',
        text: 'Please review the following code and provide feedback on:\n1. Code quality and readability\n2. Potential bugs or edge cases\n3. Performance improvements\n4. Security concerns\n5. Best practices\n\n[paste code here]',
      },
    },
  },
  emailDraft: {
    category: 'work',
    translations: {
      'zh-TW': {
        title: '專業 Email 草稿',
        text: '請根據以下資訊撰寫一封專業電子郵件：\n- 目的：[purpose]\n- 收件者：[who/role]\n- 需涵蓋重點：[bullet points]\n- 語氣：[正式 / 親切 / 緊急]\n- 期望結果：[希望對方採取的行動]\n\n內容請保持精簡清楚。',
      },
      en: {
        title: 'Email Draft',
        text: 'Write a professional email with the following details:\n- Purpose: [purpose]\n- Recipient: [who/role]\n- Key points to cover: [bullet points]\n- Tone: [formal / friendly / urgent]\n- Desired outcome: [what you want them to do]\n\nKeep it concise and clear.',
      },
    },
  },
};

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
  },
};

export const DEFAULT_PROMPTS = Object.keys(PROMPT_DEFINITIONS).map((promptKey, index) => ({
  id: index + 1,
  type: 'default',
  promptKey,
  category: PROMPT_DEFINITIONS[promptKey].category,
}));

export function getMessages(locale) {
  return MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];
}

export function getCategoryLabel(locale, category) {
  const messages = getMessages(locale);
  return messages.categories[category] ?? category;
}

export function getLocalizedPrompt(prompt, locale) {
  if (prompt.type !== 'default') {
    return prompt;
  }

  const definition = PROMPT_DEFINITIONS[prompt.promptKey];
  const translation =
    definition?.translations[locale] ?? definition?.translations[DEFAULT_LOCALE] ?? null;

  if (!translation) {
    return prompt;
  }

  return {
    ...prompt,
    title: translation.title,
    text: translation.text,
  };
}