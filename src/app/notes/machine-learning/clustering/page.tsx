import MainWithSidebar from "../../_components/mainWithSidebar";
import GaussianMixtureModels from "./components/gaussianMixtureModels";
import KMeansAlgorithm from "./components/kMeansAlgorithm";

export default function Page() {
  return (
    <MainWithSidebar>
      <KMeansAlgorithm />
      <GaussianMixtureModels />
    </MainWithSidebar>
  );
}
