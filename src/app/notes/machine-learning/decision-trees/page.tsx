import MainWithSidebar from "../../_components/mainWithSidebar";
import Bagging from "./components/bagging";
import Boosting from "./components/boosting";
import Introduction from "./components/introduction";

export default function Page() {
  return (
    <MainWithSidebar>
      <Introduction />
      <Bagging />
      <Boosting />
    </MainWithSidebar>
  );
}
