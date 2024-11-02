import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
 
import Derivation, { DerivationContent } from "~/app/notes/_components/derivation";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";
import Section from "~/app/notes/_components/section";

export default function PCA() {
  return (
    <Section heading="Principal Component Analysis" title="Dimensionality Reduction">
      <Content>
        <div>
          Before we apply PCA, we often normalize our data so that each feature has mean 0 and variance 1. We do this by computing the mean and standard deviation of each feature and then for each{" "}
          <InlineMath math="x" /> in our data, we subtract the mean and divide by the standard deviation.
        </div>
        <BlockMath math="\mu_j = \frac{1}{m} \sum_{i=1}^{m} x^{(i)}_j" />
        <BlockMath math="\sigma_j^2 = \frac{1}{m} \sum_{i=1}^{m} (x^{(i)}_j - \mu_j)^2" />
        <BlockMath math="x^{(i)}_j \leftarrow \frac{x^{(i)}_j - \mu_j}{\sigma_j}" />
      </Content>
      <Content>
        <div>
          To select the principal component of <InlineMath math="x" />, we need to find the unit vector <InlineMath math="u" /> that maximizes the variance of the data when projected onto{" "}
          <InlineMath math="u" />. The greater the projection of <InlineMath math="x" /> onto <InlineMath math="u" />, the higher the variance, meaning more information is captured in that direction.
        </div>
        <div className="flex flex-col">
          <BlockMath math="u = \arg \max_u \frac{1}{n} \sum_{i=1}^{n} \left\| proj_u ( x^{(i)}) \right\|_2^2" />
          <BlockMath math="= \arg \max_u \left[ u^T \, \Sigma \, u \right] \text{ where } \Sigma = \frac{1}{n} \sum_{i=1}^{n} x^{(i)}x^{(i) T}" />
        </div>
      </Content>
      <Derivation>
        <Lemma>
          <div className="flex flex-col">
            <BlockMath math="proj_u (x) = \frac{x^T u}{u^T u} u" />
            <Info
              info={
                <div>
                  Since <InlineMath math="u" /> is a unit vector, so <InlineMath math="u^T u = 1" />.
                </div>
              }
            >
              <BlockMath math="= \left( x^T u \right) u" />
            </Info>
          </div>
        </Lemma>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="u = \arg \max_u \frac{1}{n} \sum_{i=1}^{n} \left\| proj_u ( x^{(i)}) \right\|_2^2" />
            <BlockMath math="= \arg \max_u \frac{1}{n} \sum_{i=1}^{n} \left\| \left( x^{(i) T} \cdot u \right) u \right\|_2^2" />
            <BlockMath math="= \arg \max_u \frac{1}{n} \sum_{i=1}^{n} \left( \left( u^T x^{(i)} x^{(i) T} u \right) \cdot u^T u \right)" />
            <Info
              info={
                <div>
                  Since <InlineMath math="u" /> is a unit vector, so <InlineMath math="u^T u = 1" />.
                </div>
              }
            >
              <BlockMath math="= \arg \max_u \left[ u^T \left( \frac{1}{n} \sum_{i=1}^{n} x^{(i)} x^{(i) T} \right) u \right]" />
            </Info>
            <BlockMath math="= \arg \max_u \left[ u^T \, \Sigma \, u \right] \text{ where } \Sigma = \frac{1}{n} \sum_{i=1}^{n} x^{(i)}x^{(i) T}" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>
          We can now use Lagrange optimization to find the unit vector <InlineMath math="u" /> that maximizes the variance. And it turns out the variance is maximized when <InlineMath math="u" /> is
          the eigenvector of our symmetric matrix <InlineMath math="\Sigma" />.
        </div>
        <BlockMath math="\Sigma u = \lambda u" />
      </Content>
      <Derivation>
        <Lemma>
          <div>
            For any vector <InlineMath math="u" />, the derivative of the norm of <InlineMath math="u" /> with respect to <InlineMath math="u" /> is:
          </div>
          <div>
            <BlockMath math="\frac{d}{du} \|u\| = \frac{u}{\|u\|}" />
          </div>
        </Lemma>
        <DerivationContent>
          <div>
            Since <InlineMath math="\|u\| = 1" /> we can rewrite this as <InlineMath math="\|u\| - 1 = 0" /> and use this to create our Lagrangian.
          </div>
          <div className="flex flex-col">
            <BlockMath math="L(u, \beta) = u^T \Sigma u + \beta \left(\|u\| - 1 \right)" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>
            Taking the derivative with respect to <InlineMath math="u" />:
          </div>
          <div className="flex flex-col">
            <BlockMath math="\nabla_u L(u, \beta) = 2 \Sigma u + \beta \left( \frac{u}{\|u\|} \right)" />
          </div>
          <div>Setting the derivative to 0, we get:</div>
          <div className="flex flex-col">
            <BlockMath math="2 \Sigma u = -\beta \left( \frac{u}{\|u\|} \right)" />
            <Info
              info={
                <div>
                  Since <InlineMath math="u" /> is a unit vector, so <InlineMath math="\|u\| = 1" />.
                </div>
              }
            >
              <BlockMath math="\Rightarrow \Sigma u = \left( -\frac{\beta}{2} \right) u" />
            </Info>
            <Info
              info={
                <div>
                  <InlineMath math="\lambda" /> is just a scalar value.
                </div>
              }
            >
              <BlockMath math="\Rightarrow \Sigma u = \lambda u \text{ where } \lambda = -\frac{\beta}{2}" />
            </Info>
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>
          However, we don&apos;t know which <InlineMath math="\lambda" /> to choose if there are multiple that satisfy this equation.
        </div>
        <div>
          But we can show we get the maximum variance when we choose the largest eigenvalue <InlineMath math="\lambda" />.
        </div>
        <div className="flex flex-col">
          <BlockMath math="\max \sigma^2 \leftrightarrow \max \lambda" />
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\max \sigma^2 \leftrightarrow \max \left[ u^T \left( \frac{1}{n} \sum_{i=1}^{n} x^{(i)} x^{(i) T} \right) u \right]" />
            <BlockMath math="= \max \left[ u^T \Sigma u \right]" />
            <Info
              info={
                <div>
                  Since <InlineMath math="\Sigma u = \lambda u" />{" "}
                </div>
              }
            >
              <BlockMath math="= \max \left[ u^T \lambda u \right]" />
            </Info>
            <Info
              info={
                <div>
                  Since <InlineMath math="u" /> is a unit vector, so <InlineMath math="u^T u = 1" />.
                </div>
              }
            >
              <BlockMath math="= \max \left[ \lambda \left(u^T u \right) \right]" />
            </Info>
            <BlockMath math="= \max \lambda" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>Therefore, to maximize the variance, we need to choose the eigenvector with the largest eigenvalue.</div>
        <div>
          In practice, we decompose <InlineMath math="\Sigma" /> into its eigenvalues and eigenvectors using singular value decomposition and then choose the top <InlineMath math="k" /> eigenvectors
          with the largest eigenvalues.
        </div>
      </Content>
    </Section>
  );
}
