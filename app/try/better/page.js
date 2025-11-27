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
    //   setList([{ id: 1, text: '第一条数据' }, { id: 2, text: '第二条数据' }]);
      setList((prev)=>{
        const newList = [...prev,{ id: 1, text: '第一条数据' }, { id: 2, text: '第二条数据' }];
        setNum(newList.length);
        return newList;
      });

      setLoading(false);
      // 知识点4：三元运算符（判断数组是否有效）
    //   setNum(Array.isArray(list) ? list.length : 0);
    //   console.log('list更新为：', Array.isArray(list));
    };
    fetchData();
  }, []);
  

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
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 p-4 md:p-8">
    {/* 页面容器 */}
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* 头部区域 */}
      <header className="bg-blue-600 text-white p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <span className="bg-white text-blue-600 p-2 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </span>
          核心知识点演示
        </h1>
        <p className="mt-2 text-blue-100 opacity-90">
          基于React/Next.js的数据交互演示示例
        </p>
      </header>

      {/* 主要内容区 */}
      <main className="p-6 md:p-8 space-y-8">
        {/* Loading控制按钮 */}
        <div className="flex justify-center">
          <button
            onClick={() => setLoading(!loading)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium flex items-center gap-2 shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? '关闭Loading' : '开启Loading'}
          </button>
        </div>

        {/* Loading状态 */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 bg-slate-50 dark:bg-slate-700/50 rounded-xl transition-opacity duration-300">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300">加载中...</p>
          </div>
        )}

        {/* 数据展示区域 */}
        {!loading && (
          <div className="space-y-8 transition-all duration-300 opacity-100 transform-none">
            {/* 数据统计 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-center justify-between">
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300">数据统计</h2>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {list.length > 0 ? `共 ${num} 条数据` : '暂无数据'}
              </span>
            </div>

            {/* 添加数据表单 */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleAdd(); }}
              className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-xl flex flex-col md:flex-row gap-4"
            >
              <input
                value={inputVal}
                onChange={handleInputChange}
                placeholder="输入内容..."
                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow hover:bg-green-700 active:scale-95 transition-all duration-300 whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                </svg>
                添加数据
              </button>
            </form>

            {/* 数据列表 */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                  {list.length}
                </span>
                数据列表
              </h3>

              {list.length > 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                  {list.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-200"
                    >
                      <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                      <button
                        onClick={() => handleUpdateItem(item.id)}
                        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center gap-1 text-sm hover:bg-blue-200 dark:hover:bg-blue-900/70 active:scale-95 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        修改
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-12 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                  <svg className="w-6 h-6 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p>暂无数据，请添加内容</p>
                </div>
              )}
            </div>

            {/* 链接区域 */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                回到首页
              </Link>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6a2 2 0 110-4 2 2 0 010 4zM14 18a2 2 0 110-4 2 2 0 010 4zM6 8a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4zm-8 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                Next.js官网
              </a>
            </div>

            {/* 图片展示 */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">示例图片</h3>
              <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src="https://picsum.photos/800/400"
                  alt="示例图"
                  className="w-full h-48 md:h-64 object-cover transition-all duration-500 hover:scale-105 hover:brightness-95"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 页脚区域 */}
      <footer className="bg-slate-100 dark:bg-slate-800 p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
        © {new Date().getFullYear()} 核心知识点演示 | 基于Next.js构建
      </footer>
    </div>
  </div>
);
}