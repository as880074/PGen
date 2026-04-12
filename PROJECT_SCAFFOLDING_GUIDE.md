# 🐾 PTalk 專案建置開發指南與 AI 指令集 (Scaffolding Guide)

本文件詳述了 **PTalk (PetTalk)** 專案的核心架構、技術棧規範與建置流程。這份指南旨在提供標準化的開發路徑，並包含可供 AI 助手（如 Claude, Gemini, GPT-4）直接使用的指令集，以確保代碼品質與現有專案一致。

---

## 🛠️ 第一部分：專案技術規格 (Technical Specifications)

### 1. 核心技術棧 (The Stack)
- **基礎框架**: Expo SDK 53 (React Native 0.79) + TypeScript。
- **路由系統**: Expo Router (File-based routing)。
- **狀態管理**: Redux Toolkit (RTK) + RTK Query (核心 API 同步與快取)。
- **地圖技術**: Mapbox GL (`@rnmapbox/maps`)，支援叢集 (Clustering) 與自定義標記。
- **UI 系統**: React Native Elements (@rneui) + Lucide Icons + 原生 StyleSheet。
- **互動動畫**: Reanimated 3 + Gesture Handler + Bottom Sheet (Gorhom)。
- **圖片優化**: `expo-image` (支援快取與 Blurhash)。
- **套件管理**: pnpm。

### 2. 目錄架構規範 (Project Structure)
- `app/`: Expo Router 頁面與資料流核心。
    - `(auth)/`: 認證、註冊、吉祥物引導流程。
    - `(app)/`: 主程式邏輯與 `(tabs)/` 標籤導覽。
    - `store/`: `store.ts` 配置與 `features/` 模組。
- `components/`: 
    - `ui/`: 原子級、無狀態之共用元件（如：`LoadingLogo`, `AppButton`）。
    - `business/`: 業務邏輯元件（如：`RatingDisplay`, `BusinessStatus`）。
    - `map/`: 地圖控制項與標記邏輯。
    - `comment/`: 評論顯示與媒體輪播。
- `constants/`: `style.ts` (顏色、間距、排版) 與全局配置。
- `shared/`: 跨模組型別定義 (Types) 與共用工具函式。
- `hooks/`: 存放自定義 Hooks (如：分頁載入 `useInfiniteQuery`)。

---

## 🤖 第二部分：全域初始化指令 (Scaffolding Prompt)

**用途**：啟動新專案或大型模組重構時，一次性提供給 AI 設定基準規則。

```markdown
# Role: Expert React Native & Expo Developer
# Task: Scaffold a New Project based on "PTalk" Architecture

請依照以下規格建置一個名為 [ProjectName] 的新專案，並確保遵循指定的技術架構與目錄規範：

## 1. 核心規格
- 使用 Expo SDK 53 + TypeScript + Expo Router。
- 狀態管理採用 Redux Toolkit (RTK) 與 RTK Query。
- 地圖整合 @rnmapbox/maps (Mapbox GL)。
- UI 元件庫使用 @rneui/themed (React Native Elements) 與 Lucide Icons。

## 2. 目錄架構原則
- `app/` 嚴格區分 `(auth)` 與 `(app)` 權限流。
- `components/` 必須區分 `ui/` (原子元件) 與 `business/` (業務元件)。
- `store/` 放置於 `app/` 目錄內，確保資料流與路由緊密結合。

## 3. 開發核心原則 (Mandates)
- **DRY 原則**: 發現重複 UI（如全屏 Loading 或 按鈕）必須封裝至 `components/ui/`。
- **UX 優先**: 權限請求（地點、通知）必須由使用者主動觸發，不得連續彈窗。
- **型別安全**: 嚴格執行 TypeScript 介面定義，所有 API Response 必須定義 Type。
- **API 管理**: 統一使用 RTK Query，遵循「保持原始 API 格式，顯示層再轉換」原則。
- **樣式管理**: 嚴禁 Inline Styles，統一引用 `constants/style.ts` 中的顏色常數。
```

---

## 📈 第三部分：分階段建置流程 (Step-by-Step Workflow)

### 階段 1：基礎環境與依賴配置
建立 Expo 環境，安裝核心套件：
```bash
pnpm add expo-router @reduxjs/toolkit react-redux @rnmapbox/maps @gorhom/bottom-sheet @rneui/themed lucide-react-native react-native-reanimated expo-image expo-location redux-persist date-fns
```
*任務：配置 `app.config.js` 支援環境變數，並設定路徑別名 `@/`。*

### 階段 2：定義設計系統 (Design System)
於 `constants/style.ts` 中定義全局顏色常數（Colors）。建立基礎 UI 元件：
- `LoadingLogo`: 具備品牌動畫的全屏遮罩。
- `AppButton`: 封裝樣式、`isLoading` 狀態與觸覺回饋。
- `KeyboardScrollContainer`: 統一解決鍵盤避讓問題。

### 階段 3：資料流架構 (Data Architecture)
- 配置 Redux Store 與持久化。
- 建立 `apiSlice.ts` 並實作 `authApi`, `businessApi`, `commentApi`。
- 在 `authSlice` 實作 `initializeApp` 邏輯（檢查 Token、載入使用者設定）。

### 階段 4：路由佈局與權限控管
- 實作 `app/_layout.tsx`：整合 Provider、全域 Header。
- 建立 `app/(auth)/`（登入/註冊/吉祥物選擇）與 `app/(app)/(tabs)/`。
- 根據 Token 狀態實作跳轉 Guard。

### 階段 5：核心功能開發
- **互動地圖**: Mapbox Clustering 與自定義標記。
- **評價系統**: `RatingDisplay` 元件（抓抓/便便圖示邏輯）。
- **評論系統**: 無限捲動列表與多圖片展示。

---

## 📝 第四部分：關鍵開發規範提醒

1. **API 資料處理**: 保持 API 回傳的原始 Enum 值（如數字），僅在 UI 顯示層透過 `DisplayMap` 轉換為文字。
2. **Header 管理**: 導覽列 UI 應統一在 `_layout.tsx` 的 `Stack.Screen` 選項中配置，避免在頁面內頻繁使用 `useLayoutEffect`。
3. **圖片優化**: 必須使用 `expo-image` 的 `placeholder` 屬性，並設定快取策略 `cachePolicy="memory-disk"`。

---
© 2024-2026 PTalk Team. 專為愛寵物的人們打造。
