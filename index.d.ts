// Type definitions for pure-paipan index.js
// These types cover the public API exposed by index.js for TS consumers.

export type WuXing = '木' | '火' | '土' | '金' | '水';
export type QiLevel = '本气' | '中气' | '余气';

export interface SolarCandidate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  ymd: string;
  ymdHms: string;
}

export interface GetCurrentEightCharJSONOpts {
  year: number;
  month: number;
  day: number;
  hour?: number; // default 0
  minute?: number; // default 0
  second?: number; // default 0
  sect?: 1 | 2; // default 2
  gender?: 0 | 1; // 1男，0女；default 1
  yunSect?: 1 | 2; // 起运流派
  currentYear?: number; // default: system year
  currentMonth?: number; // default: system month
  currentDay?: number; // default: system day
}

export interface HideGanAttr {
  gan: string; // 藏干天干
  qiLevel: QiLevel; // 气势层级
  wuXing: WuXing; // 藏干五行
  shiShen: string; // 以日干为基准的十神
}

export interface Pillar {
  value: number; // 对应序数（年、月、日、时）
  gan: string; // 天干
  zhi: string; // 地支
  hideGan: string; // 藏干字符串
  wuXing: string; // 五行（字符串表示）
  naYin: string; // 纳音
  shiShenGan: string; // 天干十神
  shiShenZhi: string; // 地支十神
  diShi: string; // 地势（十二长生）
  xun: string; // 旬
  xunKong: string; // 旬空
  hideGanAttr: HideGanAttr[]; // 藏干展开（本/中/余气）
  ziZuo?: string; // 自坐（长生阶段）
  xingYunZhi?: string; // 以日干对地支的十二长生阶段
}

export interface PillarsAll {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  time: Pillar;
  dayMasterGan?: string; // 日主天干
}

export interface YunInfo {
  gender: number | string; // 原库返回的性别标识
  forward: boolean; // 顺/逆排
  startYear: number;
  startMonth: number;
  startDay: number;
  startHour: number;
  startSolar: string; // 起运阳历时间（YYYY-MM-DD HH:mm:ss）
}

export interface LiuNianItem {
  year: number;
  age: number;
  index: number;
  ganZhi: string; // 年柱干支（如 '己亥'）
  xun: string;
  xunKong: string;
  liuYue: unknown[]; // 目前为空数组
}

export interface DaYunItemRaw {
  startYear: number;
  endYear: number;
  startAge: number;
  endAge: number;
  index: number;
  ganZhi: string; // 大运干支（如 '己亥'）
  xun: string;
  xunKong: string;
  liuNian: LiuNianItem[];
}

export type GanZhiPair = [string, string]; // [天干, 地支]

export interface CurrentYunDaYun {
  startYear: number;
  endYear: number;
  startAge: number;
  endAge: number;
  index: number;
  ganZhi: GanZhiPair;
  xun: string;
  xunKong: string;
  shiShen?: string; // 与日主天干的十神（全称）
  zhiHideGanShiShen?: { gan: string; qiLevel: QiLevel; shiShen: string; }[];
}

export interface CurrentYunLiuNian {
  year: number;
  age: number;
  index: number;
  ganZhi: GanZhiPair;
  xun: string;
  xunKong: string;
  shiShen?: string; // 与日主天干的十神（全称）
  zhiHideGanShiShen?: { gan: string; qiLevel: QiLevel; shiShen: string; }[];
}

export interface CurrentYunLiuYue {
  index: number; // 阴历月序（闰月取绝对值）
  monthCn: string; // 阴历中文月名
  ganZhi: GanZhiPair;
  xun: string;
  xunKong: string;
  shiShen?: string;
  zhiHideGanShiShen?: { gan: string; qiLevel: QiLevel; shiShen: string; }[];
}

export interface CurrentYunLiuRi {
  ganZhi: GanZhiPair;
  xun: string;
  xunKong: string;
  shiShen?: string;
  zhiHideGanShiShen?: { gan: string; qiLevel: QiLevel; shiShen: string; }[];
}

export interface CurrentYun {
  daYun: CurrentYunDaYun | null;
  liuNian: CurrentYunLiuNian | null;
  xiaoYun: { year: number; age: number; index: number; ganZhi: GanZhiPair; xun: string; xunKong: string; } | null;
  liuYue?: CurrentYunLiuYue | null;
  liuRi?: CurrentYunLiuRi | { error: string } | null;
}

// 简称十神：财(正财)、才(偏财)、枭(偏印) 等
export type TenGodShort = '财' | '才' | '印' | '枭' | '比' | '劫' | '食' | '伤' | '官' | '杀' | string;

export interface DayunArrLiuNianItem {
  year: number;
  ganZhi: string;
  ganshen: TenGodShort; // 与日主的天干十神简称
  zhishen: TenGodShort; // 与日主的地支(本气)藏干十神简称
}

export interface DayunArrItem {
  startYear: number;
  ganZhi: string;
  ganshen: TenGodShort; // 与日主的天干十神简称
  zhishen: TenGodShort; // 与日主的地支(本气)藏干十神简称
  liunianArr: DayunArrLiuNianItem[];
}

export interface EightCharJSON {
  input: { year: number; month: number; day: number; hour: number; minute: number; second: number; };
  current: { year: number; month: number; day: number; };
  sect: number;
  gender: '男' | '女';
  pillars: PillarsAll;
  taiYuan: string;
  taiYuanNaYin: string;
  taiXi: string;
  taiXiNaYin: string;
  mingGong: string;
  mingGongNaYin: string;
  shenGong: string;
  shenGongNaYin: string;
  wuXingPower: Record<WuXing, number>;
  yun: YunInfo;
  // 原始大运/小运结构（未精细化类型时可选）
  // daYun?: DaYunItemRaw[]; xiaoYun?: { year: number; age: number; index: number; ganZhi: string; xun: string; xunKong: string; }[];
  // 新增：按需消费的 dayunArr（含十神简称）
  dayunArr: DayunArrItem[];
  currentYun: CurrentYun;
  ganRelations?: any[];
  zhiRelations?: any[];
  analysis: { rishi: string[]; SanMingTongHui: string[]; XiYongShen: string[]; };
  yuanHaiZiping: { yueLing: any; taiSui: any; shenQiang: number; shidu: number; };
  meta: { durationMs: number; function: string; };
}

export function fromBaZi(
  yearGanZhi: string,
  monthGanZhi: string,
  dayGanZhi: string,
  timeGanZhi: string,
  sect?: 1 | 2,
  baseYear?: number
): SolarCandidate[];

export function getCurrentEightCharJSON(opts: GetCurrentEightCharJSONOpts): EightCharJSON;