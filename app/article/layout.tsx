export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div style={{ color: "green" }}>我是文章的布局</div>
      {children}
      <div style={{ color: "green" }}>我是文章的布局</div>
    </div>
  );
}
