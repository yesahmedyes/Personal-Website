import MainWithSidebar from "../../_components/mainWithSidebar";
import LMSAlgorithm from "./components/lms-algorithm";
import ProbabilisticInterpretation from "./components/probabilistic-interpretation";

export default function LinearRegression() {
  return (
    <MainWithSidebar>
      <LMSAlgorithm />
      <ProbabilisticInterpretation />
    </MainWithSidebar>
  );
}
