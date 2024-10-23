import MainWithSidebar from "../../_components/mainWithSidebar";
import FactorAnalysis from "./components/factorAnalysis";
import PCA from "./components/pca";

export default function Page() {
  return (
    <MainWithSidebar>
      <PCA />
      <FactorAnalysis />
    </MainWithSidebar>
  );
}
