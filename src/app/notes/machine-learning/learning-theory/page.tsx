import Main from "../../_components/main";
import BiasVarianceTradeoff from "./components/biasVarianceTradeoff";
import ComplexityBounds from "./components/complexityBounds";

export default function Page() {
  return (
    <Main>
      <BiasVarianceTradeoff />
      <ComplexityBounds />
    </Main>
  );
}
