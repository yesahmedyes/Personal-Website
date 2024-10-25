import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Detour from "~/app/notes/_components/detour";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";
import Section from "~/app/notes/_components/section";

export default function ICA() {
  return (
    <Section title="Independent Component Analysis">
      <Content>
        <div>
          We imagine there is some data <InlineMath math="s \in \mathbb{R}^d" /> that is generated via <InlineMath math="d" /> independent sources.
        </div>
        <div>
          We also have a mixing matrix <InlineMath math="A \in \mathbb{R}^{d \times d}" /> that mixes the sources to produce the observed data <InlineMath math="x \in \mathbb{R}^d" />.
        </div>
        <div>
          <BlockMath math="x = A s" />
        </div>
        <div>
          Repeated observations of the data give us a set of training samples <InlineMath math="\{x^{(1)}, \ldots, x^{(n)} \}" /> and we want to find the unmixing matrix{" "}
          <InlineMath math="W = A^{-1}" /> that allows us to reconstruct the sources.
        </div>
        <div>
          <BlockMath math="s = W x" />
        </div>
      </Content>
      <Content>
        <div>
          We suppose that the distribution of each source <InlineMath math="s_j" /> is given by <InlineMath math="p_{s}(s_j)" /> and is independent of the other sources. Therefore the joint
          distribution of the sources is:
        </div>
        <div>
          <BlockMath math="p(s) = \prod_{j=1}^d p_{s}(s_j)" />
        </div>
      </Content>

      <Detour about="Change of Variables in Probability">
        <div>
          For any two vectors that are linearly related by <InlineMath math="s = Wx" />, the absolute value of the determinant of the transformation matrix <InlineMath math="W" /> gives the factor by
          which the volume of any region in the space changes.
        </div>
        <div>
          Therefore, if we have a probability distribution <InlineMath math="p(s)" />, the probability distribution of the transformed variables <InlineMath math="p(x)" /> is given by:
        </div>
        <div>
          <BlockMath math="p(s) = \frac{1}{|W|} \cdot p(x)" />
        </div>
      </Detour>

      <Content>
        <div>
          Since <InlineMath math="s = W x" />, the distribution of the sources in terms of the data is:
        </div>
        <div>
          <BlockMath math="p(s)\cdot|W| = p(x)" />
        </div>
        <div>Therefore the distribution of the data in terms of the sources is:</div>
        <div>
          <BlockMath math="p(x) = \left( \prod_{j=1}^d p_{s}(w_j^T x) \right) \cdot |W|" />
        </div>
        <div>
          We want to choose a monotonically increasing function that increases from <InlineMath math="0" /> to <InlineMath math="1" /> to be the CDF of our probability distribution. The derivative of
          the CDF will give us our probability density function. Choosing Sigmoid to be our CDF, we get:
        </div>
        <div className="flex flex-col">
          <BlockMath math="p(s) = g'(s)" />
          <BlockMath math="g(s) = \frac{1}{1 + \exp(-s)}" />
        </div>
      </Content>
      <Content>
        <div>The log-likelihood of the data is then given by:</div>
        <div>
          <BlockMath math="\ell(W) = \sum_{i=1}^n \left(\sum_{j=1}^d \log g'(w_j^T x^{(i)}) \right) + \log |W|" />
        </div>
        <div>
          Taking the derivative of the log-likelihood with respect to <InlineMath math="W" /> and setting it to 0, we get the following gradient descent update rule:
        </div>
        <div>
          <BlockMath math="W \leftarrow W + \alpha \left( \left( \begin{array}{c} 1 - 2g(w_1^T x^{(i)}) \\ 1 - 2g(w_2^T x^{(i)}) \\ \vdots \\ 1 - 2g(w_d^T x^{(i)}) \end{array} \right) \left(x^{(i)}\right)^T + \left(W^{-1}\right)^T \right)" />
        </div>
      </Content>
      <Derivation>
        <Lemma>
          <div>The derivative of the sigmoid function is equal to:</div>
          <div>
            <BlockMath math="g'(z) = g(z)\left(1 - g(z)\right)" />
          </div>
        </Lemma>

        <DerivationContent>
          <div className="flex flex-col">
            <Info
              info={
                <div>
                  Ignoring terms that do not depend on <InlineMath math="w_k" />
                </div>
              }
            >
              <BlockMath math="\nabla_{w_k} \, \ell(W) = \nabla_{w_k} \left(\, \sum_{i=1}^n \log g'\left(w_k^T x^{(i)}\right) + \log |W| \right)" />
            </Info>
            <BlockMath math="= \sum_{i=1}^n \frac{1}{g'\left(w_k^T x^{(i)}\right)} \cdot \nabla_{w_k} \, g'\left(w_k^T x^{(i)}\right) + \frac{1}{|W|} \cdot \nabla_{w_k} |W|" />
            <Info
              info={
                <div className="flex flex-col">
                  <div>The derivative of the determinant is given by:</div>
                  <div>
                    <BlockMath math="\nabla_W \, |W| = |W| \left(W^{-1}\right)^T" />
                  </div>
                  <div>Therefore,</div>
                  <div>
                    <BlockMath math="\nabla_{w_k} \, |W| = |W| \left(W^{-1}\right)_k^T" />
                  </div>
                </div>
              }
            >
              <BlockMath math="= \sum_{i=1}^n \frac{1}{g'\left(w_k^T x^{(i)}\right)} \cdot \nabla_{w_k} \, \left[g \left(w_k^T x^{(i)} \right) \left(1 - g\left(w_k^T x^{(i)}\right)\right)\right] + \left(W^{-1}\right)_k^T" />
            </Info>
            <Info info={<div>Using the derivative product rule</div>}>
              <BlockMath math="= \sum_{i=1}^n \frac{1}{g'\left(w_k^T x^{(i)}\right)} \cdot \left[g \left(w_k^T x^{(i)} \right) \cdot \nabla_{w_k} \, \left(1 - g\left(w_k^T x^{(i)}\right)\right) + \left(1 - g\left(w_k^T x^{(i)}\right)\right) \cdot \nabla_{w_k} \, g \left(w_k^T x^{(i)} \right) \right] + \left(W^{-1}\right)_k^T" />
            </Info>
            <BlockMath math="= \sum_{i=1}^n \frac{1}{g\left(w_k^T x^{(i)}\right) \left(1 - g\left(w_k^T x^{(i)}\right)\right)} \cdot \left[-g \left(w_k^T x^{(i)} \right) \cdot g \left(w_k^T x^{(i)} \right) \left(1 - g \left(w_k^T x^{(i)} \right)\right) \cdot \left(x^{(i)}\right)^T \right." />
            <BlockMath math="\left. + \left(1 - g\left(w_k^T x^{(i)}\right)\right) \cdot g \left(w_k^T x^{(i)} \right) \left(1 - g \left(w_k^T x^{(i)} \right)\right) \cdot \left(x^{(i)}\right)^T \right] + \left(W^{-1}\right)_k^T" />
            <BlockMath math="= \sum_{i=1}^n \left[-g \left(w_k^T x^{(i)} \right) + \left(1 - g\left(w_k^T x^{(i)}\right)\right) \right] \cdot \left(x^{(i)}\right)^T + \left(W^{-1}\right)_k^T" />
            <BlockMath math="= \sum_{i=1}^n \left(\left(1 - 2 \, g(w_k^T x^{(i)}\right) \cdot \left(x^{(i)}\right)^T \right) + \left(W^{-1}\right)_k^T" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>Therefore,</div>
          <div>
            <BlockMath math="\nabla_W \, \ell(W)  = \left( \begin{array}{c} 1 - 2g(w_1^T x^{(i)}) \\ 1 - 2g(w_2^T x^{(i)}) \\ \vdots \\ 1 - 2g(w_d^T x^{(i)}) \end{array} \right) \left(x^{(i)}\right)^T + \left(W^{-1}\right)^T" />
          </div>
        </DerivationContent>
      </Derivation>
    </Section>
  );
}
