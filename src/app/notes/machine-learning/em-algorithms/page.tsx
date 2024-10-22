import MainWithSidebar from "../../_components/mainWithSidebar";
import ConvergenceProof from "./components/convergenceProof";
import GeneralAlgorithm from "./components/generalAlgorithm";
import OtherInterpretations from "./components/otherInterpretations";

export default function Page() {
  return (
    <MainWithSidebar>
      <GeneralAlgorithm />
      <ConvergenceProof />
      <OtherInterpretations />
    </MainWithSidebar>
  );
}
