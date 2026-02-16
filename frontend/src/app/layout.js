import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "TaskFlow - Organize Work. Move Faster",
  description: "Smart task management built for speed, clarity, and team collaboration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-montserrat`}
      >
        {children}
      </body>
    </html>
  );
}
