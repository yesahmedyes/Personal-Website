import Main from "../../_components/main";
import ClosedFormSolution from "./components/closed-form-solution";
import LMSAlgorithm from "./components/lms-algorithm";
import ProbabilisticInterpretation from "./components/probabilistic-interpretation";

export default function Page() {
  return (
    <Main>
      <LMSAlgorithm />
      <ClosedFormSolution />
      <ProbabilisticInterpretation />
    </Main>
  );
}
