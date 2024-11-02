import Main from "../../_components/main";
import ConvergenceProof from "./components/convergenceProof";
import GeneralAlgorithm from "./components/generalAlgorithm";
import OtherInterpretations from "./components/otherInterpretations";

export default function Page() {
  return (
    <Main>
      <GeneralAlgorithm />
      <ConvergenceProof />
      <OtherInterpretations />
    </Main>
  );
}
