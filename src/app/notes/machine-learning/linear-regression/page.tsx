import MainWithSidebar from "../../_components/mainWithSidebar";
import ClosedFormSolution from "./components/closed-form-solution";
import LMSAlgorithm from "./components/lms-algorithm";
import ProbabilisticInterpretation from "./components/probabilistic-interpretation";

export default function Page() {
  return (
    <MainWithSidebar>
      <LMSAlgorithm />
      <ClosedFormSolution />
      <ProbabilisticInterpretation />
    </MainWithSidebar>
  );
}
