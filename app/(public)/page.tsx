import { auth } from "@/src/lib/auth";
import Hero from "@/src/shared/components/ui/Hero";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Head from "next/head";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: generatePageTitle('Inicio')
};


export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
    
  })

  return (
    <>
      <Hero />
    </>
  );
}
