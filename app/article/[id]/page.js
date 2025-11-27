import { use } from "react";
export default function Page({ params }) {
  // const { id } = params;
  const unwrappedParams = use(params);
  const id=unwrappedParams.id;


  return <div>我是文章：{id}</div>;
}
