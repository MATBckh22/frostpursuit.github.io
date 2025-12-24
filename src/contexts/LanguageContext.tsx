import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: typeof translations.en;
}

// All translations
export const translations = {
    en: {
        // Navbar
        nav: {
            home: 'Home',
            showcase: 'Showcase',
            highlights: 'Highlights',
            redstone: 'Redstone',
            download: 'Download'
        },
        // Hero
        hero: {
            titleLine1: 'Frost',
            titleLine2: 'Pursuit',
            subtitle: 'The Ultimate Ice<br />Boat Racing.',
            cta: 'Download Map',
            loading: 'Loading Frost Pursuit...',
            hotspots: {
                'spectator-loft': 'Spectator Loft',
                'main-lounge': 'Main Lounge',
                'cable-car': 'Cable Car'
            }
        },
        // Map Showcase
        showcase: {
            totalCount: '7.5',
            million: 'MILLION',
            blocks: 'BLOCKS',
            footnote: '*Adjusted for SMP',
            viewIsometric: 'Isometric',
            viewNoBalloons: 'No Balloons',
            viewTopDown: 'Top Down',
            blockNames: {
                'Packed Ice': 'Packed Ice',
                'Blue Ice': 'Blue Ice',
                'Light Blue Concrete Powder': 'Light Blue Concrete Powder',
                'Stone': 'Stone',
                'Acacia Log': 'Acacia Log',
                'Tuff': 'Tuff',
                'Snow': 'Snow',
                'Barrier': 'Barrier',
                'Deepslate': 'Deepslate',
                'Andesite': 'Andesite'
            }
        },
        // Map Highlights
        highlights: {
            sectionTitle: 'Map Highlights',
            sectionSubtitle: 'in-game screenshots',
            dayMode: 'Day',
            nightMode: 'Night',
            cards: {
                'track': {
                    title: 'Track',
                    description: 'Experience the thrilling ice boat racing track with dynamic loops and challenging turns.'
                },
                'main-lounge': {
                    title: 'Main Lounge',
                    description: 'A cozy gathering space for players to relax and socialize between races.'
                },
                'spectator-loft': {
                    title: 'Spectator Loft',
                    description: 'Watch the races unfold from the best seats in the house.'
                },
                'ice-caves': {
                    title: 'Ice Caves',
                    description: 'Explore the mysterious frozen caverns beneath the racing grounds.'
                },
                'cable-car': {
                    title: 'Cable Car',
                    description: 'Scenic transportation system connecting different areas of the map.'
                },
                'miscellaneous': {
                    title: 'Miscellaneous',
                    description: 'Discover hidden details and decorative elements throughout the map.'
                }
            }
        },
        // Redstone Section
        redstone: {
            sectionTitle: 'Going',
            technicalWord: 'Technical',
            subtitle: 'Powered by redstone',
            belief: 'Our map is fully powered by redstone. No mods, no command blocks, experience the race in pure vanilla.',
            learnMore: 'Learn More',
            items: {
                'Overview': {
                    label: 'Overview',
                    description: 'A complete view of the underlying redstone system used in Frost Pursuit, featuring timer, sorted leaderboards, and display modules working in unison.'
                },
                'Main Computations System': {
                    label: 'Main Computations System',
                    description: 'The core logic system coordinates individual components, handling multiple player IDs and their ranking data to facilitate seamless race management.'
                },
                'Initial Race Registration UI': {
                    label: 'Initial Race Registration UI',
                    description: 'The starting point for new racers to register. Accepts 63 named items, splitting into IDs and sorting placeholders for the system.'
                },
                'Race Whitelist Login UI': {
                    label: 'Race Whitelist Login UI',
                    description: 'Stores historic registrations for returning players to login. It functions as a whitelist checker at the finish line to verify IDs before recording scores.'
                },
                '3-Layer Timer with Shift Registers': {
                    label: '3-Layer Timer with Shift Registers',
                    description: 'A high-precision clock down to the seconds. Uses synchronous carry logic to prevent display ghosting.'
                },
                '3-bit Adder': {
                    label: '3-bit Adder',
                    description: 'A logic component used within the timer and calculation modules to handle binary additions and signal processing.'
                },
                'Insertion Sort Module': {
                    label: 'Insertion Sort Module',
                    description: 'When toggled, it compares new race times against top 10 records, inserting better scores and shifting others down.'
                },
                'Insertion Sort Unit': {
                    label: 'Insertion Sort Unit',
                    description: 'Optimized sorting cell used within the insertion sort module. Stores one player\'s data and handles the comparison logic to determine rank placement.'
                },
                'Generated Box UI Reverse Loader': {
                    label: 'Generated Box UI Reverse Loader',
                    description: 'Manually triggers the generation of the leaderboard chest, organizing player items into the correct ranking order.'
                },
                'Analog-7 Segment Display-Binary Converter': {
                    label: 'Analog-7 Segment Display-Binary Converter',
                    description: 'Converts internal binary signals into readable analog formats for the seven-segment display units.'
                },
                '26-Bit Serial Binary Box Transcoder': {
                    label: '26-Bit Serial Binary Box Transcoder',
                    description: 'Encodes complex race data into a serial binary format for reliable transmission across dimensions or long distances.'
                },
                '26-Bit 4gt Serial Binary Box Decoder': {
                    label: '26-Bit 4gt Serial Binary Box Decoder',
                    description: 'Decodes the 26-bit serial signal back into usable parallel data for the display or storage systems with 4-gametick speed.'
                },
                '23-Bit Mini Time Display': {
                    label: '23-Bit Mini Time Display',
                    description: 'A compact display module handling precise time visualizations during the race.'
                },
                'Nether Portal Chunk Loader': {
                    label: 'Nether Portal Chunk Loader',
                    description: 'Keeps the redstone chunks loaded via Nether portals, ensuring the system runs continuously even when players are far away.'
                },
                '10-item Simple Reverser': {
                    label: '10-item Simple Reverser',
                    description: 'A utility module that reverses item streams, used for organizing data or resetting system states.'
                },
                'Process Manager (Priority Queue Based)': {
                    label: 'Process Manager (Priority Queue Based)',
                    description: 'Prevents logic conflicts by queuing tasks like queries, inputs, and syncs, ensuring only one runs at a time.'
                },
                'Modular Display Unit': {
                    label: 'Modular Display Unit',
                    description: 'A standalone digit unit for the main display, designed to be stackable and easily linked for multi-digit time keeping.'
                },
                'Low-Latency Comparator Chain Unit': {
                    label: 'Low-Latency Comparator Chain Unit',
                    description: 'Uses comparator logic to transmit analog signals instantly over vertical distances, bypassing standard redstone delay.'
                },
                'Latency-Free Analog Downlink (BED Encoded)': {
                    label: 'Latency-Free Analog Downlink (BED Encoded)',
                    description: 'Uses Block Event Delay (BED) encoding to send signals downwards instantly, crucial for the "Nether Display" system.'
                },
                'Instant Item Catcher (Separates Boat and ID)': {
                    label: 'Instant Item Catcher (Separates Boat and ID)',
                    description: 'The finish line mechanism. Instantly separates inputs from the player\'s boat and their ID card to trigger the finish logic.'
                }
            }
        },
        // Footer
        footer: {
            tagline: 'A vanilla Minecraft ice boat racing experience',
            madeWith: 'Made with',
            by: 'by the Frost Pursuit Team',
            copyright: '© 2024 Frost Pursuit. All rights reserved.',
            links: {
                about: 'About',
                contact: 'Contact',
                privacy: 'Privacy'
            }
        }
    },
    zh: {
        // Navbar
        nav: {
            home: '首頁',
            showcase: '地圖展示',
            highlights: '亮點景觀',
            redstone: '紅石系統',
            download: '下載'
        },
        // Hero
        hero: {
            titleLine1: '冰寒',
            titleLine2: '追霜',
            subtitle: '突破极限的<br />冰船赛道',
            cta: '下載地圖',
            loading: '正在載入冰寒追霜...',
            hotspots: {
                'spectator-loft': '觀眾席',
                'main-lounge': '主大廳',
                'cable-car': '纜車'
            }
        },
        // Map Showcase
        showcase: {
            totalCount: '750',
            million: '萬',
            blocks: '方塊',
            footnote: '*已針對SMP調整',
            viewIsometric: '等距視圖',
            viewNoBalloons: '無氣球',
            viewTopDown: '俯視圖',
            blockNames: {
                'Packed Ice': '浮冰',
                'Blue Ice': '藍冰',
                'Light Blue Concrete Powder': '淺藍色混凝土粉末',
                'Stone': '石頭',
                'Acacia Log': '相思木原木',
                'Tuff': '凝灰�ite',
                'Snow': '雪',
                'Barrier': '屏障',
                'Deepslate': '深板岩',
                'Andesite': '安山岩'
            }
        },
        // Map Highlights
        highlights: {
            sectionTitle: '地圖亮點',
            sectionSubtitle: '遊戲內截圖',
            dayMode: '日間',
            nightMode: '夜間',
            cards: {
                'track': {
                    title: '賽道',
                    description: '體驗刺激的冰船競速賽道，包含動態迴環和具挑戰性的轉彎。'
                },
                'main-lounge': {
                    title: '主大廳',
                    description: '温馨的聚會空間，供玩家在比賽間歇放髆和社交。'
                },
                'spectator-loft': {
                    title: '觀眾席',
                    description: '從最佳座位觀看比賽進行。'
                },
                'ice-caves': {
                    title: '冰洞',
                    description: '探索賽道下方神秘的冰凍洞穴。'
                },
                'cable-car': {
                    title: '纜車',
                    description: '連接地圖不同區域的景觀運輸系統。'
                },
                'miscellaneous': {
                    title: '其他',
                    description: '發現地圖中的隱藏細節和裝飾元素。'
                }
            }
        },
        // Redstone Section
        redstone: {
            sectionTitle: '引进',
            technicalWord: '技術',
            subtitle: '由紅石驅動',
            belief: '我們的地圖完全由紅石驅動。無模組、無命令方塊，體驗純原版競速。',
            learnMore: '了解更多',
            items: {
                'Overview': {
                    label: '系統概覽',
                    description: '冰寒追霜底層紅石系統的完整視圖，包含計時器、排序排行榜和顯示模塊協同運作。'
                },
                'Main Computations System': {
                    label: '主計算系統',
                    description: '核心邏輯系統協調各個組件，處理多個玩家ID及其排名數據，實現無縫的比賽管理。'
                },
                'Initial Race Registration UI': {
                    label: '初次比賽UI',
                    description: '新選手註冊的起點。接受63個命名物品，分成ID和排序佔位符。'
                },
                'Race Whitelist Login UI': {
                    label: '比賽白名單登入UI',
                    description: '儲存歷史註冊資料供老玩家登入。在終點作為白名單檢查器，驗證ID後記錄成績。'
                },
                '3-Layer Timer with Shift Registers': {
                    label: '三層計時器+移位寄存器',
                    description: '精確到秒的高精度時鐘。使用同步進位邏輯防止顯示殘影。'
                },
                '3-bit Adder': {
                    label: '三位加法器',
                    description: '計時器和計算模塊中使用的邏輯組件，處理二進制加法和信號處理。'
                },
                'Insertion Sort Module': {
                    label: '插入排序模塊',
                    description: '觸發時將新的比賽時間與前10名記錄比較，插入更好的成績並將其他成績後移。'
                },
                'Insertion Sort Unit': {
                    label: '插入排序單元',
                    description: '緊湊的排序單元。儲存一個玩家的數據並處理比較邏輯以確定排名位置。'
                },
                'Generated Box UI Reverse Loader': {
                    label: '生成盒子UI逆向裝載器',
                    description: '手動觸發排行榜箱子的生成，將玩家物品按正確排名順序排列。'
                },
                'Analog-7 Segment Display-Binary Converter': {
                    label: '模擬-七段顯示器-二進制轉換器',
                    description: '將內部二進制信號轉換為七段顯示器可讀的模擬格式。'
                },
                '26-Bit Serial Binary Box Transcoder': {
                    label: '26位串行二進制盒子編碼器',
                    description: '將複雜的比賽數據編碼為串行二進制格式，用於跨維度或長距離可靠傳輸。'
                },
                '26-Bit 4gt Serial Binary Box Decoder': {
                    label: '26位4gt串行二進制盒子解碼器',
                    description: '以4遊戲刻速度將26位串行信號解碼回可用的並行數據。'
                },
                '23-Bit Mini Time Display': {
                    label: '23位迷你時間顯示器',
                    description: '比賽期間處理精確時間視覺化的緊湊顯示模塊。'
                },
                'Nether Portal Chunk Loader': {
                    label: '地獄門區塊加載器',
                    description: '通過地獄門保持紅石區塊加載，確保系統在玩家遠離時持續運行。'
                },
                '10-item Simple Reverser': {
                    label: '10物品簡單逆序器',
                    description: '用於逆序物品流的實用模塊，用於組織數據或重置系統狀態。'
                },
                'Process Manager (Priority Queue Based)': {
                    label: '進程管理器（基於優先級隊列）',
                    description: '通過隊列管理查詢、輸入和同步等任務來防止邏輯衝突，確保同時只運行一個任務。'
                },
                'Modular Display Unit': {
                    label: '模塊化顯示單元',
                    description: '主顯示器的獨立數字單元，設計為可堆疊且易於連接以實現多位數計時。'
                },
                'Low-Latency Comparator Chain Unit': {
                    label: '低延遲比較器鏈單元',
                    description: '使用比較器邏輯在垂直距離上即時傳輸模擬信號，繞過標準紅石延遲。'
                },
                'Latency-Free Analog Downlink (BED Encoded)': {
                    label: '無延遲模擬下行（BED編碼）',
                    description: '使用方塊事件延遲（BED）編碼向下即時發送信號，對"地獄顯示器"系統至關重要。'
                },
                'Instant Item Catcher (Separates Boat and ID)': {
                    label: '即時物品捕捉器（分離船和ID）',
                    description: '終點線機制。即時分離玩家的船和ID卡以觸發終點邏輯。'
                }
            }
        },
        // Footer
        footer: {
            tagline: '原版Minecraft冰船競速體驗',
            madeWith: '用',
            by: '製作，來自冰寒追霜團隊',
            copyright: '© 2024 冰寒追霜。保留所有權利。',
            links: {
                about: '關於',
                contact: '聯繫',
                privacy: '隱私'
            }
        }
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>('en');
    const t = translations[lang];

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
