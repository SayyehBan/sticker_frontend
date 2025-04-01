import { miladiToShamsiAndShahanshahi } from "./utilities/PersianDateConverter";

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500 text-white text-3xl">
      {miladiToShamsiAndShahanshahi(new Date(), 1)}
      <br />
      به نام ایران
    </div>
  );
}

export default App;
