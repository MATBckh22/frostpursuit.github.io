import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Language = 'en' | 'zh';

interface ImageFigureProps {
    src: string;
    caption: string;
    figNum: string;
}

function ImageFigure({ src, caption, figNum }: ImageFigureProps) {
    return (
        <figure className="blog-figure">
            <img
                src={`${import.meta.env.BASE_URL}images/frost pursuit redstone/${src}`}
                alt={caption}
                loading="lazy"
            />
            <figcaption>
                <span className="fig-num">{figNum}</span> {caption}
            </figcaption>
        </figure>
    );
}

// Carousel component for subsections
interface SubsectionCarouselProps {
    subsections: { title: string; desc: string }[];
}

function SubsectionCarousel({ subsections }: SubsectionCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? subsections.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === subsections.length - 1 ? 0 : prev + 1));
    };

    if (!subsections || subsections.length === 0) return null;

    return (
        <div className="subsection-carousel">
            <button className="carousel-btn carousel-prev" onClick={goToPrevious} aria-label="Previous">
                ‹
            </button>
            <div className="carousel-content">
                <div className="carousel-card">
                    <h4>{subsections[currentIndex].title}</h4>
                    <p>{subsections[currentIndex].desc}</p>
                </div>
                <div className="carousel-indicators">
                    {subsections.map((_, idx) => (
                        <button
                            key={idx}
                            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
            <button className="carousel-btn carousel-next" onClick={goToNext} aria-label="Next">
                ›
            </button>
        </div>
    );
}

// Helper function to wrap symbols like () and * in spans with Inter font
function renderWithSymbols(text: string) {
    // Split on symbols, keeping the delimiters
    const parts = text.split(/([()*/×+\-=→＞<>])/);
    return parts.map((part, index) =>
        /[()*/×+\-=→＞<>]/.test(part) ? <span key={index} className="symbol-text">{part}</span> : part
    );
}

// Content in both languages
const content = {
    en: {
        backBtn: 'Back to Home',
        category: 'Technical Documentation',
        title: 'Universal Race Track System (Ice Boat)',
        subtitle: 'This article will explain the design philosophy, purpose, and usage of this system in detail.',
        author: 'Yi_Breeze',
        date: 'September 26, 2024',
        toc: 'Table of Contents',
        tocItems: [
            'Initial Race UI',
            'Returning Player UI (Whitelist)',
            'Timer System',
            'Insertion Sort Algorithm',
            'Control Panel',
            'Process Management',
            'Nether Display',
            'Overworld (Start & Finish)',
            'Conclusion'
        ],
        overview: {
            caption: 'Top-down view of the coupled system components—this gives a general understanding of the layout.',
            lead: 'This article will explain the design philosophy, purpose, and usage of this system in detail.'
        },
        sections: {
            registration: {
                title: 'Initial Race UI',
                caption: 'Fig 1.1 Initial Race UI',
                p1: 'The image above shows the first UI that players interact with after naming a stack of items—we\'ll call it the Initial Race UI. The usage is simple: when participating for the first time, each player names a stack of items. They keep one item on them as an ID card (used to trigger the finish line and record their time), and place the remaining 63 items into this UI.',
                caption2: 'Fig 1.2 Named Item Input Example',
                note: 'Note: Items must be placed in strict batches of 63. After all players have submitted, press the note block to begin processing.',
                p2: 'This component then splits each batch of 63 named items into 15 + 48. The 15 items go to the Returning Player UI (introduced next) for future race ID cards. The 48 items go to the Insertion Sort Algorithm. This processing happens while players are racing—no waiting required. Since a race has at most 10 simultaneous players (meaning at most 10 stacks of 63 items), processing takes about 4.2 minutes, while the race itself takes about 6 minutes—plenty of time. These items will be processed and placed in their proper locations before players reach the finish line.'
            },
            whitelist: {
                title: 'Returning Player UI (Whitelist)',
                caption: 'Fig 2.1 Returning Player UI (Whitelist)',
                p1: 'After a player has raced once, 15 of their named items are transferred here from the Initial Race UI. For subsequent races, players simply find their named item (ID card) in the chest on the right side of this UI and take one to participate.',
                caption2: 'Fig 2.2 Chest Content Display',
                p2: 'Additionally, this UI serves as a whitelist validator. When a player places/throws their ID card at the finish line, it first comes here for verification:',
                invalid: 'If invalid (the named item doesn\'t exist in the chest): The item is output to the left barrel, the track timer doesn\'t record the time, and the player\'s result is voided.',
                valid: 'If valid (a matching named item exists in the chest): Another ID card is retrieved from the chest and output. Combined with the player\'s submitted ID card, two ID cards enter the system. One is used to generate the current race\'s box UI, and one is used for timing—recording a 3-digit analog signal as the player\'s time, outputting to the current race display, and storing a copy for later processing by the Insertion Sort Algorithm (historical match box UI).',
                caption3: 'Fig 2.3 Finish Line Invalid Input'
            },
            timer: {
                title: 'Timer System',
                caption1: 'Fig 3.1.1 Three-layer timer + shift registers ×10',
                h31: '3.1 Timer Overview',
                p1: 'The green-outlined portion in the diagram is the timer; the stacked extension is the shift register, capable of storing 10 pieces of information for later player decisions about inserting into the sorting algorithm (3-digit analog signal + ID card). The top-right end is the output section, which sequentially reads register signals and sends them to the current match display. Stored information is automatically cleared when the next race starts. The timer has three layers: from top to bottom, minutes, seconds (tens digit), and seconds (ones digit)—a 3-digit analog signal. For example, 7 2 1 represents 7 minutes 21 seconds.',
                p1b: 'On this basis, every time an ID card passes the whitelist check at the Non-Initial Race UI, it is sent here for a reading. The ID card is shift-registered alongside its corresponding 3-digit analog signal, while simultaneously outputting this signal to the current match display—until 10 signals are collected.',
                caption2: 'Fig 3.1.2 3-Digit Analog Signal (14 min 03 sec)',
                h32: '3.2 Carry Rules',
                p2: 'To ensure every second can be captured, the three analog signals must carry synchronously. Example: 0 5 9\'s next value is 1 0 0—the timer must ensure all three digits change simultaneously. This is complex in-game, so we modified the carry rule: 0 5 9 → 20gt → 0 5 10 → 20gt → 0 6 1 → 18gt → 1 0 1 → 2gt → 1 0 2. From 59 seconds → 60 seconds → 61 seconds (1:01) → 61 seconds (1:01) → 62 seconds (1:02).',
                p3: 'During this process, when the ones digit goes from 9 to 10, it triggers a carry. After a 20gt delay, the tens and ones digits simultaneously become 6 and 1. At this point, the tens digit changing from 5 to 6 triggers another carry, and all three respond together. After 18gt it becomes 1 0 1 = 0 6 1, then after 2gt becomes 1 0 2, still satisfying the 20gt (1 second) transition from 61 to 62 seconds. Essentially, by modifying the carry rules, we provide enough in-game delay time for judgment during carries, achieving per-second accurate readings without modifying the original timer. However, this means data needs processing before the display can read it—this component is called the "carry processor" (green section in the overview).',
                h33: '3.3 Carry Processor',
                p4: 'The carry processor converts the 3-digit analog signal processed by the system into display-readable signals. For example: 9 5 10 corresponds to 10 minutes exactly. After passing through the carry processor, it becomes a 4-digit signal: 2 1 1 1 (where 10 = 0 + 1 each digit), so the display shows 10:00.',
                p4b: 'BTW, the final carry processor is not on the left side of the register in the overview—it\'s placed at the display\'s input (Fig 3.3.2).',
                caption3: 'Fig 3.3.1 Carry Processor: Converts the 3-digit analog signal processed by the system into display-readable signals',
                caption4: 'Fig 3.3.2 Carry Processor Location'
            },
            sorting: {
                title: 'Insertion Sort Algorithm',
                caption1: 'Fig 4.1 Insertion Sort Algorithm',
                lead: 'This is the core of the entire system. In one sentence: it automatically sorts and stores incoming data. Sounds simple—if the data were just one analog signal, it would indeed be simple. But as introduced earlier, the stored data is a 3-digit analog signal, plus an ID card stored alongside it.',
                h3: 'Comparison Logic',
                p1: 'To compare values, we need to compare these three analog signals sequentially from top to bottom. If the new data is smaller than stored data, the new input overwrites, and the overwritten data cascades to the next unit. But in-game, comparing "which is smaller" is hard to implement—typically you invert via comparator then compare, making it "which is larger." So we invert data before input, making each unit compare for larger rather than smaller-then-invert—much simpler unit design.',
                steps: [
                    'Minutes Comparison: If the new data\'s minutes digit is greater than stored, overwrite directly. If equal, compare the seconds tens digit. If less than stored, allow new data to pass to the next unit for comparison.',
                    'Seconds Tens Comparison: Same logic—if greater than stored, overwrite directly. If equal, compare the seconds ones digit. If less than stored, allow new data to pass to the next unit for comparison.',
                    'Seconds Ones Comparison: If greater, overwrite. If less than or equal, cascade to the next unit without overwriting.',
                    'Cascade: For example, if stored data is 8 13 14 and new input is 8 13 15 (note: these are inverted values). 8=8, 13=13, 15>14, so 8 13 15 overwrites 8 13 14, and 8 13 14 is re-input to compare with the next unit. This continues until all 10 units are traversed, discarding the smallest value and returning its ID card to the Returning Player UI.'
                ],
                caption2: 'Fig 4.2 Algorithm Wiring Implementation',
                caption3: 'Fig 4.3 Insertion Sort Unit',
                warning: 'During design, since the unit design was already finalized and nearly optimal, implementing cascade-after-overwrite was nearly impossible. So we decided to re-input overwritten data—the effect is the same. This increases algorithm complexity and processing time, but dramatically reduces physical size. In Fig 4.3, the lower-left 5×5 area is the algorithm unit, while the upper-right 3×5 is temporary storage for re-inputting overwritten data.',
                caption4: 'Fig 4.4 ID Card Storage',
                p2: 'Besides storing the 3-digit analog signal, there is also ID card storage below the algorithm. It uses the signal\'s own path to activate droppers, achieving simultaneous calculation and storage of signal and ID card.',
                p3: 'The core purpose of the algorithm is to display player result rankings on the historical match display and player ID rankings in the historical match box UI.',
                caption5: 'Fig 4.5 48 Item Storage',
                p4: 'As mentioned earlier, items are split into 15 + 48. The 48 items are stored in the insertion sort algorithm. When players confirm sync, data and ID cards are synced to the corresponding display and box UI. Here, the stored 48 items are used for sync, rather than directly outputting the stored ID cards. After sync, the data and ID cards stored in the insertion sort algorithm remain unchanged. The advantage is that even if players mess up the box UI, it doesn\'t affect the ID card order in the algorithm—just sync again.',
                caption6: 'Fig 4.6 Box UI Example',
                p5: 'Fig 4.6 shows the generated box UI example. The first row shows gold, silver, and bronze medals plus unnamed cobblestone. Redstone blocks represent player ID cards (same as the last 8 filler papers, used redstone blocks for distinction).',
                p6: 'To display rankings composed of player ID cards in the box UI, it\'s inevitable that the same player might occupy multiple ranks. To prevent the same item (ID card) from stacking, we use reverse loading technology. I won\'t elaborate here; if interested, check out Redberd\'s video.',
                link: 'Reverse Loading Principle',
                caption7: 'Fig 4.7 Box UI Generation Reverse Loading'
            },
            control: {
                title: 'Control Panel',
                caption1: 'Fig 5 Control Panel',
                p1: 'The panel uses running indicator lights + selector + confirmation input. When players select an operation, they must click the note block on the left to confirm—this prevents accidental triggers. Below we introduce each light and selector function.',
                h3: 'Available Operations',
                items: [
                    {
                        title: '5.1 Query Input (Overworld Query)',
                        desc: 'The query input is located in the Overworld. Players can input the ID of the player they want to query. The system will then search for the player\'s data in the database and display it on the Overworld display.',
                        subsections: [
                            {
                                title: '5.1.1 Overworld UI',
                                desc: 'The Overworld UI box displays historical player ID rankings from the insertion sort, with the sync operation introducing automatic updates later. On the right side, the lectern, note block, and redstone lamp serve as query controls. The query operation enables searching for player rankings within the insertion sort in the Overworld—displaying times from the full 10-hour-capable display for results. Since a large enough display for 10 records isn\'t feasible in the Overworld, a single query display is provided instead (Fig 5.1.9).'
                            },
                            {
                                title: '5.1.2 Query Controls',
                                desc: 'The lectern selects ranks 1-10 within the insertion sort. The note block confirms input, and the redstone lamp indicates operation status, preventing multiple inputs.'
                            },
                            {
                                title: '5.1.3 Cross-Dimension Signal Transfer',
                                desc: 'When players send ranking info, a shulker box filled with scissors is placed in the Overworld (Fig 5.1.3) for cross-dimension analog signal transfer (1-10). This is sent to the Nether insertion sort query input (Fig 5.1.4). The control panel\'s corresponding light illuminates. After the query completes (or times out with loading), the extracted 3-digit analog signal passes through the carry processor, converts via the analog-to-7-segment display-to-binary converter (Fig 5.1.5), outputs 23-bit binary encoded as non-stackable water bottles (Fig 5.1.6), transmits to the Overworld, decodes at the Overworld decoder (Fig 5.1.7), and outputs the 23-bit binary signal to the dedicated Overworld display (Fig 5.1.8, Fig 5.1.9) to read and show the time.'
                            },
                            {
                                title: '5.1.4 Why Cross-Dimension Transmission?',
                                desc: 'Why use this method for cross-dimension signal transfer? Can\'t we just send the analog signal directly to display the time after querying? Of course we could—but the main prerequisite is having space in the Overworld for a 7-segment display. As seen in Fig 5.1.10, the cabin atop the mountain has almost no space for a 7-segment display. Even the compact display in Fig 5.1.8 barely fits. So we designed this query system to adapt to the map. This way, the Overworld only needs to house the components from Fig 5.1.7 and Fig 5.1.8. Moreover, because binary signal transmission is very simple, the component in Fig 5.1.7 has almost no position requirements—it can be placed anywhere it fits. Admittedly, this transmission method takes more time, but even the fastest method isn\'t much faster. Real-time queries are inherently difficult. The display here mainly serves to show historical match rankings in the Overworld, rather than real-time queries.'
                            }
                        ],
                        images: [
                            { src: '图5.1.1 查询指示灯.png', caption: 'Fig 5.1.1 Query Indicator Light' },
                            { src: '图5.1.2 主世界UI.png', caption: 'Fig 5.1.2 Overworld UI' },
                            { src: '图5.1.3 剪刀盒.png', caption: 'Fig 5.1.3 Scissor Box' },
                            { src: '图5.1.4 地狱端插入排序查询输入位置.png', caption: 'Fig 5.1.4 Nether Insertion Sort Query Input' },
                            { src: '图5.1.9 主世界显示器.png', caption: 'Fig 5.1.9 Overworld Display' },
                            { src: '图5.1.10 山体内饰与显示器.png', caption: 'Fig 5.1.10 Mountain Interior & Display' },
                            { src: '图5.1.11 山体内饰.png', caption: 'Fig 5.1.11 Mountain Interior' }
                        ]
                    },
                    {
                        title: '5.2 Save Current Match',
                        desc: 'This operation saves the current match data into the database. It is usually performed after a match is completed.',
                        images: []
                    },
                    {
                        title: '5.3 Sync Top 10',
                        desc: 'This operation synchronizes the top 10 players from the database to the display and the box UI. This ensures that the rankings are up-to-date.',
                        images: []
                    },
                    {
                        title: '5.4 Clear Current Match',
                        desc: 'This operation clears the data of the current match. This is useful if a match needs to be restarted or if there was an error.',
                        images: []
                    },
                    {
                        title: '5.5 Chunk Loader',
                        desc: 'The system uses a chunk loader to keep the relevant chunks loaded in the Nether. This ensures that the redstone circuits continue to work even when no players are nearby.',
                        images: [
                            { src: 'Nether Portal Chunk Loader-min.webp', caption: 'Fig 5.5.2 Nether Portal Chunk Loader' }
                        ]
                    },
                    {
                        title: '5.6 Reset System',
                        desc: 'This operation resets the entire system to its initial state. This is a dangerous operation and should only be used when necessary.',
                        images: []
                    },
                    {
                        title: '5.7 Game Clock',
                        desc: 'The game clock tracks the time elapsed in the current match. It is displayed on the scoreboard.',
                        images: []
                    }
                ]
            },
            process: {
                title: 'Process Management (Priority Queue)',
                caption: 'Fig 6.1 Process Management (Priority Queue)',
                p1: 'From sections 5.1 to 5.4, we know that these four operations conflict with each other. For example, the query process cannot perform calculation operations, and sync cannot perform query operations. So we need a process manager to ensure that only one process runs after each player input operation.',
                p2: 'Signals output by the player at the selector will first be processed by the process manager. The process manager checks if a process is running; if so, it waits for that process to complete before starting the next one. Simply put, it ensures only one process runs at any given time.'
            },
            display: {
                title: 'Nether Display',
                captions: [
                    'Fig 7.1 Nether Display (Left: Historical Matches, Right: Current Match)',
                    'Fig 7.2 Display Unit',
                    'Fig 5.1.5 Analog to 7-Segment Display Binary Converter',
                    'Fig 5.1.6 Serial Binary Box Encoder (26-bit)',
                    'Fig 7.3 Low-Latency Comparator Chain Unit (2gt per unit)',
                    'Fig 7.4 Latency-Free Analog Downlink (BED Encoding)'
                ],
                h3: 'Cross-Dimension Transmission',
                p1: 'The Nether display simply uses 7-segment displays, with signals transmitting bottom-to-top. However, since the overworld cabin on the ice mountain has a high Y value, the entire system is built high (considering cross-dimension data transmission), so current and historical match signals sent from the system need to first go down, then up. To let players see their results quickly after crossing the finish line and passing through the Nether portal, the signal uses low-latency comparator chains (2gt per unit), and downlink uses BED encoding—achieving 20gt downlink regardless of height.'
            },
            overworld: {
                title: 'Overworld (Start & Finish)',
                caption1: 'Fig 8.1 Start UI',
                caption2: 'Fig 8.2 Key',
                caption3: 'Fig 8.3 Finish Line',
                caption4: 'Fig 8.4 Instant Dropper & Boat Separation'
            },
            appendix: {
                title: 'Appendix',
                images: [
                    { src: '侧视图.png', caption: 'Side View' },
                    { src: '传输链.png', caption: 'Transmission Chain' },
                    { src: '显示器.png', caption: 'Display' },
                    { src: '俯视图.png', caption: 'Top View' }
                ]
            },
            credits: {
                title: 'Conclusion',
                building: 'Building',
                redstone: 'Redstone',
                thanks: 'Credits & Thanks',
                original: 'Original article:',
                endingNote: 'That wraps up the main content. While it claims to be a detailed explanation, it\'s not exhaustively detailed—truly laying out every design thought would probably make the article quite dry. The system\'s highlights are the algorithm automatically sorting historical scores, plus the coupling between all components—parts relate to each other, and the entire system works almost entirely behind the scenes. In theory, it could be applied to any racing-type project.'
            }
        },
        learnMore: 'Learn More'
    },
    zh: {
        backBtn: '返回首頁',
        category: '技術文檔',
        title: '通用賽道系統詳解（冰船）',
        subtitle: '本文將詳細解釋此系統的設計思路、用途和用法',
        author: '晚的Breeze',
        date: '2024年09月26日',
        toc: '目錄',
        tocItems: [
            '初次比賽UI',
            '非初次比賽UI（白名單）',
            '計時器',
            '插入排序算法',
            '控制面板',
            '進程管理',
            '地獄顯示器',
            '主世界（起點與終點）',
            '結尾'
        ],
        overview: {
            caption: '系統各個部件耦合後的俯視圖 通過此圖能大致了解布局',
            lead: '本文將詳細解釋此系統的設計思路、用途和用法。先放幾張冰船美圖。'
        },
        sections: {
            registration: {
                title: '初次比賽UI',
                caption: '圖1.1 初次比賽UI',
                p1: '上圖為視頻裡的玩家在命名了一組的物品後交互的第一個UI，暫且稱他為初次比賽UI。這個部件的用法很簡單，參賽玩家在初次比賽時都會命名一組物品。每個玩家將命名的一組物品留一個在身上用於比賽結束後的觸發終點計入成績的操作（ID卡），將剩餘的63個物品放入此UI。',
                caption2: '圖1.2 命名物輸入示例',
                note: '注意：需要嚴格按照每批命名物63個的要求放入。等待所有玩家都放入後，按下音符盒開始處理。',
                p2: '接下來這個部件會將每一堆63個的命名物分成15+48個。15個物品會被分到下一部分介紹的非初次比賽UI處，用於這些玩家下一次比賽時的ID卡。48個物品被分到插入排序算法處。這些過程會在玩家比賽過程中進行，玩家不需要在此等待。由於一場比賽至多同時有10位玩家遊玩（這裡理論上也至多只會出現10堆63個物品，處理過程約在4.2分鐘，賽道的賽程大約在6分鐘，4.2分鐘完全是足夠的）在玩家到達終點前，這些命名物就會被處理好放入需要的位置。'
            },
            whitelist: {
                title: '非初次比賽UI（白名單）',
                caption: '圖2.1 非初次比賽UI（白名單）',
                p1: '當玩家有過一次比賽記錄後，會有15個命名物從初次比賽UI中被分入此處。此後玩家只需要到此UI右側的箱子內找到自己的命名物（ID卡）並取出一個進行比賽即可。',
                caption2: '圖2.2 箱子內容展示',
                p2: '除此之外，此UI還有著白名單的作用。玩家在終點放/丟入的ID卡會先到此處進行比對：',
                invalid: '若不符合（即箱子內無此命名物）：則會輸出到左側木桶中，賽道的計時器不會觸發取數，玩家成績作廢。',
                valid: '若符合（箱子內有同樣的命名物）：則會將箱子內的ID卡再取一個並輸出。此時加上玩家投入的ID卡會有兩個ID卡進入系統中。一個用於生成本次比賽的盒子UI，一個用於計時取數，在計時器中取一個三位的模電信號作為玩家的成績，輸出到本次比賽的顯示器上，並寄存一份用於後續是否輸入插入排序算法的處理（歷史對局盒子UI）。',
                caption3: '圖2.3 終點非法輸入'
            },
            timer: {
                title: '計時器',
                caption1: '圖3.1.1 三層計時器+三層移位寄存器×10',
                h31: '3.1 計時器概覽',
                p1: '圖示綠色框出的部分為計時器，後續延伸的堆疊部分為移位寄存器，共能儲存10個信息，用於後續玩家判斷是否輸入插入排序算法（三位模電信號與ID卡）。右上末端為輸出部分，用於依次讀取寄存器內的信號並發送到當前對局顯示器上，信息儲存到下一次比賽開始後自動清除。計時器分為三層，從上至下依次為分、秒十位、秒個位，即三位模電信號。舉個例子，7 2 1 即代表7分21秒。',
                p1b: '在此基礎上，每當終點有一個ID卡經過非初次比賽UI的白名單檢查後，ID卡會送到此處進行一次取數，並將ID卡與三位模電信號對應移位，同時讀取此模電信號輸出到當前對局顯示器，直到取滿10個信號。',
                caption2: '圖3.1.2 三位模電信號(14分03秒)',
                h32: '3.2 進位規則',
                p2: '為保證計時器的每一秒都能夠被取到，要做到三位模電信號的進位過程同步。例：0 5 9下一個數為1 0 0，計時器需要保證這三個數的變化同時出現。但在遊戲中完成這個步驟會比較複雜，於是將進位規則簡單改一下：0 5 9→20gt→0 5 10→20gt→0 6 1→18gt→1 0 1→2gt→1 0 2。59秒→60秒→61秒（1分01秒）→61秒（1分01秒）→62秒（1分02秒）。',
                p3: '在這過程中，秒個位從9到10，觸發進位，延時20gt後，秒十位和秒個位同時變為6和1。此時秒十位從5變為6，觸發進位，三位同時響應，延時18gt後變為1 0 1=0 6 1，再過2gt後變為1 0 2，仍然滿足20gt（1秒）後從61秒到62秒的變化。本質上是通過改變進位規則在進位時給足了遊戲內延時的判斷時間，在不需要更改原本計時器的同時完成精確到每一秒的讀取操作。但這樣做數據就需要加工過才能夠被顯示器讀取，這個部件在最開始的俯視圖中綠色部分被稱為進位器。',
                h33: '3.3 進位器',
                p4: '將系統中處理的三位模電信號轉換為顯示器可讀的信號。例如：9 5 10 對應時間為10分整，經過進位器後將變為2 1 1 1的四位信號（即10 0 0每一位+1），顯示器會將2 1 1 1顯示為10:00。',
                p4b: 'btw 最後進位器並不在俯視圖內寄存器的左側，而是放在了顯示器的輸入口（圖3.3.2）',
                caption3: '圖3.3.1 進位器：將系統中處理的三位模電信號轉換為顯示器可讀的信號',
                caption4: '圖3.3.2 進位器位置'
            },
            sorting: {
                title: '插入排序算法',
                caption1: '圖4.1 插入排序算法',
                lead: '這是整個系統的核心部分。用一句話概述它的功能：將輸入的數據自動排序後儲存。聽起來很簡單，如果數據只是一個模電信號那實現起來確實很簡單。但前面介紹過了，這裡儲存的數據是三位模電信號，並且還有ID卡會與信號一起儲存。',
                h3: '比對邏輯',
                p1: '要做比大小的操作就需要這三位模電信號從上往下依次對比，若新的數據比儲存的數據更小，則將新的輸入覆蓋輸入，被覆蓋的數據則順延到第二個單元。但遊戲中比誰更小這個操作並不好實現，通常通過比較器取反後再進行比較，此時則是比誰更大。既然如此，我們直接將數據在輸入前取反，這樣每個單元都變成比大，而不是原來的比小後在單元內取反再比大，單元的設計就更加簡單。',
                steps: [
                    '分位比對：新輸入的數據中，分位若大於儲存的數據，則直接覆蓋。若等於儲存的數據，則比對秒十位。若小於儲存的數據，則允許新數據輸出到下一單元比對。',
                    '秒十位比對：同理，若大於儲存的數據，則直接覆蓋。若等於儲存的數據，則比對秒個位。若小於儲存的數據，則允許新數據輸出到下一單元比對。',
                    '秒個位比對：若大於則覆蓋，若小於等於則順延到下一單元，不進行覆蓋。',
                    '級聯：例如儲存的數據為8 13 14，新輸入的數據為8 13 15（注意這裡是取反後的數據）。8=8，13=13，15＞14，最後8 13 15會覆蓋8 13 14，而8 13 14會重新輸入並與下一個單元比對，直到10個單元遍歷完成後捨棄一個最小的數據，並將ID卡送回非初次比賽UI處。'
                ],
                caption2: '圖4.2 算法布線實現',
                caption3: '圖4.3 插入排序算法-單元',
                warning: '設計過程中，由於單元的設計已經確定，且近乎於最簡解法，覆蓋後順延的操作幾乎無法完成，於是決定將被覆蓋的數據重新輸入，實現的效果是一樣的。這樣做算法複雜度會更高，計算所需時間會更長，但體積會小得多。圖4.3中，左下側5×5的範圍是算法單元，右上側3×5則是臨時寄存，用於將被覆蓋的數據重新輸入。',
                caption4: '圖4.4 ID卡储存',
                p2: '除了三位模電信號的儲存，算法下方還有ID卡的儲存，使用了信號本身運行的路徑來激活投擲器一起運行，達到信號與ID卡同時計算和儲存的效果。',
                p3: '算法的核心目的是為了能夠在歷史對局顯示器上顯示玩家的成績排行，在歷史對局盒子UI中顯示玩家ID的排名。',
                caption5: '圖4.5 48物品存放',
                p4: '前面提到了物品被分成了15+48個，其中48個物品儲存在插入排序算法中。在玩家確認同步時將數據與ID卡同步到對應的顯示器與盒子UI中，這裡會取用儲存的48個物品進行同步，而不是直接將儲存的ID卡輸出。同步完成後插入排序算法中儲存的數據和ID卡不會變化。這樣做的優點是玩家即使打亂了盒子UI，也不影響算法內ID卡的順序，打亂後只需要再次同步即可。',
                caption6: '圖4.6 盒子UI示例',
                p5: '圖4.6為生成的盒子UI示例，第一排表示金銀銅牌以及不記名的圓石，紅石塊表示玩家的ID卡（與最後8個填充的紙相同，用紅石塊方便區分）。',
                p6: '要在盒子UI中顯示由玩家ID卡組成的排名，不可避免的可能會出現同一名玩家佔據多個排名的情況。要讓同一種物品不互相堆疊（ID卡），就要用到倒序裝填的科技這裡不做贅述，想了解可以去看小紅的視頻。',
                link: '倒序裝填原理',
                caption7: '圖4.7 生成盒子UI的倒序裝填'
            },
            control: {
                title: '控制面板',
                caption1: '圖5 控制面板',
                p1: '面板使用運行指示燈+單選器+確認輸入操作。玩家選中某個操作時，需要再點一下左側的音符盒確認輸入，此操作是為了防止誤觸。接下來依次介紹每個燈和單選的用途。',
                h3: '可用操作',
                items: [
                    {
                        title: '5.1 查詢 輸入（主世界查詢）',
                        desc: '查詢輸入位於主世界。玩家可以輸入想要查詢的玩家ID。系統隨後會在數據庫中搜索該玩家的數據，並將其顯示在主世界顯示器上。',
                        subsections: [
                            {
                                title: '5.1.1 主世界UI',
                                desc: '主世界UI的盒子UI用於顯示插入排序中歷史對局的玩家ID排名，在後續介紹的同步操作後自動同步。右側講台、音符盒、紅石燈則為查詢的面板。查詢操作是為了在主世界能夠查詢插入排序中的三位模電信號，即時間成績。由於主世界並不適合放置一個巨大的能夠顯示10個時間的顯示器，所以放一個顯示器在主世界用於查詢（圖5.1.9）。'
                            },
                            {
                                title: '5.1.2 查詢控制',
                                desc: '講台用於選取1~10在插入排序中的不同排名。音符盒用於確認輸入，紅石燈為運行指示，並防止多次輸入。'
                            },
                            {
                                title: '5.1.3 跨維度信號傳輸',
                                desc: '當玩家發送排名信息後，主世界會裝填一個由剪刀填充的潛影盒（圖5.1.3）用來跨維度傳輸模電信號(1~10)，並發送到地獄端插入排序中查詢輸入的位置（圖5.1.4）。同時控制面板對應的燈亮起。查詢完畢後熄滅（加載則會持續一段時間）。取出的三位模電信號經過進位器後，轉換的信號輸入模轉七段數碼管轉二進制（圖5.1.5），輸出的23bit二進制信號再轉換為由不可堆疊與水瓶組成的編碼盒（圖5.1.6）後傳輸到主世界，主世界解碼（圖5.1.7）後輸出23bit的二進制信號給專用的顯示器（圖5.1.8 圖5.1.9）讀取並顯示時間。'
                            },
                            {
                                title: '5.1.4 為什麼要跨維度傳輸？',
                                desc: '為什麼要用這樣的方式跨維度傳輸信號呢？查詢後直接發送對應模電信號顯示時間不行嗎？當然可以，但這一切的大前提是主世界有空間放置七段數碼管的顯示器。從圖5.1.10中可以看出，山頂的小屋下幾乎沒有空間能夠放置帶七段數碼管的顯示器了。即使是圖5.1.8的小體積顯示器也只是堪堪放下。於是我們設計了這一套查詢系統來適配地圖。這樣一來，主世界就只需要放置圖5.1.7與圖5.1.8的部件即可。並且因為二進制信號的傳輸方式十分簡單，圖5.1.7的部件對位置幾乎沒有要求，可以塞在任意能塞得下的地方。誠然，這樣的傳輸方式會消耗更多的時間，但即使是最快的方式也並沒有比這種方式快多少。實時查詢本身就十分困難，這裡的顯示器更多起到的是在主世界顯示歷史對局排行榜時間的作用，而不是實時查詢。'
                            }
                        ],
                        images: [
                            { src: '图5.1.1 查询指示灯.png', caption: '圖5.1.1 查詢指示燈' },
                            { src: '图5.1.2 主世界UI.png', caption: '圖5.1.2 主世界UI' },
                            { src: '图5.1.3 剪刀盒.png', caption: '圖5.1.3 剪刀盒' },
                            { src: '图5.1.4 地狱端插入排序查询输入位置.png', caption: '圖5.1.4 地獄端插入排序查詢輸入位置' },
                            { src: '图5.1.9 主世界显示器.png', caption: '圖5.1.9 主世界顯示器' },
                            { src: '图5.1.10 山体内饰与显示器.png', caption: '圖5.1.10 山體內飾與顯示器' },
                            { src: '图5.1.11 山体内饰.png', caption: '圖5.1.11 山體內飾' }
                        ]
                    },
                    {
                        title: '5.2 把當前對局的成績輸入插入排序算法',
                        desc: '此操作將當前比賽數據保存到數據庫中。通常在比賽結束後執行。',
                        images: []
                    },
                    {
                        title: '5.3 同步歷史前十名的盒子UI和顯示器',
                        desc: '此操作將數據庫中的前10名玩家同步到顯示器和盒子UI。這確保了排名是最新的。',
                        images: []
                    },
                    {
                        title: '5.4 清空當前對局的寄存器',
                        desc: '此操作清除當前比賽的數據。如果需要重新開始比賽或出現錯誤，這很有用。',
                        images: []
                    },
                    {
                        title: '5.5 區塊加載器運行',
                        desc: '系統使用區塊加載器保持地獄中的相關區塊加載。這確保了即使沒有玩家在附近，紅石電路也能繼續工作。',
                        images: [
                            { src: 'Nether Portal Chunk Loader-min.webp', caption: '圖5.5.2 地獄門加載器' }
                        ]
                    },
                    {
                        title: '5.6 重置系統',
                        desc: '此操作將整個系統重置為初始狀態。這是一個危險的操作，應僅在必要時使用。',
                        images: []
                    },
                    {
                        title: '5.7 遊戲時鐘',
                        desc: '遊戲時鐘跟蹤當前比賽經過的時間。它顯示在記分板上。',
                        images: []
                    }
                ]
            },
            process: {
                title: '進程管理（優先級隊列）',
                caption: '圖6.1 進程管理（優先級隊列）',
                p1: '從章節5.1到章節5.4中的介紹可以知道，在執行這四個操作時，它們都是互相衝突的。比如查詢的過程算法無法進行計算的操作，同步的時候無法進行查詢的操作。所以我們需要一個進程管理來保證玩家每次輸入操作後都只有一個進程在運行。',
                p2: '玩家在單選器輸出的信號都會先到進程管理進行處理，進程管理會判斷是否有進程正在運行，若有則會等待此進程完成後再進行下一個進程。簡單來說就是在某一時刻保證只有一個進程正在運行。'
            },
            display: {
                title: '地獄顯示器',
                captions: [
                    '圖7.1 地獄顯示器（左 歷史對局 右 當前對局）',
                    '圖7.2 顯示器單元',
                    '圖5.1.5 模轉七段數碼管轉二進制',
                    '圖5.1.6 串行二進制轉編碼盒 26bit',
                    '圖7.3 低延遲比較器鏈單元（每個單元2gt）',
                    '圖7.4 無延遲模電下傳（BED編碼）'
                ],
                h3: '跨維度傳輸',
                p1: '地獄這裡的顯示器只是用七段數碼管的顯示器，信號傳遞是從下往上的。但由於主世界冰山上的小屋y值很高，對應整個系統也做的很高（要考慮跨維度信息傳遞），所以從系統中發送的當前對局與歷史對局信號也需要先下傳再上傳。為了讓玩家到達終點後穿過地獄門能盡快看到成績，這裡傳輸信號用了低延遲的比較器鏈（每個單元2gt），下傳用了BED編碼，能做到無視高度的20gt下傳。'
            },
            overworld: {
                title: '主世界（起點與終點）',
                caption1: '圖8.1 起點UI',
                caption2: '圖8.2 key',
                caption3: '圖8.3 終點',
                caption4: '圖8.4 瞬投与船分离'
            },
            appendix: {
                title: '附錄',
                images: [
                    { src: '侧视图.png', caption: '側視圖' },
                    { src: '传输链.png', caption: '傳輸鏈' },
                    { src: '显示器.png', caption: '顯示器' },
                    { src: '俯视图.png', caption: '俯視圖' }
                ]
            },
            credits: {
                title: '結尾',
                building: '建築',
                redstone: '紅石',
                thanks: '借物表',
                original: '原文：',
                endingNote: '到這裡正文基本就結束了。說是詳細解釋其實也沒有特別詳細，真正把整個設計思路羅列清楚估計文章會很枯燥無味。系統的亮點在於算法自動排序歷史成績，以及各個部分的耦合，部件之間互相關聯，整個系統幾乎都是在幕後工作的，所以理論上能應用在任何一個競速類項目。'
            }
        },
        learnMore: '了解更多'
    }
};

export function RedstoneBlog() {
    const [lang, setLang] = useState<Language>('en');
    const t = content[lang];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar forceTheme="redstone" />
            <main className={`blog-main ${lang === 'zh' ? 'lang-zh' : 'lang-en'}`}>
                <article className="blog-article">
                    {/* Header Row: Back Button + Language Toggle */}
                    <div className="blog-header-row">
                        <Link to="/" className="blog-back-btn">
                            <span className="back-arrow">←</span> {t.backBtn}
                        </Link>
                        <div className="blog-lang-toggle">
                            <button
                                className={lang === 'en' ? 'active' : ''}
                                onClick={() => setLang('en')}
                            >
                                EN
                            </button>
                            <span className="lang-divider">/</span>
                            <button
                                className={lang === 'zh' ? 'active' : ''}
                                onClick={() => setLang('zh')}
                            >
                                繁中
                            </button>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <header className="blog-hero">
                        <div className="blog-hero-content">
                            <span className="blog-category">{t.category}</span>
                            <h1>{renderWithSymbols(t.title)}</h1>
                            <p className="blog-subtitle">{t.subtitle}</p>
                            <div className="blog-meta">
                                <span>By <strong>{t.author}</strong></span>
                                <span className="meta-divider">•</span>
                                <span>{t.date}</span>
                            </div>
                        </div>
                    </header>

                    {/* Table of Contents */}
                    <nav className="blog-toc">
                        <h2>{t.toc}</h2>
                        <ol>
                            {t.tocItems.map((item, i) => (
                                <li key={i}><a href={`#section-${i + 1}`}>{renderWithSymbols(item)}</a></li>
                            ))}
                        </ol>
                    </nav>

                    {/* Overview */}
                    <section className="blog-section">
                        <ImageFigure
                            src="Overview-min.webp"
                            caption={t.overview.caption}
                            figNum="Fig 0.1"
                        />
                        <p className="blog-lead">{t.overview.lead}</p>
                    </section>

                    {/* Section 1: Registration */}
                    <section className="blog-section" id="section-1">
                        <h2><span className="section-num">1</span>{t.sections.registration.title}</h2>
                        <ImageFigure
                            src="Initial Race Registration UI-min.webp"
                            caption={t.sections.registration.caption}
                            figNum="Fig 1.1"
                        />
                        <p>{t.sections.registration.p1}</p>
                        <ImageFigure
                            src="图1.2 命名物输入示例.png"
                            caption={t.sections.registration.caption2}
                            figNum="Fig 1.2"
                        />
                        <div className="blog-callout blog-callout-info">
                            <strong>{lang === 'en' ? 'Note:' : '注意：'}</strong> {t.sections.registration.note.replace('Note: ', '').replace('注意：', '')}
                        </div>
                        <p>{t.sections.registration.p2}</p>
                    </section>

                    {/* Section 2: Whitelist */}
                    <section className="blog-section" id="section-2">
                        <h2><span className="section-num">2</span>{renderWithSymbols(t.sections.whitelist.title)}</h2>
                        <ImageFigure
                            src="Race Whitelist Login UI-min.webp"
                            caption={t.sections.whitelist.caption}
                            figNum="Fig 2.1"
                        />
                        <p>{t.sections.whitelist.p1}</p>
                        <ImageFigure
                            src="图2.2 箱子内容展示.png"
                            caption={t.sections.whitelist.caption2}
                            figNum="Fig 2.2"
                        />
                        <p>{t.sections.whitelist.p2}</p>
                        <ul className="blog-list">
                            <li><strong>{lang === 'en' ? 'If invalid:' : '若不符合：'}</strong> {t.sections.whitelist.invalid.replace('If invalid: ', '').replace('若不符合（即箱子內無此命名物）：', '')}</li>
                            <li><strong>{lang === 'en' ? 'If valid:' : '若符合：'}</strong> {t.sections.whitelist.valid.replace('If valid: ', '').replace('若符合（箱子內有同樣的命名物）：', '')}</li>
                        </ul>
                        <ImageFigure
                            src="图2.3 终点非法输入.png"
                            caption={t.sections.whitelist.caption3}
                            figNum="Fig 2.3"
                        />
                    </section>

                    {/* Section 3: Timer */}
                    <section className="blog-section" id="section-3">
                        <h2><span className="section-num">3</span>{t.sections.timer.title}</h2>
                        <ImageFigure
                            src="3-Layer Timer with Shift Registers-min.webp"
                            caption={t.sections.timer.caption1}
                            figNum="Fig 3.1"
                        />

                        <h3>{t.sections.timer.h31}</h3>
                        <p>{t.sections.timer.p1}</p>
                        <p>{t.sections.timer.p1b}</p>
                        <ImageFigure
                            src="图3.1.2 三位模电信号(14分03秒).png"
                            caption={t.sections.timer.caption2}
                            figNum="Fig 3.1.2"
                        />

                        <h3>{t.sections.timer.h32}</h3>
                        <p>{t.sections.timer.p2}</p>
                        <pre className="blog-code">
                            {`0:59 → 0:60 (internal) → 1:01 (display)
     ↑ 20gt delay        ↑ simultaneous update`}
                        </pre>
                        <p>{t.sections.timer.p3}</p>

                        <h3>{t.sections.timer.h33}</h3>
                        <p>{t.sections.timer.p4}</p>
                        <p>{t.sections.timer.p4b}</p>

                        <ImageFigure
                            src="Analog-7 Segment Display-Binary Converter-min.webp"
                            caption={t.sections.timer.caption3}
                            figNum="Fig 3.3.1"
                        />
                        <ImageFigure
                            src="图3.3.2 进位器位置.png"
                            caption={t.sections.timer.caption4}
                            figNum="Fig 3.3.2"
                        />
                    </section>

                    {/* Section 4: Sorting */}
                    <section className="blog-section" id="section-4">
                        <h2><span className="section-num">4</span>{t.sections.sorting.title}</h2>
                        <ImageFigure
                            src="Insertion Sort Module-min.webp"
                            caption={t.sections.sorting.caption1}
                            figNum="Fig 4.1"
                        />
                        <p className="blog-lead">{t.sections.sorting.lead}</p>

                        <h3>{t.sections.sorting.h3}</h3>
                        <p>{t.sections.sorting.p1}</p>

                        <div className="blog-steps">
                            {t.sections.sorting.steps.map((step, i) => (
                                <div className="blog-step" key={i}>
                                    <span className="step-num">{i + 1}</span>
                                    <div><strong>{step.split(':')[0]}:</strong>{step.split(':').slice(1).join(':')}</div>
                                </div>
                            ))}
                        </div>

                        <ImageFigure
                            src="图4.2 算法布线实现.png"
                            caption={t.sections.sorting.caption2}
                            figNum="Fig 4.2"
                        />

                        <ImageFigure
                            src="Insertion Sort Unit-min.webp"
                            caption={t.sections.sorting.caption3}
                            figNum="Fig 4.3"
                        />

                        <div className="blog-callout blog-callout-warning">
                            <strong>{lang === 'en' ? 'Design Trade-off:' : '設計權衡：'}</strong> {t.sections.sorting.warning.replace('Design Trade-off: ', '').replace('設計權衡：', '')}
                        </div>

                        <ImageFigure
                            src="图4.4 ID卡储存.png"
                            caption={t.sections.sorting.caption4}
                            figNum="Fig 4.4"
                        />
                        <p>{t.sections.sorting.p2}</p>
                        <p>{t.sections.sorting.p3}</p>

                        <ImageFigure
                            src="图4.5 48物品存放.png"
                            caption={t.sections.sorting.caption5}
                            figNum="Fig 4.5"
                        />
                        <p>{t.sections.sorting.p4}</p>

                        <ImageFigure
                            src="图4.6 盒子UI示例.png"
                            caption={t.sections.sorting.caption6}
                            figNum="Fig 4.6"
                        />
                        <p>{t.sections.sorting.p5}</p>
                        <p>{t.sections.sorting.p6}</p>
                        <p><a href="https://www.bilibili.com/video/BV1uT4y1P7CX" target="_blank" rel="noopener noreferrer">{t.sections.sorting.link}</a></p>

                        <ImageFigure
                            src="Generated Box UI Reverse Loader-min.webp"
                            caption={t.sections.sorting.caption7}
                            figNum="Fig 4.7"
                        />
                    </section>

                    {/* Section 5: Control */}
                    <section className="blog-section" id="section-5">
                        <h2><span className="section-num">5</span>{t.sections.control.title}</h2>
                        <ImageFigure
                            src="图5 控制面板.png"
                            caption={t.sections.control.caption1}
                            figNum="Fig 5"
                        />

                        <p>{t.sections.control.p1}</p>

                        <div className="blog-subsections">
                            {t.sections.control.items.map((item: any, i: number) => (
                                <div className="blog-subsection" key={i}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    {item.subsections && item.subsections.length > 0 && (
                                        <SubsectionCarousel subsections={item.subsections} />
                                    )}
                                    {item.images && item.images.length > 0 && (
                                        <div className="blog-image-grid">
                                            {item.images.map((img: any, j: number) => (
                                                <ImageFigure
                                                    key={j}
                                                    src={img.src}
                                                    caption={img.caption}
                                                    figNum=""
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 6: Process Management */}
                    <section className="blog-section" id="section-6">
                        <h2><span className="section-num">6</span>{t.sections.process.title}</h2>
                        <ImageFigure
                            src="Process Manager (Priority Queue Based)-min.webp"
                            caption={t.sections.process.caption}
                            figNum="Fig 6.1"
                        />
                        <p>{t.sections.process.p1}</p>
                        <p>{t.sections.process.p2}</p>
                    </section>

                    {/* Section 7: Display */}
                    <section className="blog-section" id="section-7">
                        <h2><span className="section-num">7</span>{t.sections.display.title}</h2>

                        <div className="blog-image-grid">
                            <ImageFigure
                                src="图7.1 地狱显示器(左 历史对局  右 当前对局).png"
                                caption={t.sections.display.captions[0]}
                                figNum="Fig 7.1"
                            />
                            <ImageFigure
                                src="Modular Display Unit-min.webp"
                                caption={t.sections.display.captions[1]}
                                figNum="Fig 7.2"
                            />
                            <ImageFigure
                                src="Low-Latency Comparator Chain Unit-min.webp"
                                caption={t.sections.display.captions[4]}
                                figNum="Fig 7.3"
                            />
                            <ImageFigure
                                src="Latency-Free Analog Downlink (BED Encoded)-min.webp"
                                caption={t.sections.display.captions[5]}
                                figNum="Fig 7.4"
                            />
                        </div>

                        <h3>{t.sections.display.h3}</h3>
                        <p>{t.sections.display.p1}</p>
                    </section>

                    {/* Section 8: Overworld */}
                    <section className="blog-section" id="section-8">
                        <h2><span className="section-num">8</span>{t.sections.overworld.title}</h2>
                        <ImageFigure
                            src="图8.1 起点UI.png"
                            caption={t.sections.overworld.caption1}
                            figNum="Fig 8.1"
                        />
                        <ImageFigure
                            src="图8.2 key.png"
                            caption={t.sections.overworld.caption2}
                            figNum="Fig 8.2"
                        />
                        <ImageFigure
                            src="图8.3 终点.png"
                            caption={t.sections.overworld.caption3}
                            figNum="Fig 8.3"
                        />
                        <ImageFigure
                            src="图8.4 瞬投与船分离.png"
                            caption={t.sections.overworld.caption4}
                            figNum="Fig 8.4"
                        />
                    </section>

                    {/* Appendix */}
                    <section className="blog-section" id="section-appendix">
                        <h2>{t.sections.appendix.title}</h2>
                        <div className="blog-image-grid">
                            {t.sections.appendix.images.map((img, i) => (
                                <ImageFigure
                                    key={i}
                                    src={img.src}
                                    caption={img.caption}
                                    figNum=""
                                />
                            ))}
                        </div>
                    </section>



                    {/* Credits */}
                    <section className="blog-section blog-credits" id="section-9">
                        <h2><span className="section-num">9</span>{t.sections.credits.title}</h2>
                        <div className="credits-grid">
                            <div>
                                <h4>{t.sections.credits.building}</h4>
                                <p>XiaoYu2021, JeadTW</p>
                            </div>
                            <div>
                                <h4>{t.sections.credits.redstone}</h4>
                                <p>Yi_Breeze, Nechnaw, ScLim</p>
                            </div>
                            <div>
                                <h4>{t.sections.credits.thanks}</h4>
                                <p>FlandreLed, redberd, TNT Archive Discord, camphorwood</p>
                            </div>
                        </div>
                        <p className="blog-footer-note">
                            {t.sections.credits.original} <a href="https://www.bilibili.com/opus/979335200181846024" target="_blank" rel="noopener noreferrer">Bilibili</a>
                        </p>
                        <a
                            href="https://www.bilibili.com/opus/979335200181846024"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="blog-learn-more"
                        >
                            {t.learnMore} <span className="cta-arrow">▷</span>
                        </a>
                    </section>
                </article>
            </main >
            <Footer />
        </>
    );
}
