import Headers from "@/components/ui/Headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
    <Headers />

    {children}
   </>
  );
}