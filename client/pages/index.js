import { useState } from "react";

import Map from "../components/map";

const Index = () => {
  const [totalCO2, setTotalCO2] = useState("");

  console.log("x", totalCO2);
  
  return (
    <div>
      <Map totalCO2={totalCO2} setTotalCO2={setTotalCO2} />
    </div>
  );
};

export default Index;
