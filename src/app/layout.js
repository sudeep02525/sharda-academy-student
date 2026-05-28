import "./globals.css";

export const metadata = {
  title: "Student Dashboard | Sharda Academy SAMS Portal",
  description: "Official student performance and biometric check-in tracking dashboard of Sharda Academy.",
  icons: {
    icon: "/logo_cropped.png",
    shortcut: "/logo_cropped.png",
    apple: "/logo_cropped.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo_cropped.png" type="image/png" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
