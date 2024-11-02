import { BlockMath, InlineMath } from "react-katex";
import Algorithm from "~/app/notes/_components/algorithm";
import Content from "~/app/notes/_components/content";
 
import Derivation, { DerivationContent } from "~/app/notes/_components/derivation";
import Info from "~/app/notes/_components/info";
import Section from "~/app/notes/_components/section";

export default function LMSAlgorithm() {
  return (
    <Section title="Linear Regression" heading="Least Mean Squares">
      <Content>
        <div>
          We define a function <InlineMath math="h_{\theta}(x)" /> to model the <InlineMath math="d" /> features in each <InlineMath math="x^{(i)}" /> as:
        </div>
        <div>
          <BlockMath math="h_{\theta}(x) = \sum_{j=1}^{d} \theta_j x_j^{(i)} = \theta^T x" />
        </div>
        <div>
          For <InlineMath math="n" /> training examples, we also define a cost function that we want to minimize:
        </div>
        <div>
          <BlockMath math="J(\theta) = \frac{1}{2} \sum_{i=1}^{n} \left(h_{\theta}(x^{(i)}) - y^{(i)} \right)^2" />
        </div>
        <div>
          Taking the derivative with respect to any <InlineMath math="\theta_j" /> we get:
        </div>
        <div className="flex flex-col">
          <BlockMath math="\frac{\partial}{\partial \theta_j} J(\theta) = \sum_{i=1}^{n} \left[ h_\theta(x^{(i)}) - y^{(i)} \right] x_j^{(i)} " />
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\frac{\partial}{\partial \theta_j} J(\theta) = \frac{\partial}{\partial \theta_j} \left[ \frac{1}{2} \sum_{i=1}^{n} \left(h_{\theta}(x^{(i)}) - y^{(i)} \right)^2 \right]" />
            <BlockMath math="= \sum_{i=1}^{n} \left[2 \cdot \frac{1}{2} \left( h_\theta(x^{(i)}) - y^{(i)} \right) \cdot \frac{\partial}{\partial \theta_j} \left( h_\theta(x^{(i)}) - y^{(i)} \right) \right]" />
            <BlockMath math="= \sum_{i=1}^{n} \left[\left( h_\theta(x^{(i)}) - y^{(i)} \right) \cdot \frac{\partial}{\partial \theta_j} \left(\sum_{k=1}^{d} \left(\theta_k x_k^{(i)} - y^{(i)} \right) \right) \right]" />
            <Info
              info={
                <div>
                  Ignoring the other terms since they not depend on <InlineMath math="\theta_j" />
                </div>
              }
            >
              <BlockMath math="= \sum_{i=1}^{n} \left[\left( h_\theta(x^{(i)}) - y^{(i)} \right) \cdot \frac{\partial}{\partial \theta_j} \left( \theta_j x_j^{(i)} \right) \right]" />
            </Info>
            <BlockMath math="= \sum_{i=1}^{n} \left[\left( h_\theta(x^{(i)}) - y^{(i)} \right) \cdot x_j^{(i)} \right]" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>
          With this derivative, we can now use gradient descent to take small steps towards the optimal <InlineMath math="\theta" /> with the following update rule:
        </div>
        <div>
          <BlockMath math="\theta_j \leftarrow \theta_j + \alpha \left( y^{(i)} - h_\theta (x^{(i)}) \right) x_j^{(i)}" />
        </div>
      </Content>
      <Algorithm>
        <BlockMath math="\text{Repeat until convergence \{}" />
        <BlockMath math="\hspace{2em} \text{For } i = 1 \text{ to } n, \text{\{}" />
        <BlockMath math="\hspace{4em} \text{For } j = 1 \text{ to } d, \text{\{}" />
        <BlockMath math="\hspace{6em} \theta_j \leftarrow \theta_j + \alpha \left( y^{(i)} - h_\theta (x^{(i)}) \right) x_j^{(i)}" />
        <BlockMath math="\hspace{4em} \text{\}}" />
        <BlockMath math="\hspace{2em} \text{\}}" />
        <BlockMath math="\text{\}}" />
      </Algorithm>
    </Section>
  );
}
