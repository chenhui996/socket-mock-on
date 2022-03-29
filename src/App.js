/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {Table} from 'antd'
import {filterData, insertItem} from './data-mock'
import moment from 'moment'

const CONTRIBUTE_IDS = {
  broker: ['国利', '国际', '中诚', '平安', '信唐', '上田八木'],
  cfets: ['CFETS'],
  sset: ['上证固收'],
}

const filter = {
  issuerCodes: [],
  areas: [],
  swSector20212s: [],
  institutionSubTypes: [],
  issuerRatings: [],
  begin: '2022-03-18',
  end: '2022-03-29',
  excludeSmallOrder: false,
  excludeShortDur: false,
  valuationType: 'CDC',
  threshold: 20,
  cfetsThresholdCondition: {
    max: true,
    min: true,
    values: ["≥0.5", "≤-5"]
  },
  ssetThresholdCondition: {
    max: true,
    min: true,
    values: ["≥0.5", "≤-5"]
  }
}

function App() {
  const [list, setList] = useState(filterData)
  const columns = [
    {
      title: '主体名称（发行人）',
      dataIndex: 'issuerName',
      key: 'issuerName',
      width: '300px',
      fixed: 'left',
    },
    {
      title: '主体评级',
      dataIndex: 'issuerRating',
      key: 'issuerRating',
      width: '100px',
      fixed: 'left',
    },
    {
      title: '存续期债券(只)',
      dataIndex: 'bondCount',
      key: 'bondCount',
      width: '150px',
      fixed: 'left',
    },
    {
      title: '成交天数',
      dataIndex: 'dealDay',
      key: 'dealDay',
      width: '100px',
      fixed: 'left',
    },
    {
      title: '最新成交日期',
      dataIndex: 'lastDealDate',
      key: 'lastDealDate',
      width: '120px',
      fixed: 'left',
    },
    {
      title: '经纪商',
      dataIndex: 'broker',
      sortEnable: false,
      children: [
        {
          title: '成交(笔)',
          dataIndex: 'brokerDealCount',
          key: 'brokerDealCount',
          width: 100,
        },
        {
          title: '成交(只)',
          dataIndex: 'brokerDealBondCount',
          key: 'brokerDealBondCount',
          width: 100,
        },
        {
          title: '高于估值(笔)',
          dataIndex: 'brokerHighDealCount',
          key: 'brokerHighDealCount',
          width: 120,
        },
        {
          title: '高于估值(只)',
          dataIndex: 'brokerHighDealBondCount',
          key: 'brokerHighDealBondCount',
          width: 120,
        },
        {
          title: '低于估值(笔)',
          dataIndex: 'brokerLowDealCount',
          key: 'brokerLowDealCount',
          width: 120,
        },
        {
          title: '低于估值(只)',
          dataIndex: 'brokerLowDealBondCount',
          key: 'brokerLowDealBondCount',
          width: 120,
        },
        {
          title: '首次成交',
          dataIndex: 'brokerFirstDeal',
          key: 'brokerFirstDeal',
          width: 100,
        },
      ],
    },
    {
      title: 'CFETS',
      dataIndex: 'cfets',
      sortEnable: false,
      children: [
        {
          title: '成交(只)',
          dataIndex: 'cfetsDealBondCount',
          key: 'cfetsDealBondCount',
          width: 100,
        },
        {
          title: '高于估值(只)',
          dataIndex: 'cfetsHighBondCount',
          key: 'cfetsHighBondCount',
          width: 120,
        },
        {
          title: '低于估值(只)',
          dataIndex: 'cfetsLowBondCount',
          key: 'cfetsLowBondCount',
          width: 120,
        },
        {
          title: '首次成交',
          dataIndex: 'cfetsFirstDeal',
          key: 'cfetsFirstDeal',
          width: 100,
        },
      ],
    },
    {
      title: '上证固收',
      dataIndex: 'sset',
      sortEnable: false,
      children: [
        {
          title: '成交(只)',
          dataIndex: 'ssetDealBondCount',
          key: 'ssetDealBondCount',
          width: 100,
        },
        {
          title: '高于估值(只)',
          dataIndex: 'ssetHighBondCount',
          key: 'ssetHighBondCount',
          width: 120,
        },
        {
          title: '低于估值(只)',
          dataIndex: 'ssetLowBondCount',
          key: 'ssetLowBondCount',
          width: 120,
        },
        {
          title: '首次成交',
          dataIndex: 'ssetFirstDeal',
          key: 'ssetFirstDeal',
          width: 100,
        },
      ],
    },
    {
      title: '行业',
      dataIndex: 'swSector20212',
      key: 'swSector20212',
      width: '120px',
    },
    {
      title: '企业性质',
      dataIndex: 'institutionSubType',
      key: 'institutionSubType',
      width: '120px',
    },
    {
      title: '地区',
      dataIndex: 'area',
      key: 'area',
      width: '120px',
    },
    {
      title: '流动性',
      dataIndex: 'issuerScore',
      key: 'issuerScore',
      width: '120px',
    },
    {
      title: '信用利差(bp)',
      dataIndex: 'issuerCreditSpread',
      key: 'issuerCreditSpread',
      width: '120px',
    },
  ]

  useEffect(() => {
    messageOn()
  }, [])

  // ----------------------------------------------------------------

  const messageOn = () => {
    console.log('messageOn')
    console.log('list', list)
    console.log('insertItem', insertItem)

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    let isPass = true

    let reasonArr = []

    let valueBP = null

    const filterBroker = CONTRIBUTE_IDS.broker.includes(
      insertItem.deviation.contributorId,
    )
    const filterCfets = CONTRIBUTE_IDS.cfets.includes(
      insertItem.deviation.contributorId,
    )
    const filterSset = CONTRIBUTE_IDS.sset.includes(
      insertItem.deviation.contributorId,
    )

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // 基础 过滤
    const baseFilter = (isPassNow, filterKey, key) => {
      if (isPassNow && filter[filterKey].length > 0) {
        if (filter[filterKey].indexOf(insertItem.deviation[key]) === -1) {
          isPass = false
        }
      }
    }

    // 日期 过滤
    const dateFilter = (isPassNow) => {
      if (isPassNow && filter.end !== moment().format('YYYY-MM-DD')) {
        isPass = false
      }
    }

    // 小单 - 短久期 过滤
    const smallOrderAndShortDurFilter = (
      isPassNow,
      filterKey,
      cdcKey,
      csiKey,
    ) => {
      if (
        isPassNow &&
        filter[filterKey] &&
        (insertItem.highDiffIsCdc
          ? insertItem.deviation[cdcKey]
          : insertItem.deviation[csiKey])
      ) {
        isPass = false
      }
    }

    // 原因 推导
    const calReasonArr = () => {
      if (filter.valuationType === 'CDC') {
        reasonArr = insertItem.deviation.cdcDiffReason.split(',')
        valueBP = insertItem.deviation.cdcDiffBP
      }
      if (filter.valuationType === 'CSI') {
        reasonArr = insertItem.deviation.csiDiffReason.split(',')
        valueBP = insertItem.deviation.csiDiffBP
      }
      if (filter.valuationType === 'HIGHVAL') {
        reasonArr = insertItem.deviation.highDiffIsCdc
          ? insertItem.deviation.cdcDiffReason.split(',')
          : insertItem.deviation.csiDiffReason.split(',')

        valueBP = insertItem.deviation.highDiffIsCdc
          ? insertItem.deviation.cdcDiffBP
          : insertItem.deviation.csiDiffBP
      }
      if (filter.valuationType === 'LOWVAL') {
        reasonArr = insertItem.deviation.highDiffIsCdc
          ? insertItem.deviation.csiDiffReason.split(',')
          : insertItem.deviation.cdcDiffReason.split(',')

        valueBP = insertItem.deviation.highDiffIsCdc
          ? insertItem.deviation.csiDiffBP
          : insertItem.deviation.cdcDiffBP
      }
    }

    // 经纪商 阈值 过滤
    const brokerBPFilter = () => {
      if (filterBroker) {
        if(Math.abs(valueBP) <= filter.threshold){
          isPass = false;
        }
      }
    }

    // CFETS 阈值 过滤
    const cfetsBPFilter = () => {
      if (filterCfets) {
        const maxBoolean = filter.cfetsThresholdCondition.max
        const minBoolean = filter.cfetsThresholdCondition.min

        const maxBP = filter.cfetsThresholdCondition.values[0].slice(1)
        const minBP = filter.cfetsThresholdCondition.values[1].slice(1)
        
        if(maxBoolean && valueBP >= maxBP){
          isPass = false
        }
        if(minBoolean && valueBP <= minBP){
          isPass = false
        }
      }
    }

    // 上证固收 阈值 过滤
    const ssetBPFilter = () => {
      if (filterSset) {
        const maxBoolean = filter.ssetThresholdCondition.max
        const minBoolean = filter.ssetThresholdCondition.min

        const maxBP = filter.ssetThresholdCondition.values[0].slice(1)
        const minBP = filter.ssetThresholdCondition.values[1].slice(1)
        
        if(maxBoolean && valueBP >= maxBP){
          isPass = false
        }
        if(minBoolean && valueBP <= minBP){
          isPass = false
        }
      }
    }

    // 经纪商：成交(笔)
    const calBrokerDeal = (item) => {
      return item
        ? item.brokerDealCount + Number(filterBroker)
        : Number(filterBroker)
    }

    // 经纪商：成交(只)
    const calBrokerDealBond = (item) => {
      if (filterBroker) {
        if (item) {
          if (item.brokerDealBondCount === 0) {
            return 1
          } else {
            const isExist = item.brokerDealBondCountList.some(
              ({bondId}) => bondId === insertItem.deviation.bondId,
            )
            return isExist
              ? item.brokerDealBondCount
              : item.brokerDealBondCount + 1
          }
        } else {
          return 1
        }
      } else {
        return item ? item.brokerDealBondCount : 0
      }
    }

    // 经纪商：成交（只）-> 数组（计算用）
    const calBrokerDealBondList = (item) => {
      if (filterBroker) {
        if (item && item.brokerDealBondCountList.length !== 0) {
          let isExist = false
          const newBondList = item.brokerDealBondCountList.map(
            ({bondId, count}) => {
              isExist = bondId === insertItem.deviation.bondId
              return {
                bondId,
                count:
                  bondId === insertItem.deviation.bondId ? count + 1 : count,
              }
            },
          )

          if (!isExist) {
            newBondList.push({bondId: insertItem.deviation.bondId, count: 1})
          }

          return newBondList
        } else {
          return [{bondId: insertItem.deviation.bondId, count: 1}]
        }
      } else {
        return item ? item.brokerDealBondCountList : []
      }
    }

    // 经纪商：高于估值(笔)
    const calBrokerHigh = (item, reasonArr) => {
      return item
        ? item.brokerHighDealCount +
            Number(filterBroker && reasonArr.includes('1'))
        : Number(filterBroker && reasonArr.includes('1'))
    }

    // 经纪商：高于估值(只)
    const calBrokerHighBond = (item, reasonArr) => {
      if (filterBroker && reasonArr.includes('1')) {
        if (item && item.brokerHighDealBondCountList.length !== 0) {
          const isExist = item.brokerHighDealBondCountList.some(
            ({bondId}) => bondId === insertItem.deviation.bondId,
          )
          return isExist
            ? item.brokerHighDealBondCount
            : item.brokerHighDealBondCount + 1
        } else {
          return 1
        }
      } else {
        return item ? item.brokerHighDealBondCount : 0
      }
    }

    // 经纪商：高于估值(只) -> 数组（计算用）
    const calBrokerHighBondList = (item, reasonArr) => {
      if (filterBroker && reasonArr.includes('1')) {
        if (item && item.brokerHighDealBondCountList.length !== 0) {
          let isExist = false
          const newBondList = item.brokerHighDealBondCountList.map(
            ({bondId, count}) => {
              isExist = bondId === insertItem.deviation.bondId
              return {
                bondId,
                count:
                  bondId === insertItem.deviation.bondId ? count + 1 : count,
              }
            },
          )

          if (!isExist) {
            newBondList.push({bondId: insertItem.deviation.bondId, count: 1})
          }

          return newBondList
        } else {
          return [{bondId: insertItem.deviation.bondId, count: 1}]
        }
      } else {
        return item ? item.brokerHighDealBondCountList : []
      }
    }

    // 经纪商：低于估值(笔)
    const calBrokerLow = (item, reasonArr) => {
      return item
        ? item.brokerHighDealCount +
            Number(filterBroker && reasonArr.includes('2'))
        : Number(filterBroker && reasonArr.includes('2'))
    }

    // 经纪商：低于估值(只)
    const calBrokerLowBond = (item, reasonArr) => {
      if (filterBroker && reasonArr.includes('2')) {
        if (item && item.brokerHighDealBondCountList.length !== 0) {
          const isExist = item.brokerHighDealBondCountList.some(
            ({bondId}) => bondId === insertItem.deviation.bondId,
          )
          return isExist
            ? item.brokerHighDealBondCount
            : item.brokerHighDealBondCount + 1
        } else {
          return 1
        }
      } else {
        return item ? item.brokerHighDealBondCount : 0
      }
    }

    // 经纪商：低于估值(只) -> 数组（计算用）
    const calBrokerLowBondList = (item, reasonArr) => {
      if (filterBroker && reasonArr.includes('2')) {
        if (item && item.brokerHighDealBondCountList.length !== 0) {
          let isExist = false
          const newBondList = item.brokerHighDealBondCountList.map(
            ({bondId, count}) => {
              isExist = bondId === insertItem.deviation.bondId
              return {
                bondId,
                count:
                  bondId === insertItem.deviation.bondId ? count + 1 : count,
              }
            },
          )

          if (!isExist) {
            newBondList.push({bondId: insertItem.deviation.bondId, count: 1})
          }

          return newBondList
        } else {
          return [{bondId: insertItem.deviation.bondId, count: 1}]
        }
      } else {
        return item ? item.brokerHighDealBondCountList : []
      }
    }

    // 经纪商：首次成交
    const calBrokerFirstDeal = (item, reasonArr) => {
      if (filterBroker) {
        if (reasonArr.includes('10')) {
          return '180天'
        } else if (reasonArr.includes('9')) {
          return '90天'
        } else if (reasonArr.includes('8')) {
          return '30天'
        } else {
          return '--'
        }
      } else {
        return item ? item.brokerFirstDeal : '--'
      }
    }

    // CFETS：成交(只)
    const calCfetsDeal = (item) => {
      if (filterCfets) {
        if (item) {
          if (item.cfetsDealBondCount === 0) {
            return 1
          } else {
            const isExist = item.cfetsDealBondCountList.some(
              ({bondId}) => bondId === insertItem.deviation.bondId,
            )
            return isExist
              ? item.cfetsDealBondCount
              : item.cfetsDealBondCount + 1
          }
        } else {
          return 1
        }
      } else {
        return item ? item.cfetsDealBondCount : 0
      }
    }

    // CFETS：成交-> 数组（计算用）
    const calCfetsDealList = (item) => {
      if (filterCfets) {
        if (item && item.cfetsDealBondCountList.length !== 0) {
          let isExist = false
          const newBondList = item.cfetsDealBondCountList.map(
            ({bondId, count}) => {
              isExist = bondId === insertItem.deviation.bondId
              return {
                bondId,
                count:
                  bondId === insertItem.deviation.bondId ? count + 1 : count,
              }
            },
          )

          if (!isExist) {
            newBondList.push({bondId: insertItem.deviation.bondId, count: 1})
          }

          return newBondList
        } else {
          return [{bondId: insertItem.deviation.bondId, count: 1}]
        }
      } else {
        return item ? item.cfetsDealBondCountList : []
      }
    }

    // CFETS：高于估值(只)
    const calCfetsHighBond = (item, reasonArr) => {
      if (filterCfets && reasonArr.includes('1')) {
        if (item && item.cfetsHighBondCountList.length !== 0) {
          const isExist = item.cfetsHighBondCountList.some(
            ({bondId}) => bondId === insertItem.deviation.bondId,
          )
          return isExist ? item.cfetsHighBondCount : item.cfetsHighBondCount + 1
        } else {
          return 1
        }
      } else {
        return item ? item.cfetsHighBondCount : 0
      }
    }

    // CFETS：高于估值(只) -> 数组（计算用）
    const calCfetsHighBondList = (item, reasonArr) => {
      if (filterCfets && reasonArr.includes('1')) {
        if (item && item.cfetsHighBondCountList.length !== 0) {
          let isExist = false
          const newBondList = item.cfetsHighBondCountList.map(
            ({bondId, count}) => {
              isExist = bondId === insertItem.deviation.bondId
              return {
                bondId,
                count:
                  bondId === insertItem.deviation.bondId ? count + 1 : count,
              }
            },
          )

          if (!isExist) {
            newBondList.push({bondId: insertItem.deviation.bondId, count: 1})
          }

          return newBondList
        } else {
          return [{bondId: insertItem.deviation.bondId, count: 1}]
        }
      } else {
        return item ? item.cfetsHighBondCountList : []
      }
    }

    // CFETS：低于估值(只)
    const calCfetsLowBond = (item, reasonArr) => {
      if (filterCfets && reasonArr.includes('2')) {
        if (item && item.cfetsLowBondCountList.length !== 0) {
          const isExist = item.cfetsLowBondCountList.some(
            ({bondId}) => bondId === insertItem.deviation.bondId,
          )
          return isExist ? item.cfetsLowBondCount : item.cfetsLowBondCount + 1
        } else {
          return 1
        }
      } else {
        return item ? item.cfetsLowBondCount : 0
      }
    }

    // CFETS：低于估值(只) -> 数组（计算用）
    const calCfetsLowBondList = (item, reasonArr) => {
      if (filterCfets && reasonArr.includes('2')) {
        if (item && item.cfetsLowBondCountList.length !== 0) {
          let isExist = false
          const newBondList = item.cfetsLowBondCountList.map(
            ({bondId, count}) => {
              isExist = bondId === insertItem.deviation.bondId
              return {
                bondId,
                count:
                  bondId === insertItem.deviation.bondId ? count + 1 : count,
              }
            },
          )

          if (!isExist) {
            newBondList.push({bondId: insertItem.deviation.bondId, count: 1})
          }

          return newBondList
        } else {
          return [{bondId: insertItem.deviation.bondId, count: 1}]
        }
      } else {
        return item ? item.cfetsLowBondCountList : []
      }
    }

    // CFETS：首次成交
    const calCfetsFirstDeal = (item, reasonArr) => {
      if (filterCfets) {
        if (reasonArr.includes('10')) {
          return '180天'
        } else if (reasonArr.includes('9')) {
          return '90天'
        } else if (reasonArr.includes('8')) {
          return '30天'
        } else {
          return '--'
        }
      } else {
        return item ? item.cfetsFirstDeal : '--'
      }
    }

    // 上证固收：成交(只)
    const calSsetDeal = (item) => {
      if (filterSset) {
        if (item) {
          if (item.ssetDealBondCount === 0) {
            return 1
          } else {
            const isExist = item.ssetDealBondCountList.some(
              ({bondId}) => bondId === insertItem.deviation.bondId,
            )
            return isExist ? item.ssetDealBondCount : item.ssetDealBondCount + 1
          }
        } else {
          return 1
        }
      } else {
        return item ? item.ssetDealBondCount : 0
      }
    }

    // 上证固收：成交-> 数组（计算用）
    const calSsetDealList = (item) => {
      if (filterSset) {
        if (item && item.ssetDealBondCountList.length !== 0) {
          let isExist = false
          const newBondList = item.ssetDealBondCountList.map(
            ({bondId, count}) => {
              isExist = bondId === insertItem.deviation.bondId
              return {
                bondId,
                count:
                  bondId === insertItem.deviation.bondId ? count + 1 : count,
              }
            },
          )

          if (!isExist) {
            newBondList.push({bondId: insertItem.deviation.bondId, count: 1})
          }

          return newBondList
        } else {
          return [{bondId: insertItem.deviation.bondId, count: 1}]
        }
      } else {
        return item ? item.ssetDealBondCountList : []
      }
    }

    // 上证固收：高于估值(只)
    const calSsetHighBond = (item, reasonArr) => {
      if (filterSset && reasonArr.includes('1')) {
        if (item && item.ssetHighBondCountList.length !== 0) {
          const isExist = item.ssetHighBondCountList.some(
            ({bondId}) => bondId === insertItem.deviation.bondId,
          )
          return isExist ? item.ssetHighBondCount : item.ssetHighBondCount + 1
        } else {
          return 1
        }
      } else {
        return item ? item.ssetHighBondCount : 0
      }
    }

    // 上证固收：高于估值(只) -> 数组（计算用）
    const calSsetHighBondList = (item, reasonArr) => {
      if (filterSset && reasonArr.includes('1')) {
        if (item && item.ssetHighBondCountList.length !== 0) {
          let isExist = false
          const newBondList = item.ssetHighBondCountList.map(
            ({bondId, count}) => {
              isExist = bondId === insertItem.deviation.bondId
              return {
                bondId,
                count:
                  bondId === insertItem.deviation.bondId ? count + 1 : count,
              }
            },
          )

          if (!isExist) {
            newBondList.push({bondId: insertItem.deviation.bondId, count: 1})
          }

          return newBondList
        } else {
          return [{bondId: insertItem.deviation.bondId, count: 1}]
        }
      } else {
        return item ? item.ssetHighBondCountList : []
      }
    }

    // 上证固收：低于估值(只)
    const calSsetLowBond = (item, reasonArr) => {
      if (filterSset && reasonArr.includes('2')) {
        if (item && item.ssetLowBondCountList.length !== 0) {
          const isExist = item.ssetLowBondCountList.some(
            ({bondId}) => bondId === insertItem.deviation.bondId,
          )
          return isExist ? item.ssetLowBondCount : item.ssetLowBondCount + 1
        } else {
          return 1
        }
      } else {
        return item ? item.ssetLowBondCount : 0
      }
    }

    // 上证固收：低于估值(只) -> 数组（计算用）
    const calSsetLowBondList = (item, reasonArr) => {
      if (filterSset && reasonArr.includes('2')) {
        if (item && item.ssetLowBondCountList.length !== 0) {
          let isExist = false
          const newBondList = item.ssetLowBondCountList.map(
            ({bondId, count}) => {
              isExist = bondId === insertItem.deviation.bondId
              return {
                bondId,
                count:
                  bondId === insertItem.deviation.bondId ? count + 1 : count,
              }
            },
          )

          if (!isExist) {
            newBondList.push({bondId: insertItem.deviation.bondId, count: 1})
          }

          return newBondList
        } else {
          return [{bondId: insertItem.deviation.bondId, count: 1}]
        }
      } else {
        return item ? item.ssetLowBondCountList : []
      }
    }

    // 上证固收：首次成交
    const calSsetFirstDeal = (item, reasonArr) => {
      if (filterSset) {
        if (reasonArr.includes('10')) {
          return '180天'
        } else if (reasonArr.includes('9')) {
          return '90天'
        } else if (reasonArr.includes('8')) {
          return '30天'
        } else {
          return '--'
        }
      } else {
        return item ? item.ssetFirstDeal : '--'
      }
    }

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // 推送新成交
    if (insertItem.messageType === 'DEAL_DEVIATION_CHANGE') {
      baseFilter(isPass, 'issuerCodes', 'issuerCode') // 发行人过滤
      baseFilter(isPass, 'areas', 'area') // 地区过滤
      baseFilter(isPass, 'swSector20212s', 'swSector20212') // 常用过滤
      baseFilter(isPass, 'institutionSubTypes', 'institutionSubType') // 企业过滤
      baseFilter(isPass, 'issuerRatings', 'issuerRating') // 主体评级过滤
      dateFilter(isPass) // 日期过滤
      smallOrderAndShortDurFilter(
        isPass,
        'excludeSmallOrder',
        'cdcSmallOrder',
        'csiSmallOrder',
      ) // 剔除小单过滤
      smallOrderAndShortDurFilter(
        isPass,
        'excludeShortDur',
        'cdcShortDur',
        'csiShortDur',
      ) // 剔除短久期过滤
      calReasonArr() // 原因推导
      brokerBPFilter() // 经纪商阈值过滤
      cfetsBPFilter() // CFETS阈值过滤
      ssetBPFilter() // 上证固收阈值过滤

      // ---------------------------------------------------------------

      console.log('core', isPass, filterBroker, filterCfets, filterSset, reasonArr, valueBP);

      if (isPass) {
        const newList = list.filter(
          (item) => item.issuerCode !== insertItem.deviation.issuerCode,
        )

        const replaceItem = list.filter(
          (item) => item.issuerCode === insertItem.deviation.issuerCode,
        )[0]

        const newItem = {
          issuerName: insertItem.deviation.issuerName, // 主体名称
          issuerCode: insertItem.deviation.issuerCode,
          area: insertItem.deviation.area,
          swSector20212: insertItem.deviation.swSector20212,
          institutionSubType: insertItem.deviation.institutionSubType,
          issuerRating: insertItem.deviation.issuerRating, // 主体评级
          bondCount: insertItem.deviation.bondCount, // 存续期债券(只)
          dealDay: replaceItem ? replaceItem.dealDay + 1 : 1, // 成交天数
          lastDealDate: moment().format('YYYY-MM-DD'), // 最新成交日期
          // 经纪商
          brokerDealCount: calBrokerDeal(replaceItem), // 成交（笔）
          brokerDealBondCount: calBrokerDealBond(replaceItem), // 成交（只）
          brokerDealBondCountList: calBrokerDealBondList(replaceItem), // 成交（只）-> 数组（计算用）
          brokerHighDealCount: calBrokerHigh(replaceItem, reasonArr), // 高于估值（笔）
          brokerHighDealBondCount: calBrokerHighBond(replaceItem, reasonArr), // 高于估值（只）
          brokerHighDealBondCountList: calBrokerHighBondList(
            replaceItem,
            reasonArr,
          ), // 高于估值（只）-> 数组（计算用）
          brokerLowDealCount: calBrokerLow(replaceItem, reasonArr), // 低于估值（笔）
          brokerLowDealBondCount: calBrokerLowBond(replaceItem, reasonArr), // 低于估值（只）
          brokerLowDealBondCountList: calBrokerLowBondList(
            replaceItem,
            reasonArr,
          ), // 低于估值（只）-> 数组（计算用）
          brokerFirstDeal: calBrokerFirstDeal(replaceItem, reasonArr), // 首次成交
          // CFETS
          cfetsDealBondCount: calCfetsDeal(replaceItem), // 成交（只）
          cfetsDealBondCountList: calCfetsDealList(replaceItem), // 成交（只）-> 数组（计算用）
          cfetsHighBondCount: calCfetsHighBond(replaceItem, reasonArr), // 高于估值（只）
          cfetsHighBondCountList: calCfetsHighBondList(replaceItem, reasonArr), // 高于估值（只）-> 数组（计算用）
          cfetsLowBondCount: calCfetsLowBond(replaceItem, reasonArr), // 低于估值（只）
          cfetsLowBondCountList: calCfetsLowBondList(replaceItem, reasonArr), // 低于估值（只）-> 数组（计算用）
          cfetsFirstDeal: calCfetsFirstDeal(replaceItem, reasonArr), // 首次成交
          // 上证固收
          ssetDealBondCount: calSsetDeal(replaceItem), // 成交（只）
          ssetDealBondCountList: calSsetDealList(replaceItem), // 成交（只）-> 数组（计算用）
          ssetHighBondCount: calSsetHighBond(replaceItem, reasonArr), // 高于估值（只）
          ssetHighBondCountList: calSsetHighBondList(replaceItem, reasonArr), // 高于估值（只）-> 数组（计算用）
          ssetLowBondCount: calSsetLowBond(replaceItem, reasonArr), // 低于估值（只）
          ssetLowBondCountList: calSsetLowBondList(replaceItem, reasonArr), // 低于估值（只）-> 数组（计算用）
          ssetFirstDeal: calSsetFirstDeal(replaceItem, reasonArr), // 首次成交
          issuerScore: insertItem.deviation.issuerScore,
          issuerCreditSpread: insertItem.deviation.issuerCreditSpread,
        }

        // 更新 list
        console.log('newList', newList, newItem)
        setList([...newList, newItem])
      }
    }

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // 推送移出成交
    if (insertItem.messageType === 'DEAL_DEVIATION_REVOKE') {
      // ...
    }
  }

  return (
    <>
      <Table
        rowKey="issuerCode"
        columns={columns}
        dataSource={list}
        scroll={{x: '100%'}}
      />
    </>
  )
}

export default App
