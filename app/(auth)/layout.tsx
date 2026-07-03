export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="landing-theme min-h-full flex-1">{children}</div>;
}
