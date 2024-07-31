
import "../styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";


export const metadata = {
  title: "getprompts",
  description: "Discover and share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <div className="app">
          <Nav/>
          {children}
        </div>
        </Provider>
      </body>
    </html>
  );
}
