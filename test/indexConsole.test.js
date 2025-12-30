'use strict'
import paipan from '../index.js'
const { fromBaZi, getCurrentEightCharJSON } = paipan

function runConsoleTest() {
  console.log('=== 开始排盘控制台测试 ===')
  
  // 示例排盘数据
  const testCases = [
    {
      name: '默认测试用例',
      data: { year: 1999, month: 5, day: 25, hour: 14, minute: 30, second: 0, sect: 2, gender: 1, yunSect: 2 }
    },
    {
      name: '不同性别测试用例',
      data: { year: 1999, month: 5, day: 25, hour: 14, minute: 30, second: 0, sect: 2, gender: 2, yunSect: 2 }
    },
    {
      name: '不同流派测试用例',
      data: { year: 1999, month: 5, day: 25, hour: 14, minute: 30, second: 0, sect: 1, gender: 1, yunSect: 1 }
    },
    {
      name: '当前日期测试用例',
      data: { year: 2025, month: 1, day: 1, hour: 12, minute: 0, second: 0, sect: 2, gender: 1, yunSect: 2 }
    }
  ]
  
  // 运行所有测试用例
  testCases.forEach(testCase => {
    console.log(`\n--- ${testCase.name} ---`)
    console.log('输入参数:', JSON.stringify(testCase.data, null, 2))
    
    try {
      // 获取排盘结果
      const result = getCurrentEightCharJSON(testCase.data)
      
      // 打印排盘基本信息
      console.log('\n【基本信息】')
      console.log(`性别: ${result.gender}`)
      console.log(`流派: ${result.sect}`)
      
      // 打印四柱信息
      console.log('\n【四柱信息】')
      console.log(`年柱: ${result.pillars.year.value} (${result.pillars.year.gan}${result.pillars.year.zhi})`)
      console.log(`月柱: ${result.pillars.month.value} (${result.pillars.month.gan}${result.pillars.month.zhi})`)
      console.log(`日柱: ${result.pillars.day.value} (${result.pillars.day.gan}${result.pillars.day.zhi})`)
      console.log(`时柱: ${result.pillars.time.value} (${result.pillars.time.gan}${result.pillars.time.zhi})`)
      
      // 打印大运信息
      if (result.daYun && Array.isArray(result.daYun) && result.daYun.length > 0) {
        console.log('\n【大运信息】')
        result.daYun.slice(0, 5).forEach((yun, index) => {
          console.log(`${index + 1}. ${yun.startAge}-${yun.endAge}岁: ${yun.value} ${yun.startYear}-${yun.endYear}年`)
        })
      }
      
      // 打印当前运势
      if (result.currentYun) {
        console.log('\n【当前运势】')
        console.log(`当前大运: ${result.currentYun.currentDaYun?.value || '未知'}`)
        console.log(`当前流年: ${result.currentYun.currentLiuNian?.value || '未知'}`)
      }
      
      // 打印神煞信息（如果有）
      if (result.shensha) {
        console.log('\n【神煞信息】')
        Object.keys(result.shensha).forEach(key => {
          if (Array.isArray(result.shensha[key]) && result.shensha[key].length > 0) {
            console.log(`${key}: ${result.shensha[key].join(', ')}`)
          }
        })
      }
      
      console.log('测试用例执行成功')
      
    } catch (error) {
      console.error('测试用例执行失败:', error.message)
    }
  })
  
  console.log('\n=== 排盘控制台测试完成 ===')
}

// 运行测试
runConsoleTest()