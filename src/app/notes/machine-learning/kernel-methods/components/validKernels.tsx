import { BlockMath, InlineMath } from "react-katex";

import Derivation from "~/app/notes/_components/derivation";
import Section from "~/app/notes/_components/section";

export default function ValidKernels() {
  return (
    <Section heading="Validity of Kernels">
      <div>
        A kernel <InlineMath math="K(x, z)" /> is valid if there exists a feature mapping <InlineMath math="\phi" /> such that{" "}
        <InlineMath math="K(x, z) = \left\langle \phi(x), \phi(z) \right\rangle" />.
      </div>
      <div>
        One example of a valid kernel is the quadratic kernel. <InlineMath math="K(x, z) = \left( x^T z + c \right)^2" />. The feature mapping of this kernel is:
      </div>
      <BlockMath math="\phi(x) = \begin{bmatrix} x_1 x_1 \\ x_1 x_2 \\ x_1 x_3 \\ x_2 x_1 \\ x_2 x_2 \\ x_2 x_3 \\ x_3 x_1 \\ x_3 x_2 \\ x_3 x_3 \\ \sqrt{2c} x_1 \\ \sqrt{2c} x_2 \\ \sqrt{2c} x_3 \\ c \end{bmatrix}" />

      <Derivation>
        <div className="flex flex-col">
          <BlockMath math="K(x, z) = \left( x^T z + c \right)^2" />
          <BlockMath math="= \left( x^T z \right)^2 + 2c \left( x^T z \right) + c^2" />
          <BlockMath math="= \left( \sum_{i=1}^{d} x_i z_i \right)^2 + 2c \left( \sum_{i=1}^{d} x_i z_i \right) + c^2" />
          <BlockMath math="= \left( \sum_{i=1}^{d} x_i z_i \right)^2 + \left( \sum_{i=1}^{d} \left( x_i \sqrt{2c} \right) \left( z_i \sqrt{2c} \right) \right) + c^2" />
        </div>
      </Derivation>

      <div>There is another, more formal way to check if a kernel is valid. This is by checking if the kernel satisfies the Mercer&apos;s condition.</div>
      <div>
        Let <InlineMath math="K" /> denote the kernel matrix of a kernel function <InlineMath math="K(x, z)" />. If <InlineMath math="K(x, z)" /> is a valid kernel, then <InlineMath math="K" /> must
        be a positive semidefinite matrix.
      </div>
      <div>
        In other words, for any valid kernel matrix <InlineMath math="K" />, and any vector <InlineMath math="z" />, the following must hold:
      </div>
      <div>
        <BlockMath math="z^T K z = \sum_{i} \sum_{j} z_i K_{ij} z_j \geq 0" />
      </div>

      <Derivation>
        <div className="flex flex-col">
          <BlockMath math="z^T K z = \sum_{i} \sum_{j} z_i K_{ij} z_j" />
          <BlockMath math="= \sum_i \sum_j z_i \, \phi(x^{(i)})^T \phi(x^{(j)}) \, z_j" />
          <BlockMath math="= \sum_i \sum_j z_i \left( \sum_k \phi_k(x^{(i)}) \phi_k(x^{(j)}) \right) z_j" />
          <BlockMath math="= \sum_k \sum_i \sum_j z_i \, \phi_k(x^{(i)}) \phi_k(x^{(j)}) \, z_j" />
          <BlockMath math="= \sum_k \left( \sum_i z_i \, \phi_k(x^{(i)}) \right) \left( \sum_j \phi_k(x^{(j)}) \, z_j \right)" />
          <BlockMath math="= \sum_k \left( \sum_i z_i \, \phi_k(x^{(i)}) \right)^2" />
          <BlockMath math="\geq 0" />
        </div>
      </Derivation>
    </Section>
  );
}
