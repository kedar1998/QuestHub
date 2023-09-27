import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export const metadata = {
  title: "QuestHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
