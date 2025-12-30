'use strict'

import paipan from '../index.js'
const { fromBaZi, getCurrentEightCharJSON } = paipan
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function assert (name, cond) {
  if (!cond) throw new Error('Assertion failed: ' + name)
}

function run () {
  const outDir = path.join(__dirname, '..', 'output')
  
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  // 样例：1999-05-25 14:30，sect=2, gender=1
  const sample = { year: 1999, month: 5, day: 25, hour: 14, minute: 30, second: 0, sect: 2, gender: 1, yunSect: 2 }
  const curRes1 = getCurrentEightCharJSON(sample)
  const outPath1c = path.join(outDir, 'bazi-current-sect2-gender1.json')
  fs.writeFileSync(outPath1c, JSON.stringify(curRes1, null, 2))
  console.log('已写入文件:', outPath1c)
  assert('sect equals 2', curRes1.sect === 2)
  assert('gender label 男', curRes1.gender === '男')

  // 指定当前日期用例：2025-01-01
  const curRes1Fixed2025 = getCurrentEightCharJSON({
    ...sample,
    currentYear: 2025,
    currentMonth: 1,
    currentDay: 1,
  })
  const outPath1cFixed2025 = path.join(outDir, 'bazi-current-sect2-gender1-20250101.json')
  fs.writeFileSync(outPath1cFixed2025, JSON.stringify(curRes1Fixed2025, null, 2))
  console.log('已写入文件:', outPath1cFixed2025)

  // 不同出生时刻的当前简版输出（示例：2025-01-01 22:00 / 10:00 / 06:00）
  const sampleBirth2025_2200 = { year: 2025, month: 1, day: 1, hour: 22, minute: 0, second: 0, sect: 2, gender: 1, yunSect: 2 }
  const curResBirth2025_2200 = getCurrentEightCharJSON(sampleBirth2025_2200)
  const outPathBirth2025Current_2200 = path.join(outDir, 'bazi-current-sect2-gender1-20250101-2200-birth.json')
  fs.writeFileSync(outPathBirth2025Current_2200, JSON.stringify(curResBirth2025_2200, null, 2))
  console.log('已写入文件:', outPathBirth2025Current_2200)

  const sampleBirth2025_1000 = { year: 2025, month: 1, day: 1, hour: 10, minute: 0, second: 0, sect: 2, gender: 1, yunSect: 2 }
  const curResBirth2025_1000 = getCurrentEightCharJSON(sampleBirth2025_1000)
  const outPathBirth2025Current_1000 = path.join(outDir, 'bazi-current-sect2-gender1-20250101-1000-birth.json')
  fs.writeFileSync(outPathBirth2025Current_1000, JSON.stringify(curResBirth2025_1000, null, 2))
  console.log('已写入文件:', outPathBirth2025Current_1000)

  const sampleBirth2025_0600 = { year: 2025, month: 1, day: 1, hour: 6, minute: 0, second: 0, sect: 2, gender: 1, yunSect: 2 }
  const curResBirth2025_0600 = getCurrentEightCharJSON(sampleBirth2025_0600)
  const outPathBirth2025Current_0600 = path.join(outDir, 'bazi-current-sect2-gender1-20250101-0600-birth.json')
  fs.writeFileSync(outPathBirth2025Current_0600, JSON.stringify(curResBirth2025_0600, null, 2))
  console.log('已写入文件:', outPathBirth2025Current_0600)

  // 新测试用例：1999年12月10日下午三点，女
  const femaleSample = { year: 1999, month: 12, day: 10, hour: 15, minute: 0, second: 0, sect: 2, gender: 2, yunSect: 2 };
  const femaleResult = getCurrentEightCharJSON(femaleSample);
  const femaleOutPath = path.join(outDir, 'bazi-current-sect2-gender2-19991210.json');
  fs.writeFileSync(femaleOutPath, JSON.stringify(femaleResult, null, 2));
  console.log('已写入文件:', femaleOutPath);
  assert('gender label 女', femaleResult.gender === '女');
  
  // 新测试用例：2000年10月12日下午2点多，女
  const femaleSample2000 = { year: 2000, month: 10, day: 12, hour: 14, minute: 30, second: 0, sect: 2, gender: 2, yunSect: 2 };
  const femaleResult2000 = getCurrentEightCharJSON(femaleSample2000);
  const femaleOutPath2000 = path.join(outDir, 'bazi-current-sect2-gender2-20001012.json');
  fs.writeFileSync(femaleOutPath2000, JSON.stringify(femaleResult2000, null, 2));
  console.log('已写入文件:', femaleOutPath2000);
  assert('gender label 女', femaleResult2000.gender === '女');

  // 当前运势结构的基本健壮性检查
  assert('pillars exist', curRes1.pillars && curRes1.pillars.day && curRes1.pillars.year)
  assert('currentYun exists', curRes1.currentYun && typeof curRes1.currentYun === 'object')

  // 反推阳历测试：基于当前简版输出中的四柱
  const yearGZ = curRes1.pillars.year.value
  const monthGZ = curRes1.pillars.month.value
  const dayGZ = curRes1.pillars.day.value
  const timeGZ = curRes1.pillars.time.value
  const list = fromBaZi(yearGZ, monthGZ, dayGZ, timeGZ, curRes1.sect, 1990)
  if (!Array.isArray(list) || list.length === 0) throw new Error('Assertion failed: fromBaZi empty result')
  const has19990525_14 = list.some(s => s.year === 1999 && s.month === 5 && s.day === 25 && s.hour === 14)
  if (!has19990525_14) throw new Error('Assertion failed: fromBaZi missing 1999-05-25 14:00 record')
  const outPath3 = path.join(outDir, `bazi-fromBaZi-sect${curRes1.sect}-base1990.json`)
  fs.writeFileSync(outPath3, JSON.stringify(list, null, 2))
  console.log('已写入文件:', outPath3)

  console.log('All tests passed.')
}

try {
  run()
} catch (e) {
  console.error(e.stack || e.message)
  process.exit(1)
}