import { Header } from "@/components/header/Header";
import { Main } from "@/components/main/Main";

function App() {
  return (
    <div className="h-svh font-bricolage overflow-hidden bg-background text-foreground flex flex-col">
      <Header />
      <Main />
    </div>
  );
}

export default App;
