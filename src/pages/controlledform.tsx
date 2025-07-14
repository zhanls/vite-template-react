import React, { useState } from 'react';

export function Component() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以处理登录逻辑
    alert(`用户名: ${username}\n密码: ${password}`);
  };

  // 每次输入
  console.log('form re-render');

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-xs flex-col gap-4 rounded border p-6 shadow">
      <label className="flex flex-col gap-1">
        用户名：
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded border px-2 py-1"
          placeholder="请输入用户名"
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        密码：
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border px-2 py-1"
          placeholder="请输入密码"
          required
        />
      </label>
      <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        登录
      </button>
    </form>
  );
}
