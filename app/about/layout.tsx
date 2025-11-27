export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div style={{ color: "green" }}>我是about的布局</div>
      {children}
      <div style={{ color: "green" }}>我是在下面的布局</div>
    </html>
  );
}
