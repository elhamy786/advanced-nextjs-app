// src/app/layout.tsx
import '../styles/globals.css';  // Corrected import path

export const metadata = {
  title: 'Cute Dog Gallery',
  description: 'A gallery of cute dogs!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

