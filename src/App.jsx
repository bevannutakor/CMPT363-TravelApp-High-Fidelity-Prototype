import { Routes, Route } from "react-router-dom";
import ItineraryBuilder from "./screens/ItineraryBuilder/ItineraryBuilder";
import UnderConstruction from "./screens/UnderConstruction";
function App() {
  return (
    <Routes>
    	<Route path="/" element={<ItineraryBuilder />} />
        <Route path="/under-construction" element={<UnderConstruction />} />
   </Routes>
  )
}

export default App
