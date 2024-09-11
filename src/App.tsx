import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Basic } from "./form/basic";

function App() {
  return (
    <div className="flex justify-center mt-10">
      <Tabs defaultValue="basic" className="w-96">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">기본</TabsTrigger>
          <TabsTrigger value="basic2">기본2</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Basic />
        </TabsContent>
        <TabsContent value="basic2">222222</TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
