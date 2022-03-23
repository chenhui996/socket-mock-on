import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';
import { filterData, insertItem } from './data-mock';
import Builder from 'e-charts-builder-pro';

const filter = {
  issuerCodes: ["N000243"],
}

function App() {
  const [list, setList] = useState(filterData);
  const columns = [
    {
      title: '主体名称（发行人）',
      dataIndex: 'issuerName',
      key: 'issuerName',
      width: '270px',
    },
  ];

  useEffect(() => {
    messageOn()
  }, [])

  // ----------------------------------------------------------------

  const messageOn = () => {
    console.log('messageOn');
    console.log('list', list);
    console.log('insertItem', insertItem);

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // 推送新成交
    if (insertItem.messageType === 'DEAL_DEVIATION_CHANGE') {
      let newList = list
      let newItem = {
        issuerName: insertItem.deviation.issuerName,
        issuerCode: insertItem.deviation.issuerCode,
      }

      // 发行人过滤
      if (filter.issuerCodes.length > 0) {
        if (filter.issuerCodes.indexOf(insertItem.deviation.issuerCode) !== -1) {
          newList = list.filter(item => item.issuerCode !== insertItem.deviation.issuerCode);
        }
        else {
          newItem = []
        };
      } else {
        if (list.some(item => item.issuerCode === insertItem.deviation.issuerCode)) {
          newList = list.filter(item => item.issuerCode !== insertItem.deviation.issuerCode);
        }
      }




      // ---------------------------------------------------------------
      // ...

      // ---------------------------------------------------------------
      // 更新 list
      // console.log('newList', newList, newItem);
      setList([...newList, newItem]);
    }

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // 推送移出成交
    if (insertItem.messageType === 'DEAL_DEVIATION_REVOKE') {
      // ...
    }
  }



  // ----------------------------------------------------------------

  const ref = useRef(null)


  if (ref.current) {
    const myChart = new Builder({ container: ref.current })

    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

    myChart && myChart.setOption(option).xAxis(option.xAxis).yAxis(option.yAxis).series(option.series).render();
  }

  return (
    <>
      <Table rowKey="issuerCode" columns={columns} dataSource={list} />
      <div ref={ref} style={{ width: 400, height: 300 }}></div>
    </>

  );
}

export default App;
