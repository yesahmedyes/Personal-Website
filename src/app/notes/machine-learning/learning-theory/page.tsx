import MainWithSidebar from "../../_components/mainWithSidebar";
import BiasVarianceTradeoff from "./components/biasVarianceTradeoff";
import ComplexityBounds from "./components/complexityBounds";

export default function Page() {
  return (
    <MainWithSidebar>
      <BiasVarianceTradeoff />
      <ComplexityBounds />
    </MainWithSidebar>
  );
}
