import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";
import MyLink from "~/app/notes/_components/myLink";
import Section from "~/app/notes/_components/section";

export default function MixturesOfGaussians() {
  return (
    <Section heading="Mixtures of Gaussians">
      <Content>
        <div>
          Suppose that we are given a training set <InlineMath math="(x^{(1)}, x^{(2)}, \ldots, x^{(n)})" /> and we wish to model the data by specifying a joint distribution{" "}
          <InlineMath math="p(x^{(i)}, z)" /> where <InlineMath math="z(i) \sim \text{Multinomial}(\phi)" /> is a latent variable where <InlineMath math="p(z^{(i)} = j) = \phi_j" />. Moreover, we
          assume that <InlineMath math="\left(x^{(i)} | z^{(i)} = j\right) \sim \mathcal{N}(\mu_j, \Sigma_j)" />.
        </div>
        <div>To maximize the log likelihood, we need to maximize:</div>
        <div>
          <BlockMath math="\ell(\phi, \mu, \Sigma) = \sum_{i=1}^{n} \log p(x^{(i)}; \phi, \mu, \Sigma)" />
          <BlockMath math="= \sum_{i=1}^{n} \log \sum_{z^{(i)}=1}^{k} p(x^{(i)} | z^{(i)}; \mu, \Sigma) p(z^{(i)}; \phi)" />
        </div>
        <div>
          The random variables <InlineMath math="z^{(i)}" />
          &apos;s indicate which of the <InlineMath math="k" /> Gaussians each <InlineMath math="x^{(i)}" /> had come from. Note that if we knew what the <InlineMath math="z^{(i)}" />
          ’s were, the maximum likelihood problem would have been easy and almost similar to that of <MyLink href="gaussian-discriminant-analysis">Gaussian Discriminant Analysis</MyLink>.
        </div>
        <div>
          Since there is no way for us to take the derivative of the above equation and find a closed form solution, we need to use the{" "}
          <MyLink href="em-algorithm">Expectation Maximization Algorithm</MyLink> instead.
        </div>
        <div>
          In the <InlineMath math="E" /> step, for all values of <InlineMath math="i" /> and <InlineMath math="j" />, we find <InlineMath math="p(z^{(i)} = j | x^{(i)}; \phi, \mu, \Sigma)" /> using
          the current parameters and the bayes rule:
        </div>
        <div>
          <BlockMath math="p(z^{(i)} = j | x^{(i)}; \phi, \mu, \Sigma) = \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{\sum_{l=1}^k p(x^{(i)} | z^{(i)} = l; \mu, \Sigma) p(z^{(i)} = l; \phi)}" />
        </div>
        <div>
          When we plug in the equations for the gaussian distribution, this takes a form very similar to the softmax function. So in the <InlineMath math="E" /> step, we find our estimated probability
          distribution for what value <InlineMath math="z^{(i)}" /> should take for each <InlineMath math="x^{(i)}" />.
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="p(z^{(i)} = j | x^{(i)}; \phi, \mu, \Sigma) = \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{\sum_{l=1}^k p(x^{(i)} | z^{(i)} = l; \mu, \Sigma) p(z^{(i)} = l; \phi)}" />
            <BlockMath math="= \frac{\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \exp \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j) \right) \phi_j}{\sum_{l=1}^k \left[\frac{1}{(2\pi)^{d/2} |\Sigma_l|^{1/2}} \exp \left( -\frac{1}{2} (x^{(i)} - \mu_l)^T \Sigma_l^{-1} (x^{(i)} - \mu_l) \right) \phi_l\right]}" />
            <Info
              info={
                <div>
                  Since <InlineMath math="2\pi^{-d/2}" /> is a constant, it cancels out.
                </div>
              }
            >
              <BlockMath math="= \frac{\left(|\Sigma_j|^{-\frac{1}{2}}\right) \exp \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j) \right) \phi_j}{\sum_{l=1}^k \left[\left(|\Sigma_j|^{-\frac{1}{2}}\right) \exp \left( -\frac{1}{2} (x^{(i)} - \mu_l)^T \Sigma_l^{-1} (x^{(i)} - \mu_l) \right) \phi_l\right]}" />
            </Info>
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>
            Let&apos;s define a new variable <InlineMath math="a_j(x^{(i)})" /> as:
            <BlockMath math="\alpha_j(x^{(i)}) = \log(\phi_j) - \frac{1}{2} \log |\Sigma_j| - \frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)" />
          </div>
          <div>
            Now we can rewrite the above equation as:
            <BlockMath math="p(z^{(i)} = j | x^{(i)}; \phi, \mu, \Sigma) = \frac{\exp(\alpha_j(x^{(i)}))}{\sum_{l=1}^k \exp(\alpha_l(x^{(i)}))}" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>We can verify this:</div>
          <div className="flex flex-col">
            <BlockMath math="\frac{\exp(\alpha_j(x^{(i)}))}{\sum_{l=1}^k \exp(\alpha_l(x^{(i)}))}" />
            <BlockMath math="= \frac{\exp\left(\log(\phi_j) - \frac{1}{2} \log |\Sigma_j| - \frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right)}{\sum_{l=1}^k \exp\left(\log(\phi_l) - \frac{1}{2} \log |\Sigma_l| - \frac{1}{2} (x^{(i)} - \mu_l)^T \Sigma_l^{-1} (x^{(i)} - \mu_l)\right)}" />
            <BlockMath math="= \frac{\exp\left(- \frac{1}{2} \log |\Sigma_j| - \frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right)\phi_j}{\sum_{l=1}^k \left[\exp\left(- \frac{1}{2} \log |\Sigma_l| - \frac{1}{2} (x^{(i)} - \mu_l)^T \Sigma_l^{-1} (x^{(i)} - \mu_l)\right)\phi_l\right]}" />
            <Info
              info={
                <div>
                  Since <InlineMath math="\exp(b \log(a)) = a^b" />.
                </div>
              }
            >
              <BlockMath math="= \frac{\left(|\Sigma_j|^{-\frac{1}{2}}\right) \exp \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j) \right) \phi_j}{\sum_{l=1}^k \left[\left(|\Sigma_j|^{-\frac{1}{2}}\right) \exp \left( -\frac{1}{2} (x^{(i)} - \mu_l)^T \Sigma_l^{-1} (x^{(i)} - \mu_l) \right) \phi_l\right]}" />
            </Info>
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>
          Now for the <InlineMath math="M" /> step, for each <InlineMath math="j" />, we find the values of our parameters that maximize our new <InlineMath math="\text{ELBO}" /> with:
        </div>
        <div>
          <BlockMath math="w_j^{(i)} = Q_i(z^{(i)} = j) = p(z^{(i)} = j \mid x^{(i)}; \phi, \mu, \Sigma)" />
        </div>
        <div>Therefore we need to maximize the following:</div>
        <div className="flex flex-col">
          <BlockMath math="\sum_{i=1}^{n} \sum_{j=1}^{k} \left[Q_i(z^{(i)} = j) \log  \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{Q_i(z^{(i)} = j)}\right]" />
          <BlockMath math="= \sum_{i=1}^{n} \sum_{j=1}^{k} \left[w_j^{(i)} \log  \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{w_j^{(i)}}\right]" />
        </div>
        <div>
          When we take the derivative of the above equation with respect to each of our parameters <InlineMath math="\phi, \mu, \Sigma" />, and set it equal to <InlineMath math="0" />, we get our
          update equations for each of the parameters:
        </div>
        <div className="flex flex-col">
          <BlockMath math="\phi_l = \frac{1}{n} \sum_{i=1}^n w_l^{(i)}" />

          <BlockMath math="\mu_l = \frac{\sum_{i=1}^n w_l^{(i)} x^{(i)}}{\sum_{i=1}^n w_l^{(i)}}" />

          <BlockMath math="\Sigma_l = \frac{\sum_{i=1}^n w_l^{(i)} (x^{(i)} - \mu_l)(x^{(i)} - \mu_l)^T}{\sum_{i=1}^n w_l^{(i)}}" />
        </div>
      </Content>
      <div className="flex flex-col">
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^{n} \sum_{j=1}^{k} \left[w_j^{(i)} \log  \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{w_j^{(i)}}\right]" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \log \left(\frac{\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \exp \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j) \right) \phi_j}{w_j^{(i)}} \right)" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[\log \left(\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \right) + \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right) + \log(\phi_j) - \log(w_j^{(i)})\right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              We take derivative with respect to <InlineMath math="\mu_j" />:
            </div>
            <div className="flex flex-col">
              <Info
                info={
                  <div>
                    Ignoring terms that do not depend on <InlineMath math="\mu_l" /> since their derivatives are <InlineMath math="0" />.
                  </div>
                }
              >
                <BlockMath math="\nabla_{\mu_l} \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[-\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j) \right]" />
              </Info>
              <BlockMath math="= \sum_{i=1}^n \left(\nabla_{\mu_l} \sum_{j=1}^k w_j^{(i)} \left[-\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j) \right] \right)" />
              <Info
                info={
                  <div>
                    Ignoring terms that do not depend on <InlineMath math="\mu_l" /> since their derivatives are <InlineMath math="0" />.
                  </div>
                }
              >
                <BlockMath math="= \sum_{i=1}^n \nabla_{\mu_l} \left[w_l^{(i)} \left(-\frac{1}{2} (x^{(i)} - \mu_l)^T \Sigma_l^{-1} (x^{(i)} - \mu_l) \right) \right]" />
              </Info>
              <BlockMath math="= \sum_{i=1}^n w_l^{(i)} \left( \nabla_{\mu_l} \left[-\frac{1}{2} (x^{(i)} - \mu_l)^T \Sigma_l^{-1} (x^{(i)} - \mu_l) \right] \right)" />
              <BlockMath math="= \sum_{i=1}^n w_l^{(i)} \left( \nabla_{\mu_l} \left[-\frac{1}{2} \left( x^{(i)T}\Sigma_l^{-1} x^{(i)} - \mu_l^T \Sigma_l^{-1} x^{(i)} - x^{(i)T}\Sigma_l^{-1} \mu_l + \mu_l^T \Sigma_l^{-1} \mu_l \right) \right] \right)" />
              <Info
                info={
                  <div className="flex flex-col">
                    <div>
                      <InlineMath math="\Sigma_l^{-1}" /> is a symmetric matrix.
                    </div>
                    <div>
                      For any symmetric matrix <InlineMath math="A" />, <InlineMath math="\nabla_{x} \left(x^T A x \right) = 2Ax" />
                    </div>
                  </div>
                }
              >
                <BlockMath math="= \sum_{i=1}^n w_l^{(i)} \left[-\frac{1}{2} \left( - \Sigma_l^{-1} x^{(i)} - \Sigma_l^{-T} x^{(i)} + 2 \left(\Sigma_l^{-1} \mu_l \right) \right) \right]" />
              </Info>
              <Info
                info={
                  <div>
                    For symmetric matrices <InlineMath math="(A^{-1})^T = A^{-1}" />
                  </div>
                }
              >
                <BlockMath math="= \sum_{i=1}^n w_l^{(i)} \left[-\frac{1}{2} \left( - \Sigma_l^{-1} x^{(i)} - \Sigma_l^{-1} x^{(i)} + 2 \left(\Sigma_l^{-1} \mu_l \right) \right) \right]" />
              </Info>
              <BlockMath math="= \sum_{i=1}^{n} w_l^{(i)} \left( \Sigma_l^{-1} x^{(i)} - \Sigma_l^{-1} \mu_l \right)" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Setting this equal to <InlineMath math="0" /> and simplifying, we get:
            </div>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^n \left[ w_l^{(i)} \Sigma_l^{-1} x^{(i)} \right] = \sum_{i=1}^n \left[ w_l^{(i)} \Sigma_l^{-1} \mu_l \right]" />
              <Info
                info={
                  <div>
                    Since <InlineMath math="w_l^{(i)}" /> is just a scalar
                  </div>
                }
              >
                <BlockMath math="\Rightarrow \sum_{i=1}^n \left[ \Sigma_l^{-1} w_l^{(i)} x^{(i)} \right] = \sum_{i=1}^n \left[\Sigma_l^{-1} w_l^{(i)} \mu_l \right]" />
              </Info>
              <Info
                info={
                  <div>
                    Since <InlineMath math="\Sigma_l^{-1}" /> and <InlineMath math="\mu_l^{-1}" /> do not depend on <InlineMath math="i" />
                  </div>
                }
              >
                <BlockMath math="\Rightarrow \Sigma_l^{-1} \left[\sum_{i=1}^n w_l^{(i)} x^{(i)} \right] = \Sigma_l^{-1} \left[ \sum_{i=1}^n w_l^{(i)}\right] \mu_l" />
              </Info>
              <BlockMath math="\Rightarrow \left[\sum_{i=1}^n w_l^{(i)} x^{(i)} \right] = \left[ \sum_{i=1}^n w_l^{(i)}\right] \mu_l" />
              <BlockMath math="\Rightarrow \mu_l = \frac{\sum_{i=1}^n w_l^{(i)} x^{(i)}}{\sum_{i=1}^n w_l^{(i)}}" />
            </div>
          </DerivationContent>
        </Derivation>
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^{n} \sum_{j=1}^{k} \left[w_j^{(i)} \log  \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{w_j^{(i)}}\right]" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[\log \left(\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \right) + \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right) + \log(\phi_j) - \log(w_j^{(i)})\right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              We take derivative with respect to <InlineMath math="\phi_j" />:
            </div>
            <div className="flex flex-col">
              <Info
                info={
                  <div>
                    Ignoring terms that do not depend on <InlineMath math="\phi" /> since their derivatives are <InlineMath math="0" />.
                  </div>
                }
              >
                <BlockMath math="\nabla_{\phi_l} \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \log(\phi_j)" />
              </Info>
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              For this we use the fact that <InlineMath math="\left(\sum_{j=1}^k \phi_j \right) = 1" /> to find the derivative by constructing a Lagrangian
            </div>
            <div className="flex flex-col">
              <BlockMath math="\mathcal{L}(\phi) = \sum_{i=1}^{n} \sum_{j=1}^{k} w_j^{(i)} \log \phi_j + \beta \left( \sum_{j=1}^{k} \phi_j - 1 \right)" />
              <BlockMath math="\frac{\partial}{\partial \phi_l} \mathcal{L}(\phi) = \sum_{i=1}^{n} \frac{w_l^{(i)}}{\phi_l} + \beta" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Setting this equal to <InlineMath math="0" /> and simplifying, we get:
            </div>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^{n} \frac{w_l^{(i)}}{\phi_l} + \beta = 0" />
              <BlockMath math="\Rightarrow \sum_{i=1}^{n} \frac{w_l^{(i)}}{\phi_l} = -\beta" />
              <BlockMath math="\Rightarrow \phi_l = \sum_{i=1}^{n} \frac{w_l^{(i)}}{-\beta}" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Using the constraint, we find the value of <InlineMath math="\beta" />
            </div>
            <div className="flex flex-col">
              <BlockMath math="\left(\sum_{j=1}^k \phi_j \right) = 1" />
              <BlockMath math="\Rightarrow \sum_{j=1}^k \left(\sum_{i=1}^{n} \frac{w_j^{(i)}}{-\beta}\right) = 1" />
              <BlockMath math="\Rightarrow \sum_{j=1}^k \left(\sum_{i=1}^{n} w_j^{(i)}\right) = -\beta" />
              <BlockMath math="\Rightarrow \sum_{i=1}^n \left(\sum_{j=1}^{k} w_j^{(i)}\right) = -\beta" />
              <Info
                info={
                  <div className="flex flex-col">
                    <div>
                      Since <InlineMath math="\sum_{j=1}^k w_j^{(i)}" />
                    </div>
                    <div>
                      <InlineMath math="= \sum_{j=1}^k p(z^{(i)} = j | x) = 1" />.
                    </div>
                  </div>
                }
              >
                <BlockMath math="\Rightarrow \sum_{i=1}^n 1 = -\beta" />
              </Info>
              <BlockMath math="\Rightarrow -\beta = n" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Putting it together, we get: <BlockMath math="\phi_l = \sum_{i=1}^{n} \frac{w_l^{(i)}}{n}" />
            </div>
          </DerivationContent>
        </Derivation>
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^{n} \sum_{j=1}^{k} \left[w_j^{(i)} \log  \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{w_j^{(i)}}\right]" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[\log \left(\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \right) + \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right) + \log(\phi_j) - \log(w_j^{(i)})\right]" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              We take derivative with respect to <InlineMath math="\Sigma_j" />:
            </div>
            <div className="flex flex-col">
              <Info
                info={
                  <div>
                    Ignoring terms that do not depend on <InlineMath math="\Sigma" /> since their derivatives are <InlineMath math="0" />.
                  </div>
                }
              >
                <BlockMath math="\nabla_{\Sigma_l} \left(\sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[\log \left(\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \right) + \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right) \right] \right)" />
              </Info>
              <BlockMath math="= \nabla_{\Sigma_l} \left(\sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[-\log \left((2\pi)^{d/2} \right) -\log \left(|\Sigma_j|^{1/2}\right)  + \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right) \right] \right)" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left(\nabla_{\Sigma_l} \left[-\log \left(|\Sigma_j|^{1/2}\right)  -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j) \right] \right)" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left(- \nabla_{\Sigma_l} \left[\log |\Sigma_j|^{1/2} \right] -\frac{1}{2} \nabla_{\Sigma_l} \left[ (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j) \right] \right)" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>We are going to find the two derivates separately,</div>
            <div className="flex flex-col">
              <BlockMath math=" \nabla_{\Sigma_l} \left[\log |\Sigma_l|^{1/2} \right]" />
              <BlockMath math="= \left(\frac{1}{|\Sigma_l|^{1/2}} \right) \nabla_{\Sigma_l} \left[|\Sigma_l|^{1/2} \right]" />
              <BlockMath math="= \left(\frac{1}{|\Sigma_l|^{1/2}} \right) \left( |\Sigma_l|^{-1/2} \right) \nabla_{\Sigma_l} |\Sigma_l| " />
              <BlockMath math="= \left(\frac{1}{|\Sigma_l|} \right) \nabla_{\Sigma_l} |\Sigma_l| " />
              <Info
                info={
                  <div>
                    Derivative of determinant of <InlineMath math="A" /> is equal to <InlineMath math="|A| (A^{-1})^T" />
                  </div>
                }
              >
                <BlockMath math="= \left(\frac{1}{|\Sigma_l|} |\Sigma_l| \right) \Sigma_l^{-T} " />
              </Info>
              <Info
                info={
                  <div>
                    For symmetric matrices <InlineMath math="(A^{-1})^T = A^{-1}" />
                  </div>
                }
              >
                <BlockMath math="= \left(\frac{1}{|\Sigma_l|} |\Sigma_l| \right) \Sigma_l^{-1} " />
              </Info>
            </div>
          </DerivationContent>
          <Lemma>
            <div></div>
          </Lemma>
        </Derivation>
      </div>
    </Section>
  );
}
