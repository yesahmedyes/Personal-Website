import MainWithSidebar from "../../_components/mainWithSidebar";
import ICA from "./components/ica";
import Limitations from "./components/limitations";

export default function Page() {
  return (
    <MainWithSidebar>
      <ICA />
      <Limitations />
    </MainWithSidebar>
  );
}
