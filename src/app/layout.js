
import "./globals.css";



export const metadata = {
  title: "SPIN THE WHEEL AOT",
  description: "If you win, you live. If you loose, you die. If you don't fight, you can't win!! ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
