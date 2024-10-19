import "~/styles/globals.css";
import "aos/dist/aos.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "Ahmed Haroon",
  description: "My Personal Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} leading-relaxed tracking-wide`}>
      <body>
        <TRPCReactProvider>
          <div className="hidden md:block">{children}</div>
          <div className="flex h-screen items-center justify-center md:hidden">
            <p className="text-center px-20 font-normal">This site is only available on desktop devices.</p>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
