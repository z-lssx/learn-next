'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SimpleDemo() {
  // 知识点1：定义各种类型变量
  const [loading, setLoading] = useState(true); // 布尔
  const [num, setNum] = useState(0); // 数字
  const [list, setList] = useState([]); // 数组
  const [inputVal, setInputVal] = useState(''); // 字符串

  // 知识点2：useEffect（空依赖→仅首次挂载）
  useEffect(() => {
    // 模拟异步请求
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setList([{ id: 1, text: '第一条数据' }, { id: 2, text: '第二条数据' }]);
      setLoading(false);
      // 知识点4：三元运算符（判断数组是否有效）
      setNum(Array.isArray(list) ? list.length : 0);
    };
    fetchData();
  },[]);

  // 知识点2：useEffect（非空依赖→首次+变量更新时执行）
  useEffect(() => {
    console.log('num更新为：', num);
  }, [num]);

  // 知识点3：普通方法 + 异步方法
  function handleInputChange(e) {
    setInputVal(e.target.value); // 修改字符串变量
  }

  async function handleAdd() {
    // 知识点6：...展开运算符（新增数组元素）
    setList([...list, { id: Date.now(), text: inputVal }]);
    setInputVal('');
    // 知识点4：三元运算符（更新数字变量）
    setNum(list.length ? list.length + 1 : 1);
  }

  async function handleUpdateItem(id) {
    // 知识点6：...展开运算符（更新数组中元素）
    setList(list.map(item => item.id === id ? { ...item, text: inputVal } : item));
  }

  // 知识点5：与运算（条件渲染）+ 页面结构
  return (
    <div>
      <h1>核心知识点演示</h1>

      {/* 知识点5：与运算→loading为true时显示 */}
      <div>
        <button onClick={() => setLoading(!loading)} className="bg-blue-600 text-white" > 调整loading，影响显示</button>
      </div>
      {loading && <div>加载中...</div>}

      {!loading && (
        <>
          {/* 知识点4：三元运算符→判断数组长度显示不同内容 */}
          <div>{list.length > 0 ? `共${num}条数据` : '暂无数据'}</div>

          {/* 知识点8：form+input+button标签 */}
          <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
            <input
              value={inputVal}
              onChange={handleInputChange}
              placeholder="输入内容"
            />
            <button type="submit">添加数据</button>
          </form>

          {/* 知识点7：map遍历数组 */}
          <div>
            {list.map((item) => (
              <div key={item.id}> {/* 必须带key */}
                {/* 知识点8：span标签（行内） */}
                <span>{item.text}    </span>
                <button onClick={() => handleUpdateItem(item.id)}>修改</button>
              </div>
            ))}
          </div>

          {/* 知识点8：Link（内部跳转）和a标签（外部跳转） */}
          <Link href="/">回到首页</Link>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <a href="https://nextjs.org" target="_blank">Next.js官网</a>

          {/* 知识点8：img标签 */}
          <img src="https://picsum.photos/200/100" alt="示例图" />
          <img src="/image/111.jpg" />
        </>
      )}
    </div>
  );
}