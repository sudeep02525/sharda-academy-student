import "./globals.css";
import NotificationListener from "@/admin-components/NotificationListener";

export const metadata = {
  title: "Admin Portal | Sharda Academy Portal",
  description:
    "Official administration portal and database manager dashboard of Sharda Academy.",
  icons: {
    icon: "/logo_cropped.png",
    shortcut: "/logo_cropped.png",
    apple: "/logo_cropped.png",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <NotificationListener />
      </body>
    </html>
  );
}
