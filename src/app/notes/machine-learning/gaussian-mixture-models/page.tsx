import Main from "../../_components/main";
import { BlockMath, InlineMath } from "react-katex";
import Algorithm from "~/app/notes/_components/algorithm";

import Derivation from "~/app/notes/_components/derivation";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";
import MyLink from "~/app/notes/_components/myLink";
import Section from "~/app/notes/_components/section";

export default function Page() {
  return (
    <Main>
      <Section title="Gaussian Mixture Models">
        <div>
          Suppose that we are given a training set <InlineMath math="x^{(1)}, \ldots, x^{(n)}" /> and we wish to model the data by specifying a joint distribution{" "}
          <InlineMath math="p(x^{(i)}, z^{(i)})" /> where <InlineMath math="z^{(i)} \sim \text{Multinomial}(\phi)" /> is a latent variable where <InlineMath math="p(z^{(i)} = j) = \phi_j" /> and{" "}
          <InlineMath math="\sum_{j=1}^k \phi_j = 1" /> where <InlineMath math="k" /> is the number of values that <InlineMath math="z^{(i)}" /> can take.
        </div>
        <div>
          Moreover, we assume that <InlineMath math="x^{(i)} | z^{(i)} = j \sim \mathcal{N}(\mu_j, \Sigma_j)" />. Gaussian mixture models are similar to the{" "}
          <MyLink href="/notes/machine-learning/clustering">K-means Algorithm</MyLink> except that we allow for overlapping clusters and each each cluster follows a Gaussian distribution.
        </div>
        <div>To maximize the log likelihood, we need to maximize:</div>
        <div>
          <BlockMath math="\ell(\phi, \mu, \Sigma) = \sum_{i=1}^{n} \log p(x^{(i)}; \phi, \mu, \Sigma)" />
          <BlockMath math="= \sum_{i=1}^{n} \log \sum_{z^{(i)}=1}^{k} p(x^{(i)} | z^{(i)}; \mu, \Sigma) p(z^{(i)}; \phi)" />
        </div>
        <div>
          The random variables <InlineMath math="z^{(i)}" />
          &apos;s indicate which of the <InlineMath math="k" /> Gaussians each <InlineMath math="x^{(i)}" /> had come from. Note that if we knew what the <InlineMath math="z^{(i)}" />
          ’s were, the maximum likelihood problem would have been easy and almost similar to that of <MyLink href="generative-learning-algorithms">Gaussian Discriminant Analysis</MyLink>.
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

        <Derivation>
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

          <div>
            Let&apos;s define a new variable <InlineMath math="a_j(x^{(i)})" /> as:
            <BlockMath math="\alpha_j(x^{(i)}) = \log(\phi_j) - \frac{1}{2} \log |\Sigma_j| - \frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)" />
          </div>
          <div>
            Now we can rewrite the above equation as:
            <BlockMath math="p(z^{(i)} = j | x^{(i)}; \phi, \mu, \Sigma) = \frac{\exp(\alpha_j(x^{(i)}))}{\sum_{l=1}^k \exp(\alpha_l(x^{(i)}))}" />
          </div>

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
        </Derivation>

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

        <div className="flex flex-col">
          <Derivation>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^{n} \sum_{j=1}^{k} \left[w_j^{(i)} \log  \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{w_j^{(i)}}\right]" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \log \left(\frac{\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \exp \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j) \right) \phi_j}{w_j^{(i)}} \right)" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[\log \left(\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \right) + \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right) + \log(\phi_j) - \log(w_j^{(i)})\right]" />
            </div>

            <div>
              We take derivative with respect to <InlineMath math="\mu_l" />:
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
                <BlockMath math="= \sum_{i=1}^n w_l^{(i)} \left( \nabla_{\mu_l} \left[-\frac{1}{2} (x^{(i)} - \mu_l)^T \Sigma_l^{-1} (x^{(i)} - \mu_l) \right] \right)" />
              </Info>
              <BlockMath math="= \sum_{i=1}^n w_l^{(i)} \left( \nabla_{\mu_l} \left[-\frac{1}{2} \left( x^{(i) T}\Sigma_l^{-1} x^{(i)} - \mu_l^T \Sigma_l^{-1} x^{(i)} - x^{(i) T}\Sigma_l^{-1} \mu_l + \mu_l^T \Sigma_l^{-1} \mu_l \right) \right] \right)" />
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
          </Derivation>
          <Derivation>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^{n} \sum_{j=1}^{k} \left[w_j^{(i)} \log  \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{w_j^{(i)}}\right]" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[\log \left(\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \right) + \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right) + \log(\phi_j) - \log(w_j^{(i)})\right]" />
            </div>

            <div>
              We take derivative with respect to <InlineMath math="\phi_l" />:
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

            <div>
              For this we use the fact that <InlineMath math="\left(\sum_{j=1}^k \phi_j \right) = 1" /> to find the derivative by constructing a Lagrangian
            </div>
            <div className="flex flex-col">
              <BlockMath math="\mathcal{L}(\phi) = \sum_{i=1}^{n} \sum_{j=1}^{k} w_j^{(i)} \log \phi_j + \beta \left( \sum_{j=1}^{k} \phi_j - 1 \right)" />
              <BlockMath math="\frac{\partial}{\partial \phi_l} \mathcal{L}(\phi) = \sum_{i=1}^{n} \frac{w_l^{(i)}}{\phi_l} + \beta" />
            </div>

            <div>
              Setting this equal to <InlineMath math="0" /> and simplifying, we get:
            </div>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^{n} \frac{w_l^{(i)}}{\phi_l} + \beta = 0" />
              <BlockMath math="\Rightarrow \sum_{i=1}^{n} \frac{w_l^{(i)}}{\phi_l} = -\beta" />
              <BlockMath math="\Rightarrow \phi_l = \sum_{i=1}^{n} \frac{w_l^{(i)}}{-\beta}" />
            </div>

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

            <div>
              Putting it together, we get: <BlockMath math="\phi_l = \sum_{i=1}^{n} \frac{w_l^{(i)}}{n}" />
            </div>
          </Derivation>
          <Derivation>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^{n} \sum_{j=1}^{k} \left[w_j^{(i)} \log  \frac{p(x^{(i)} | z^{(i)} = j; \mu, \Sigma) p(z^{(i)} = j; \phi)}{w_j^{(i)}}\right]" />
              <BlockMath math="= \sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[\log \left(\frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} \right) + \left( -\frac{1}{2} (x^{(i)} - \mu_j)^T \Sigma_j^{-1} (x^{(i)} - \mu_j)\right) + \log(\phi_j) - \log(w_j^{(i)})\right]" />
            </div>

            <Lemma>
              <div className="flex flex-col place-items-start">
                <div className="pb-1">We won&apos;t prove this here, but there are two Lemmas we need here:</div>
                <BlockMath math="\text{1. } \nabla_A | A | = |A|(A^{-1})^T" />
                <BlockMath math="\text{2. } \nabla_A \left(x^T A^{-1} x \right) = -A^{-1} x x^T A^{-1}" />
              </div>
            </Lemma>

            <div>
              We take derivative with respect to <InlineMath math="\Sigma_l" />:
            </div>
            <div className="flex flex-col">
              <Info
                info={
                  <div>
                    Ignoring terms that do not depend on <InlineMath math="\Sigma" /> since their derivatives are <InlineMath math="0" />.
                  </div>
                }
              >
                <BlockMath math="\nabla_{\Sigma_l} \left(\sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[\log \frac{1}{(2\pi)^{d/2} |\Sigma_j|^{1/2}} -\frac{1}{2} \left(x^{(i)} - \mu_j\right)^T \Sigma_j^{-1} \left(x^{(i)} - \mu_j\right) \right] \right)" />
              </Info>
              <BlockMath math="= \nabla_{\Sigma_l} \left(\sum_{i=1}^n \sum_{j=1}^k w_j^{(i)} \left[-\log \, (2\pi)^{d/2}  -\log \, |\Sigma_j|^{1/2}  -\frac{1}{2} \left(x^{(i)} - \mu_j\right)^T \Sigma_j^{-1} \left(x^{(i)} - \mu_j\right) \right] \right)" />
              <Info
                info={
                  <div>
                    Ignoring terms that do not depend on <InlineMath math="\Sigma" /> since their derivatives are <InlineMath math="0" />.
                  </div>
                }
              >
                <BlockMath math="= \sum_{i=1}^n w_l^{(i)} \left(\nabla_{\Sigma_l} \left[-\log \, |\Sigma_l|^{1/2}   -\frac{1}{2} \left(x^{(i)} - \mu_l\right)^T \Sigma_l^{-1} \left(x^{(i)} - \mu_l\right) \right] \right)" />
              </Info>
              <BlockMath math="= \sum_{i=1}^n w_l^{(i)} \left(- \nabla_{\Sigma_l} \left[\log \, |\Sigma_l|^{1/2} \right] -\frac{1}{2} \nabla_{\Sigma_l} \left[ \left(x^{(i)} - \mu_l\right)^T \Sigma_l^{-1} \left(x^{(i)} - \mu_l\right) \right] \right)" />
            </div>

            <div>We are going to find the two derivates separately,</div>
            <div className="flex flex-col">
              <BlockMath math=" \nabla_{\Sigma_l} \left[\log |\Sigma_l|^{1/2} \right]" />
              <BlockMath math="= \left(\frac{1}{|\Sigma_l|^{1/2}} \right) \nabla_{\Sigma_l} \left[|\Sigma_l|^{1/2} \right]" />
              <BlockMath math="= \left(\frac{1}{|\Sigma_l|^{1/2}} \right) \left( \frac{1}{2} |\Sigma_l|^{-1/2} \right) \nabla_{\Sigma_l} \, |\Sigma_l| " />
              <Info
                info={
                  <div>
                    Using lemma 1 and the fact that for symmetric matrices <InlineMath math="(A^{-1})^T = A^{-1}" />
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

            <div>Putting them together, we get:</div>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^n w_l^{(i)} \left(- \frac{1}{2} \left[\Sigma_l^{-1} \right] -\frac{1}{2} \left[ -\Sigma_l^{-1} \left(x^{(i)} - \mu_l \right) \left(x^{(i)} - \mu_l \right)^T \Sigma_l^{-1} \right] \right)" />
              <BlockMath math="= \sum_{i=1}^n w_l^{(i)} \left[ \frac{1}{2} \left(- \Sigma_l^{-1} + \Sigma_l^{-1} \left(x^{(i)} - \mu_l \right) \left(x^{(i)} - \mu_l \right)^T \Sigma_l^{-1} \right) \right]" />
            </div>

            <div>
              Setting this equal to <InlineMath math="0" /> and simplifying, we get:
            </div>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^n w_l^{(i)} \left(\Sigma_l^{-1} \right) = \sum_{i=1}^n w_l^{(i)} \left(\Sigma_l^{-1} \left(x^{(i)} - \mu_l \right) \left(x^{(i)} - \mu_l \right)^T \Sigma_l^{-1} \right)" />
              <Info
                info={
                  <div>
                    <InlineMath math="\Sigma_l^{-1}" /> does not depend on <InlineMath math="i" /> and <InlineMath math="w_l^{(i)}" /> is a scalar.
                  </div>
                }
              >
                <BlockMath math="\Rightarrow \left(\sum_{i=1}^n w_l^{(i)} \right) \Sigma_l^{-1}   = \Sigma_l^{-1} \left( \sum_{i=1}^n w_l^{(i)} \left(x^{(i)} - \mu_l \right) \left(x^{(i)} - \mu_l \right)^T \right) \Sigma_l^{-1}" />
              </Info>
              <BlockMath math="\Rightarrow \Sigma_l \left(\sum_{i=1}^n w_l^{(i)} \right)   = \Sigma_l \, \Sigma_l^{-1} \left( \sum_{i=1}^n w_l^{(i)} \left(x^{(i)} - \mu_l \right) \left(x^{(i)} - \mu_l \right)^T \right)" />
              <BlockMath math="\Rightarrow \Sigma_l \left(\sum_{i=1}^n w_l^{(i)} \right)   = \sum_{i=1}^n w_l^{(i)} \left(x^{(i)} - \mu_l \right) \left(x^{(i)} - \mu_l \right)^T " />
              <Info
                info={
                  <div>
                    Since <InlineMath math="w_l^{(i)}" /> is a scalar.
                  </div>
                }
              >
                <BlockMath math="\Rightarrow \Sigma_l = \frac{\sum_{i=1}^n w_l^{(i)} \left(x^{(i)} - \mu_l \right) \left(x^{(i)} - \mu_l \right)^T}{\sum_{i=1}^n w_l^{(i)} }" />
              </Info>
            </div>
          </Derivation>
        </div>
        <Algorithm>
          <BlockMath math="\text{Repeat until convergence \{}" />
          <BlockMath math="\hspace{2em} \text{(E-step) For each } i \text{ and } j, \text{ set } \text{\{}" />
          <BlockMath math="\hspace{4em} w_j^{(i)} \leftarrow p(z^{(i)} = j \mid x^{(i)}; \phi, \mu, \Sigma)." />
          <BlockMath math="\hspace{2em} \text{\}}" />
          <BlockMath math="\hspace{2em} \text{(M-step) For each } j, \text{ set } \text{\{}" />
          <BlockMath math="\hspace{4em} \phi_j \leftarrow \frac{1}{n} \sum_{i=1}^n w_j^{(i)} " />
          <BlockMath math="\hspace{4em} \mu_j \leftarrow \frac{\sum_{i=1}^n w_j^{(i)} x^{(i)}}{\sum_{i=1}^n w_j^{(i)}} " />
          <BlockMath math="\hspace{4em} \Sigma_j \leftarrow \frac{\sum_{i=1}^n w_j^{(i)} (x^{(i)} - \mu_j)(x^{(i)} - \mu_j)^T}{\sum_{i=1}^n w_j^{(i)}} " />
          <BlockMath math="\hspace{2em} \text{\}}" />
          <BlockMath math="\text{\}}" />
        </Algorithm>

        <div>
          In the <InlineMath math="E" /> step, we estimate the probability of each <InlineMath math="z^{(i)}" /> given <InlineMath math="x^{(i)}" /> using the current parameters{" "}
          <InlineMath math="\phi, \mu, \Sigma" />.
        </div>
        <div>
          In the <InlineMath math="M" /> step, we update the value of our parameters to maximize the <InlineMath math="\text{ELBO}" /> for which it is equal to <InlineMath math="p(x; \mu, \Sigma)" />{" "}
          for our current values of <InlineMath math="\phi, \mu, \Sigma" />.
        </div>
      </Section>
    </Main>
  );
}
