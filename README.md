# PGen – 提示詞管理器

這是一個使用 **Vite**、**React** 與 **Tailwind CSS** 建立的提示詞管理工具，提供簡潔的卡片式介面來管理、搜尋與新增常用提示詞。

## 功能特色

- **分類側邊欄**：可依全部、工作、創作、技術、學習、其他等分類快速篩選
- **提示詞卡片**：顯示標題、分類與完整提示詞內容
- **一鍵複製**：可直接把提示詞內容複製到剪貼簿
- **新增提示詞**：可展開表單新增自訂提示詞
- **即時搜尋**：可依標題與內容搜尋
- **刪除功能**：可移除不需要的提示詞
- **雙語切換**：內建繁體中文與英文切換
- **內建範例**：包含 6 組預設提示詞，切換語系時會同步顯示對應語言內容

## 執行方式

先安裝依賴：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

啟動後預設可在瀏覽器開啟 `http://localhost:5173`。

## 建置與預覽

建立正式版本：

```bash
npm run build
```

預覽建置結果：

```bash
npm run preview
```

## GitHub Pages 自動部署

此專案已包含 GitHub Actions workflow：

- [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)

啟用方式：

1. 將專案推到 GitHub，並確認預設分支為 `main`
2. 到 GitHub Repository 的 `Settings` -> `Pages`
3. 在 `Build and deployment` 的 `Source` 選擇 `GitHub Actions`
4. 之後每次 push 到 `main`，會自動建置並部署到 GitHub Pages

說明：

- 若倉庫名稱是 `username.github.io`，會用 `/` 當作 Vite base
- 其他倉庫會自動使用 `/<repo-name>/` 當作 Vite base

## 語系設計

- 介面文字集中在 `src/i18n.js`
- 預設提示詞也集中在 `src/i18n.js`
- 預設提示詞會依語系切換顯示不同內容
- 使用者自行新增的提示詞會保留原本輸入語言，不會在切換語系時被覆蓋
