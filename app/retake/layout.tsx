import RootLayout from "../layout";

export default function RetakeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout flexAuto={true}>{children}</RootLayout>;
}
