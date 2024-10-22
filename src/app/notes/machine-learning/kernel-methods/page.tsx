import MainWithSidebar from "../../_components/mainWithSidebar";
import KernelsMethods from "./components/kernelMethods";
import ValidKernels from "./components/validKernels";

export default function Page() {
  return (
    <MainWithSidebar>
      <KernelsMethods />
      <ValidKernels />
    </MainWithSidebar>
  );
}
