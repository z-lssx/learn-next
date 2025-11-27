'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SimpleDemo() {

  const [loading, setLoading] = useState(true); // 布尔
  const [num, setNum] = useState(0); // 数字
  const [list, setList] = useState([]); // 数组
  const [inputVal, setInputVal] = useState(''); // 字符串

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setList([{ id: 1, text: '第一条数据' }, { id: 2, text: '第二条数据' }]);
      setLoading(false);
      setNum(Array.isArray(list) ? list.length : 0);
    };
    fetchData();
  },[]);

  useEffect(() => {
    console.log('num更新为：', num);
  }, [num]);

  function handleInputChange(e) {
    setInputVal(e.target.value); 
  }

  async function handleAdd() {
    setList([...list, { id: Date.now(), text: inputVal }]);
    setInputVal('');
    setNum(list.length ? list.length + 1 : 1);
  }

  async function handleUpdateItem(id) {
    setList(list.map(item => item.id === id ? { ...item, text: inputVal } : item));
  }

  return (
    <div>
      <h1>核心知识点演示</h1>

      <div>
        <button onClick={() => setLoading(!loading)} className="bg-blue-600 text-white" > 调整loading，影响显示</button>
      </div>
      {loading && <div>加载中...</div>}

      {!loading && (
        <>
          <div>{list.length > 0 ? `共${num}条数据` : '暂无数据'}</div>

          <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
            <input
              value={inputVal}
              onChange={handleInputChange}
              placeholder="输入内容"
            />
            <button type="submit">添加数据</button>
          </form>

          <div>
            {list.map((item) => (
              <div key={item.id}>
                <span>{item.text}    </span>
                <button onClick={() => handleUpdateItem(item.id)}>修改</button>
              </div>
            ))}
          </div>

          <Link href="/">回到首页</Link>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <a href="https://nextjs.org" target="_blank">Next.js官网</a>

          <img src="https://picsum.photos/200/100" alt="示例图" />
          <img src="/image/111.jpg" />
        </>
      )}
    </div>
  );
}