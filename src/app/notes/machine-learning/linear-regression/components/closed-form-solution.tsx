import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Section from "~/app/notes/_components/section";

export default function ClosedFormSolution() {
  return (
    <Section heading="Closed Form Solution">
      <Content>
        <div>
          Let <InlineMath math="X" /> be a matrix that contains each <InlineMath math="\left(x^{(i)} \right)^T" /> in its rows and has a size of (<InlineMath math="n" /> by <InlineMath math="d+1" />)
          where <InlineMath math="d" /> is the number of features in <InlineMath math="x^{(i)}" /> and <InlineMath math="+ 1" /> is for the intercept term.
        </div>
        <div>
          Also, <InlineMath math="\vec{y}" /> is an <InlineMath math="n" /> dimensional vector that contains the labels for each training example. And <InlineMath math="\theta" /> is a{" "}
          <InlineMath math="d" /> dimensional vector that contains the weights for each feature.
        </div>
        <div>
          Now, since <InlineMath math="h_{\theta}(x) = \left(x^{(i)} \right)^T\theta" />, we can rewrite this in matrix-vector form as <InlineMath math="h_{\theta}(x) = X \theta" />
        </div>
        <div>
          With these, we can now rewrite <InlineMath math="J(\theta)" /> using the fact that <InlineMath math="z^T z = \sum_i z_i^2" />
        </div>
        <div className="flex flex-col">
          <BlockMath math="J(\theta) = \frac{1}{2} \sum_{i=1}^{n} \left(h_{\theta}(x^{(i)}) - y^{(i)} \right)^2" />
          <BlockMath math="= \frac{1}{2} \left(X\theta - \vec{y} \right)^T \left(X\theta - \vec{y} \right)" />
        </div>
        <div>
          Finally, to minimize <InlineMath math="J(\theta)" />, we find its derivative with respect <InlineMath math="\theta" />, set it equal to <InlineMath math="0" /> and simplify to see that{" "}
          <InlineMath math="\theta" /> is minimized when,
        </div>
        <div>
          <BlockMath math="\theta = \left(X^TX\right)^{-1}X^T \vec{y}" />
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\nabla_{\theta} J(\theta) = \nabla_{\theta} \left(\frac{1}{2} \left(X\theta - \vec{y} \right)^T \left(X\theta - \vec{y} \right) \right)" />
            <BlockMath math="= \frac{1}{2} \nabla_{\theta} \left( (X\theta)^T X\theta - (X \theta)^T \vec{y} - \vec{y}^T (X\theta) + \vec{y}^T \vec{y} \right)" />
            <Info
              info={
                <div>
                  Ignoring terms that do not depend on <InlineMath math="\theta" />
                </div>
              }
            >
              <BlockMath math="= \frac{1}{2} \nabla_{\theta} \left( \theta^T X^T X\theta - \theta^T X^T \vec{y} - \vec{y}^T X\theta \right)" />
            </Info>
            <Info
              info={
                <div className="flex flex-col">
                  <div>
                    Since <InlineMath math="X^T X" /> is a symmetric matrix and for any symmetric matrix <InlineMath math="A" />, <InlineMath math="\nabla_{x} \left(x^T A x \right) = 2Ax" />
                  </div>
                </div>
              }
            >
              <BlockMath math="= \frac{1}{2} \left[ 2 X^T X\theta - \nabla_{\theta} \left( \theta^T X^T \vec{y} + \vec{y}^T X\theta \right) \right]" />
            </Info>
            <BlockMath math="= \frac{1}{2} \left[ 2 X^T X\theta -  X^T \vec{y} - X^T \vec{y} \right]" />
            <BlockMath math="= \frac{1}{2} \left[ 2 X^T X\theta - 2 X^T \vec{y} \right]" />
            <BlockMath math="= X^T X\theta -  X^T \vec{y}" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>
            Setting this equal to <InlineMath math="0" /> and simplifying, we get:
          </div>
          <div className="flex flex-col">
            <BlockMath math="X^T X\theta = X^T \vec{y}" />
            <BlockMath math="\Rightarrow \theta = (X^T X)^{-1} X^T \vec{y}" />
          </div>
        </DerivationContent>
      </Derivation>
    </Section>
  );
}
