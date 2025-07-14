import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" disabled={pending}>
      {pending ? '提交中...' : '登录'}
    </button>
  );
}

type ActionState = {
  message: number;
} | null;

const submitAction = async (_prev: ActionState, formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');
  console.log(`用户名: ${username}\n密码: ${password}`);
  await new Promise((res) => setTimeout(res, 1000));
  return {
    message: 1,
  };
};

export function Component() {
  const [state, formAction] = useActionState<ActionState, FormData>(submitAction, null);

  // 每次输入
  console.log('form re-render');

  return (
    <form action={formAction} className="mx-auto mt-10 flex max-w-xs flex-col gap-4 rounded border p-6 shadow">
      <label className="flex flex-col gap-1">
        用户名：
        <input type="text" name="username" className="rounded border px-2 py-1" placeholder="请输入用户名" required />
      </label>
      <label className="flex flex-col gap-1">
        密码：
        <input type="password" name="password" className="rounded border px-2 py-1" placeholder="请输入密码" required />
      </label>
      <Submit />
      {state?.message}
    </form>
  );
}
