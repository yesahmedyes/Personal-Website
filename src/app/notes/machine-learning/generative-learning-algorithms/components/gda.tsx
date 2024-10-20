import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Section from "~/app/notes/_components/section";

export default function GDA() {
  return (
    <Section title="Generative Learning Algorithms" heading="Gaussian Discriminant Analysis">
      <Content>
        <div>
          If we want to classify between cats and dogs, discrimnative learning algorithms try to learn a hyperplane that separates the two classes directly. Generative learning algorithms, try to
          learn a model for what cats look like and a separate model to learn what dogs look like.
        </div>
        <div>
          After modelling <InlineMath math="p(x \mid y)" /> for each class and the class prior <InlineMath math="p(y)" />, we can classify a new example by computing the posterior{" "}
          <InlineMath math="p(y \mid x)" /> for each class and picking the class with the highest posterior probability.
        </div>
        <div className="flex flex-col">
          <BlockMath math="\arg \max_y p(y \mid x) = \arg \max_y \, \frac{p(x \mid y) p(y)}{p(x)}" />
          <BlockMath math="= \arg \max_y \, p(x \mid y) \, p(y)" />
        </div>
        <div>
          In Gaussian Discriminant Analysis (GDA), we assume that each of <InlineMath math="p(x \mid y)" /> follows a multivariate gaussian distribution with unique mean but a shared covariance
          matrix.
        </div>
        <div className="flex flex-col">
          <BlockMath math="p(y) = \phi^y (1 - \phi)^{1 - y}" />
          <BlockMath math="p(x \mid y = 0) = \frac{1}{(2 \pi)^{d/2} |\Sigma|^{1/2}} \exp \left( -\frac{1}{2} (x - \mu_0)^T \Sigma^{-1} (x - \mu_0) \right)" />
          <BlockMath math="p(x \mid y = 1) = \frac{1}{(2 \pi)^{d/2} |\Sigma|^{1/2}} \exp \left( -\frac{1}{2} (x - \mu_1)^T \Sigma^{-1} (x - \mu_1) \right)" />
        </div>
        <div>The log-likelihood of the data is then given by:</div>
        <div>
          <BlockMath math="\ell(\phi, \mu_0, \mu_1, \Sigma) = \log \prod_{i=1}^n \, p(x^{(i)}, y^{(i)}; \phi, \mu_0, \mu_1, \Sigma)" />
        </div>
        <div>
          By maximizing <InlineMath math="\ell" /> with respect to the parameters, we find the maximum likelihood estimate of the parameters to be:
        </div>
        <div className="flex flex-col">
          <BlockMath math="\phi = \frac{1}{n} \sum_{i=1}^n 1\{y^{(i)} = 1\}" />
          <BlockMath math="\mu_0 = \frac{\sum_{i=1}^n 1\{y^{(i)} = 0\} x^{(i)}}{\sum_{i=1}^n 1\{y^{(i)} = 0\}}" />
          <BlockMath math="\mu_1 = \frac{\sum_{i=1}^n 1\{y^{(i)} = 1\} x^{(i)}}{\sum_{i=1}^n 1\{y^{(i)} = 1\}}" />
          <BlockMath math="\Sigma = \frac{1}{n} \sum_{i=1}^n (x^{(i)} - \mu_{y^{(i)}})(x^{(i)} - \mu_{y^{(i)}})^T" />
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\arg \max \, \ell(\phi, \mu_0, \mu_1, \Sigma) = \arg \max \, \left( \log \prod_{i=1}^n \, p (x^{(i)}, y^{(i)}; \phi, \mu_0, \mu_1, \Sigma) \right)" />
            <Info
              info={
                <div>
                  We don&apos;t need to divide by <InlineMath math="p(x^{(i)})" /> because it is constant with respect to the parameters.
                </div>
              }
            >
              <BlockMath math="= \arg \max \, \left( \log \prod_{i=1}^n p(x^{(i)} \mid y^{(i)}; \mu_{y^{(i)}}, \Sigma) \cdot p(y^{(i)}; \phi) \right)" />
            </Info>
          </div>
          <BlockMath math="= \arg \max \, \sum_{i=1}^n \left({y^{(i)}} \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 1; \mu_1, \Sigma \right) + \, (1-y^{(i)}) \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 0; \mu_0, \Sigma \right) \right." />
          <BlockMath math="\left. + \, \log \, {y^{(i)}} \cdot p\left(y^{(i)} = 1; \phi\right) + \, \log \, (1 - y^{(i)}) \cdot p\left(y^{(i)} = 0; \phi\right) \right)" />
        </DerivationContent>
        <DerivationContent>
          <div>
            Now taking the derivative with respect to <InlineMath math="\phi" />:
          </div>
          <div className="flex flex-col">
            <Info
              info={
                <div>
                  Ignoring terms that are constant with respect to <InlineMath math="\phi" />.
                </div>
              }
            >
              <BlockMath math="\frac{\partial}{\partial \phi} \, \sum_{i=1}^n \left( y^{(i)} \log \phi + (1 - y^{(i)}) \log (1 - \phi) \right)" />
            </Info>
            <BlockMath math="= \sum_{i=1}^n \left( \frac{y^{(i)}}{\phi} - \frac{1 - y^{(i)}}{1 - \phi} \right)" />
            <BlockMath math="= \sum_{i=1}^n \left( \frac{y^{(i)}}{\phi (1 - \phi)} - \frac{1}{1 - \phi} \right)" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>Setting this equal to 0, we get:</div>
          <BlockMath math="\sum_{i=1}^n \left( \frac{y^{(i)}}{\phi (1 - \phi)} - \frac{1}{1 - \phi} \right) = 0" />
          <BlockMath math="\sum_{i=1}^n \left(\frac{y^{(i)}}{\phi (1 - \phi)}\right) = \frac{n}{1 - \phi}" />
          <BlockMath math="\frac{1}{n} \sum_{i=1}^n y^{(i)} = \phi" />
          <Info
            info={
              <div>
                Since <InlineMath math="y^{(i)}" /> is either 0 or 1
              </div>
            }
          >
            <BlockMath math="\phi = \frac{1}{n} \sum_{i=1}^n 1\{y^{(i)} = 1\}" />
          </Info>
        </DerivationContent>
      </Derivation>
    </Section>
  );
}
