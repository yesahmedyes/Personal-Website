import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";
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
          <BlockMath math="\ell(\phi, \mu_0, \mu_1, \Sigma) = \log \prod_{i=1}^n \, p\left(x^{(i)}, y^{(i)}; \phi, \mu_0, \mu_1, \Sigma\right)" />
        </div>
        <div>
          By maximizing <InlineMath math="\ell" /> with respect to the parameters, we find the maximum likelihood estimate of the parameters to be:
        </div>
        <div className="flex flex-col">
          <BlockMath math="\phi = \frac{1}{n} \sum_{i=1}^n 1\left\{y^{(i)} = 1\right\}" />
          <BlockMath math="\mu_0 = \frac{\sum_{i=1}^n 1\left\{y^{(i)} = 0\right\} x^{(i)}}{\sum_{i=1}^n 1\left\{y^{(i)} = 0\right\}}" />
          <BlockMath math="\mu_1 = \frac{\sum_{i=1}^n 1\left\{y^{(i)} = 1\right\} x^{(i)}}{\sum_{i=1}^n 1\left\{y^{(i)} = 1\right\}}" />
          <BlockMath math="\Sigma = \frac{1}{n} \sum_{i=1}^n \left(x^{(i)} - \mu_{y^{(i)}}\right) \left(x^{(i)} - \mu_{y^{(i)}}\right)^T" />
        </div>
      </Content>
      <div className="flex flex-col">
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\ell(\phi, \mu_0, \mu_1, \Sigma) = \log \, \prod_{i=1}^n \, p (x^{(i)}, y^{(i)}; \phi, \mu_0, \mu_1, \Sigma)" />
              <Info
                info={
                  <div>
                    We don&apos;t need to divide by <InlineMath math="p(x^{(i)})" /> because it is constant with respect to the parameters.
                  </div>
                }
              >
                <BlockMath math="= \log \, \prod_{i=1}^n p(x^{(i)} \mid y^{(i)}; \mu_{y^{(i)}}, \Sigma) \cdot p(y^{(i)}; \phi)" />
              </Info>
              <BlockMath math="= \sum_{i=1}^n \left[{y^{(i)}} \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 1; \mu_1, \Sigma \right) + \, (1-y^{(i)}) \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 0; \mu_0, \Sigma \right) \right." />
              <BlockMath math="\left. + \, \log \, {y^{(i)}} \cdot p\left(y^{(i)} = 1; \phi\right) + \, \log \, (1 - y^{(i)}) \cdot p\left(y^{(i)} = 0; \phi\right) \right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Now taking the derivative with respect to <InlineMath math="\phi" />, we get:
            </div>
            <div className="flex flex-col">
              <Info
                info={
                  <div>
                    Ignoring terms that are constant with respect to <InlineMath math="\phi" />.
                  </div>
                }
              >
                <BlockMath math="\nabla_{\phi} \, \sum_{i=1}^n \left( y^{(i)} \log \phi + (1 - y^{(i)}) \log (1 - \phi) \right)" />
              </Info>
              <BlockMath math="= \sum_{i=1}^n \left( \frac{y^{(i)}}{\phi} - \frac{1 - y^{(i)}}{1 - \phi} \right)" />
              <BlockMath math="= \sum_{i=1}^n \left( \frac{y^{(i)}}{\phi (1 - \phi)} - \frac{1}{1 - \phi} \right)" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Setting this equal to 0, we get:</div>
            <BlockMath math="\sum_{i=1}^n \left( \frac{y^{(i)}}{\phi (1 - \phi)} - \frac{1}{1 - \phi} \right) = 0" />
            <BlockMath math="\Rightarrow \sum_{i=1}^n \left(\frac{y^{(i)}}{\phi (1 - \phi)}\right) = \frac{n}{1 - \phi}" />
            <BlockMath math="\Rightarrow \frac{1}{n} \sum_{i=1}^n y^{(i)} = \phi" />
            <Info
              info={
                <div>
                  Since <InlineMath math="y^{(i)}" /> is either 0 or 1
                </div>
              }
            >
              <BlockMath math="\Rightarrow \phi = \frac{1}{n} \sum_{i=1}^n 1\left\{y^{(i)} = 1\right\}" />
            </Info>
          </DerivationContent>
        </Derivation>
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^n \left[{y^{(i)}} \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 1; \mu_1, \Sigma \right) + \, (1-y^{(i)}) \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 0; \mu_0, \Sigma \right) \right." />
              <BlockMath math="\left. + \, \log \, {y^{(i)}} \cdot p\left(y^{(i)} = 1; \phi\right) + \, \log \, (1 - y^{(i)}) \cdot p\left(y^{(i)} = 0; \phi\right) \right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Now taking the derivative with respect to <InlineMath math="\mu_0" />, we get:
            </div>
            <div className="flex flex-col">
              <Info
                info={
                  <div>
                    Ignoring terms that are constant with respect to <InlineMath math="\phi" />.
                  </div>
                }
              >
                <BlockMath math="\nabla_{\mu_0} \, \sum_{i=1}^n \left(1 - y^{(i)}\right) \log p\left(x^{(i)} \mid y^{(i)} = 0; \mu_0, \Sigma \right) " />
              </Info>
              <BlockMath math="= \nabla_{\mu_0} \sum_{i=1}^n \left(1 - y^{(i)}\right) \left( -\frac{1}{2} (x^{(i)} - \mu_0)^T \Sigma^{-1} (x^{(i)} - \mu_0)  \right)" />
              <BlockMath math="= \sum_{i=1}^n \left(1 - y^{(i)}\right) \left( \nabla_{\mu_0} \left[-\frac{1}{2} (x^{(i)} - \mu_0)^T \Sigma^{-1} (x^{(i)} - \mu_0) \right] \right)" />
              <BlockMath math="= \sum_{i=1}^n \left(1 - y^{(i)}\right) \left( \nabla_{\mu_0} \left[-\frac{1}{2} \left( x^{(i)T}\Sigma^{-1} x^{(i)} - \mu_0^T \Sigma^{-1} x^{(i)} - x^{(i)T}\Sigma^{-1} \mu_0 + \mu_0^T \Sigma^{-1} \mu_0 \right) \right] \right)" />
              <Info
                info={
                  <div className="flex flex-col">
                    <div>
                      <InlineMath math="\Sigma^{-1}" /> is a symmetric matrix.
                    </div>
                    <div>
                      For any symmetric matrix <InlineMath math="A" />, <InlineMath math="\nabla_{x} \left(x^T A x \right) = 2Ax" />
                    </div>
                  </div>
                }
              >
                <BlockMath math="= \sum_{i=1}^n \left(1 - y^{(i)}\right) \left[-\frac{1}{2} \left( - \Sigma^{-1} x^{(i)} - \Sigma^{-T} x^{(i)} + 2 \left(\Sigma^{-1} \mu_0 \right) \right) \right]" />
              </Info>
              <Info
                info={
                  <div>
                    For symmetric matrices <InlineMath math="(A^{-1})^T = A^{-1}" />
                  </div>
                }
              >
                <BlockMath math="= \sum_{i=1}^n \left(1 - y^{(i)}\right) \left[-\frac{1}{2} \left( - \Sigma^{-1} x^{(i)} - \Sigma^{-1} x^{(i)} + 2 \left(\Sigma^{-1} \mu_0 \right) \right) \right]" />
              </Info>
              <BlockMath math="= \sum_{i=1}^{n} \left(1 - y^{(i)}\right) \left( \Sigma^{-1} x^{(i)} - \Sigma^{-1} \mu_0 \right)" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Setting this equal to <InlineMath math="0" /> and simplifying, we get:
            </div>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^n \left[ \left(1 - y^{(i)}\right) \Sigma^{-1} x^{(i)} \right] = \sum_{i=1}^n \left[ \left(1 - y^{(i)}\right) \Sigma^{-1} \mu_0 \right]" />
              <Info
                info={
                  <div>
                    Since <InlineMath math="y^{(i)}" /> is just a scalar
                  </div>
                }
              >
                <BlockMath math="\Rightarrow \sum_{i=1}^n \left[ \Sigma^{-1} \left(1 - y^{(i)}\right) x^{(i)} \right] = \sum_{i=1}^n \left[\Sigma^{-1} \left(1 - y^{(i)}\right) \mu_0 \right]" />
              </Info>
              <Info
                info={
                  <div>
                    Since <InlineMath math="\Sigma_l^{-1}" /> and <InlineMath math="\mu_l^{-1}" /> do not depend on <InlineMath math="i" />
                  </div>
                }
              >
                <BlockMath math="\Rightarrow \Sigma^{-1} \left[\sum_{i=1}^n \left(1 - y^{(i)}\right) x^{(i)} \right] = \Sigma^{-1} \left[ \sum_{i=1}^n \left(1 - y^{(i)}\right)\right] \mu_0" />
              </Info>
              <BlockMath math="\Rightarrow \left[\sum_{i=1}^n \left(1 - y^{(i)}\right) x^{(i)} \right] = \left[ \sum_{i=1}^n \left(1 - y^{(i)}\right)\right] \mu_0" />
              <BlockMath math="\Rightarrow \mu_0 = \frac{\sum_{i=1}^n \left(1 - y^{(i)}\right) x^{(i)}}{\sum_{i=1}^n \left(1 - y^{(i)}\right)}" />
              <BlockMath math="\Rightarrow \mu_0 = \frac{\sum_{i=1}^n 1\left\{y^{(i)} = 0\right\} \, x^{(i)}}{\sum_{i=1}^n 1\left\{y^{(i)} = 0\right\}}" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Similarly, taking the derivative with respect to <InlineMath math="\mu_1" /> and setting it equal to 0, we get:
            </div>
            <BlockMath math="\mu_1 = \frac{\sum_{i=1}^n 1\left\{y^{(i)} = 1\right\} \, x^{(i)}}{\sum_{i=1}^n 1\left\{y^{(i)} = 1\right\}}" />
          </DerivationContent>
        </Derivation>
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^n \left[{y^{(i)}} \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 1; \mu_1, \Sigma \right) + \, (1-y^{(i)}) \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 0; \mu_0, \Sigma \right) \right." />
              <BlockMath math="\left. + \, \log \, {y^{(i)}} \cdot p\left(y^{(i)} = 1; \phi\right) + \, \log \, (1 - y^{(i)}) \cdot p\left(y^{(i)} = 0; \phi\right) \right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Now taking the derivative with respect to <InlineMath math="\Sigma" />, we get:
            </div>
            <div>
              <BlockMath math="\nabla_{\Sigma} \, \sum_{i=1}^n \left[ {y^{(i)}} \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 1; \mu_1, \Sigma \right) +  \left(1-y^{(i)}\right) \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 0; \mu_0, \Sigma \right) \right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Finding the derivative of the first term:</div>
            <div className="flex flex-col">
              <BlockMath math="\nabla_{\Sigma} \, \sum_{i=1}^n \left({y^{(i)}} \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 1; \mu_1, \Sigma \right) \right)" />
              <BlockMath math="= \nabla_{\Sigma} \left(\sum_{i=1}^n y^{(i)} \left[\log \frac{1}{(2\pi)^{d/2} |\Sigma|^{1/2}} -\frac{1}{2} \left(x^{(i)} - \mu_1\right)^T \Sigma^{-1} \left(x^{(i)} - \mu_1\right) \right] \right)" />
              <BlockMath math="= \nabla_{\Sigma} \left(\sum_{i=1}^n  y^{(i)} \left[-\log \, (2\pi)^{d/2}  -\log \, |\Sigma|^{1/2}  -\frac{1}{2} \left(x^{(i)} - \mu_1\right)^T \Sigma^{-1} \left(x^{(i)} - \mu_1\right) \right] \right)" />
              <BlockMath math="= \sum_{i=1}^n y^{(i)} \left(\nabla_{\Sigma} \left[-\log \, |\Sigma|^{1/2} \right]  -\frac{1}{2} \nabla_{\Sigma} \left[ \left(x^{(i)} - \mu_1 \right)^T \Sigma^{-1} \left(x^{(i)} - \mu_1 \right) \right] \right)" />
            </div>
          </DerivationContent>
          <Lemma>
            <div className="flex flex-col place-items-start">
              <div className="pb-1">We won&apos;t prove this here, but there are two Lemmas we need here:</div>
              <BlockMath math="\text{1. } \nabla_A | A | = |A|(A^{-1})^T" />
              <BlockMath math="\text{2. } \nabla_A \left(x^T A^{-1} x \right) = -A^{-1} x x^T A^{-1}" />
            </div>
          </Lemma>
          <DerivationContent>
            <div>We are going to find the two derivates separately,</div>
            <div className="flex flex-col">
              <BlockMath math=" \nabla_{\Sigma} \left[\log |\Sigma|^{1/2} \right]" />
              <BlockMath math="= \left(\frac{1}{|\Sigma|^{1/2}} \right) \nabla_{\Sigma} \left[|\Sigma|^{1/2} \right]" />
              <BlockMath math="= \left(\frac{1}{|\Sigma|^{1/2}} \right) \left( \frac{1}{2} |\Sigma|^{-1/2} \right) \nabla_{\Sigma} |\Sigma| " />
              <Info
                info={
                  <div>
                    Using Lemma 1 and the fact that for symmetric matrices <InlineMath math="(A^{-1})^T = A^{-1}" />
                  </div>
                }
              >
                <BlockMath math="= \frac{1}{2} \left(\frac{1}{|\Sigma_l|} |\Sigma_l| \right) \Sigma_l^{-1} " />
              </Info>
              <BlockMath math="= \frac{1}{2} \Sigma_l^{-1} " />
            </div>
            <div className="flex flex-col">
              <BlockMath math="\nabla_{\Sigma_l} \left[ \left(x^{(i)} - \mu_l \right)^T \Sigma_j^{-1} \left(x^{(i)} - \mu_l \right) \right]" />
              <BlockMath math="= -\Sigma_l^{-1} \left(x^{(i)} - \mu_l \right) \left(x^{(i)} - \mu_l \right)^T \Sigma_l^{-1}" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Thus,</div>
            <div className="flex flex-col">
              <BlockMath math="\nabla_{\Sigma} \, \sum_{i=1}^n \left({y^{(i)}} \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 1; \mu_1, \Sigma \right) \right)" />
              <BlockMath math="= \sum_{i=1}^n y^{(i)} \left(- \frac{1}{2} \left[\Sigma^{-1} \right] -\frac{1}{2} \left[ -\Sigma^{-1} \left(x^{(i)} - \mu_1 \right) \left(x^{(i)} - \mu_1 \right)^T \Sigma^{-1} \right] \right)" />
              <BlockMath math="= \sum_{i=1}^n y^{(i)} \left[ \frac{1}{2} \left(- \Sigma^{-1} + \Sigma^{-1} \left(x^{(i)} - \mu_1 \right) \left(x^{(i)} - \mu_1 \right)^T \Sigma^{-1} \right) \right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Similarly, we can find the derivative of the second term:</div>
            <div className="flex flex-col">
              <BlockMath math="\nabla_{\Sigma} \, \sum_{i=1}^n \left(\left(1 - {y^{(i)}}\right) \cdot \log \, p \left(x^{(i)} \mid y^{(i)} = 0; \mu_0, \Sigma \right) \right)" />
              <BlockMath math="= \sum_{i=1}^n \left(1 - {y^{(i)}}\right) \left[ \frac{1}{2} \left(- \Sigma^{-1} + \Sigma^{-1} \left(x^{(i)} - \mu_0 \right) \left(x^{(i)} - \mu_0 \right)^T \Sigma^{-1} \right) \right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Putting them together, we get:</div>
            <div className="flex flex-col">
              <BlockMath math="= \frac{1}{2} \, \sum_{i=1}^n \left[ y^{(i)} \left(- \Sigma^{-1} + \Sigma^{-1} \left(x^{(i)} - \mu_1 \right) \left(x^{(i)} - \mu_1 \right)^T \Sigma^{-1} \right) \right." />
              <BlockMath math="\left. +  \left(1 - {y^{(i)}}\right) \left(- \Sigma^{-1} + \Sigma^{-1} \left(x^{(i)} - \mu_0 \right) \left(x^{(i)} - \mu_0 \right)^T \Sigma^{-1} \right) \right]" />
              <BlockMath math="= \frac{1}{2} \, \sum_{i=1}^n \left[ - y^{(i)} \Sigma^{-1} - \Sigma^{-1} + y^{(i)} \Sigma^{-1} + y^{(i)} \left(\Sigma^{-1} \left(x^{(i)} - \mu_1 \right) \left(x^{(i)} - \mu_1 \right)^T \Sigma^{-1} \right) \right." />
              <BlockMath math="\left. +  \left(1 - {y^{(i)}}\right) \left( \Sigma^{-1} \left(x^{(i)} - \mu_0 \right) \left(x^{(i)} - \mu_0 \right)^T \Sigma^{-1} \right) \right]" />
              <BlockMath math="= \frac{1}{2} \, \sum_{i=1}^n \left[- \Sigma^{-1} + \Sigma^{-1} \left(x^{(i)} - \mu_{y^{(i)}} \right) \left(x^{(i)} - \mu_{y^{(i)}} \right)^T \Sigma^{-1} \right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Setting this equal to 0 and simplifying, we get:</div>
            <div className="flex flex-col">
              <BlockMath math="\Sigma^{-1} = \frac{1}{n} \, \sum_{i=1}^n \left[\Sigma^{-1} \left(x^{(i)} - \mu_{y^{(i)}} \right) \left(x^{(i)} - \mu_{y^{(i)}} \right)^T \Sigma^{-1} \right]" />
              <BlockMath math="\Rightarrow \Sigma^{-1} = \Sigma^{-1} \left(\frac{1}{n} \, \sum_{i=1}^n \left(x^{(i)} - \mu_{y^{(i)}} \right) \left(x^{(i)} - \mu_{y^{(i)}} \right)^T \right) \Sigma^{-1}" />
              <BlockMath math="\Rightarrow \Sigma = \frac{1}{n} \, \sum_{i=1}^n \left(x^{(i)} - \mu_{y^{(i)}} \right) \left(x^{(i)} - \mu_{y^{(i)}} \right)^T" />
            </div>
          </DerivationContent>
        </Derivation>
      </div>
    </Section>
  );
}
