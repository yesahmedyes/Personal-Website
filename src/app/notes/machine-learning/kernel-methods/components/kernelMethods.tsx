import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Section from "~/app/notes/_components/section";

export default function KernelsMethods() {
  return (
    <Section title="Kernel Methods" heading="Introduction">
      <Content>
        <div>The gradient descent update for the least mean squares looks like this:</div>
        <div>
          <BlockMath math="\theta := \theta + \alpha \sum_{i=1}^{n} \left(y^{(i)} - \theta^T x^{(i)}\right)x^{(i)}" />
        </div>
        <div>
          However, sometimes our data is not linearly separable. For this, we can use a feature mapping to transform the data into a higher-dimensional space, and then apply the gradient descent as
          follows:
        </div>
        <div>
          <BlockMath math="\theta := \theta + \alpha \sum_{i=1}^{n} \left(y^{(i)} - \theta^T \phi(x^{(i)})\right)\phi(x^{(i)})" />
        </div>
        <div>
          However, this can become computationally expensive if the feature mapping is too complex. For example, if <InlineMath math="\phi(x)" /> is a vector that contains all the monomials of{" "}
          <InlineMath math="x" /> with degree <InlineMath math="\leq 3" />, then the dimension of our features are <InlineMath math="d^3" /> where <InlineMath math="d" /> is the dimension of{" "}
          <InlineMath math="x" />.
        </div>
        <div>
          This would mean that <InlineMath math="\theta" /> would also have <InlineMath math="d^3" /> parameters and we will need to compute <InlineMath math="d^3" /> gradient updates.
        </div>
      </Content>
      <Content>
        <div>
          To fix this, we first assume that <InlineMath math="\theta" /> can be represented as a linear combination of our training examples (or their feature mappings):
        </div>
        <div>
          <BlockMath math="\theta = \sum_{i=1}^{n} \beta_i \phi(x^{(i)})" />
        </div>
        <div>We can then rewrite the gradient descent update as follows:</div>
        <div className="flex flex-col">
          <BlockMath math="\theta := \theta + \alpha \sum_{i=1}^{n} \left(y^{(i)} - \theta^T \phi(x^{(i)})\right)\phi(x^{(i)})" />
          <BlockMath math="\theta := \sum_{i=1}^{n} \beta_i \phi(x^{(i)}) + \alpha \sum_{i=1}^{n} \left(y^{(i)} - \theta^T \phi(x^{(i)})\right)\phi(x^{(i)})" />
          <BlockMath math="\theta := \sum_{i=1}^{n} \left( \underbrace{\beta_i + \alpha \left( y^{(i)} - \theta^T \phi(x^{(i)}) \right)}_{\text{new } \beta_i} \right) \phi(x^{(i)})" />
        </div>
        <div>
          With this, to fine the new <InlineMath math="\theta" />, we only need to compute the new <InlineMath math="\beta_i" />
          &apos;s for all of our training examples. And the new <InlineMath math="\beta_i" />
          &apos;s can be found using the following update:
        </div>
        <div className="flex flex-col">
          <BlockMath math="\beta_i := \beta_i + \alpha \left( y^{(i)} - \theta^T \phi(x^{(i)}) \right)" />
          <BlockMath math="\beta_i := \beta_i + \alpha \left( y^{(i)} - \left(\sum_{j=1}^{n} \beta_j \phi(x^{(j)})\right)^T \phi(x^{(i)}) \right)" />
          <BlockMath math="\beta_i := \beta_i + \alpha \left( y^{(i)} - \sum_{j=1}^{n} \beta_j \, \phi(x^{(j)})^T \phi(x^{(i)}) \right)" />
        </div>
      </Content>
      <Content>
        <div>
          To avoid having to compute the dot products of the feature mappings for all <InlineMath math="i, j" />, on each iteration, we can precompute a kernel function that contains all the dot
          products before the training starts.
        </div>
        <div>
          <BlockMath math="K(x^{(i)}, x^{(j)}) = \phi(x^{(i)})^T \phi(x^{(j)}) = \left\langle \phi(x^{(i)}), \phi(x^{(j)}) \right\rangle" />
        </div>
        <div>
          It would seem that this is still computationally expensive if we have a lot of training examples since each dot product takes only <InlineMath math="O(d^3)" /> operations. But in reality, a
          dot product can be broken down so that it takes <InlineMath math="O(d)" /> operations.
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\left\langle \phi(x), \, \phi(z) \right\rangle = 1 + \sum_{i=1}^{d} x_i z_i + \sum_{i,j \in \{1, \dots, d\}} x_i x_j z_i z_j + \sum_{i,j,k \in \{1, \dots, d\}} x_i x_j x_k z_i z_j z_k" />
            <BlockMath math="= 1 + \sum_{i=1}^{d} x_i z_i + \left( \sum_{i=1}^{d} x_i z_i \right)\left( \sum_{j=1}^{d} x_j z_j \right) + \left( \sum_{i=1}^{d} x_i z_i \right)\left( \sum_{j=1}^{d} x_j z_j \right)\left( \sum_{k=1}^{d} x_k z_k \right)" />
            <BlockMath math="= 1 + \sum_{i=1}^{d} x_i z_i + \left( \sum_{i=1}^{d} x_i z_i \right)^2 + \left( \sum_{i=1}^{d} x_i z_i \right)^3" />
            <BlockMath math="= 1 + \langle x, z \rangle + \langle x, z \rangle^2 + \langle x, z \rangle^3" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>
          The update rule for <InlineMath math="\beta_i" /> is now:
        </div>
        <div>
          <BlockMath math="\beta_i := \beta_i + \alpha \left( y^{(i)} - \sum_{j=1}^{n} \beta_j \, K(x^{(i)}, x^{(j)}) \right)" />
        </div>
        <div>
          Similarly, for inference, we can predict the value of a new example <InlineMath math="x" /> as follows:
        </div>
        <div>
          <BlockMath math="\theta^T \phi(x) = \sum_{i=1}^{n} \beta_i K(x^{(i)}, x)" />
        </div>
      </Content>
    </Section>
  );
}
