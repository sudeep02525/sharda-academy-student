import "./globals.css";
import NotificationListener from "@/components/NotificationListener";

export const metadata = {
  title: "Student Dashboard | Sharda Academy Portal",
  description: "Official student performance and biometric check-in tracking dashboard of Sharda Academy.",
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
        <link rel="icon" href="https://res.cloudinary.com/ybzctfb3/image/upload/v1784214512/sharda-academy/uploads/chl3yks6plrwp1ufvdkc.png" type="image/png" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <NotificationListener />
      </body>
    </html>
  );
}
