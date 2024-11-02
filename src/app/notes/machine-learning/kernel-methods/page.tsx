import Main from "../../_components/main";
import KernelsMethods from "./components/kernelMethods";
import ValidKernels from "./components/validKernels";

export default function Page() {
  return (
    <Main>
      <KernelsMethods />
      <ValidKernels />
    </Main>
  );
}
