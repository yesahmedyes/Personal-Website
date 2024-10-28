import MainWithSidebar from "../../_components/mainWithSidebar";
import Section from "~/app/notes/_components/section";
import Content from "~/app/notes/_components/content";
import { BlockMath, InlineMath } from "react-katex";
import MyLink from "~/app/notes/_components/myLink";
import Detour from "~/app/notes/_components/detour";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";

export default function Page() {
  return (
    <MainWithSidebar>
      <Section title="Factor Analysis">
        <Content>
          <div>
            If we have a dataset with <InlineMath math="n" /> data points and <InlineMath math="d" /> features and we want to model the data using a{" "}
            <MyLink href="/notes/machine-learning/clustering">mixture of gaussians</MyLink>, it would be very hard to do so if <InlineMath math="d \gg n" />.
          </div>
          <div>
            One way around this is to put restrictions on the covariance matrix of the data and force it to be diagonal where each entry is just an empirical estimate of the variance in the{" "}
            <InlineMath math="j" />
            -th coordinate.
          </div>
          <div>
            <BlockMath math="\Sigma_{jj} = \frac{1}{n} \sum_{i=1}^n \left(x_j^{(i)} - \mu_j\right)^2" />
          </div>
          <div>
            However, this fails to capture any correlations between the different features of our data. Therefore, a better solution is to learn a lower dimensional representation of our data.
          </div>
        </Content>
        <Content>
          <div>
            In the factor analysis model, we assume that each feature <InlineMath math="x_j" /> is generated by a linear combination of the entries of a lower-dimensional latent variable{" "}
            <InlineMath math="z" />. We also assume that <InlineMath math="z" /> is normally distributed.
          </div>
          <div className="flex flex-col">
            <BlockMath math="z \sim \mathcal{N}(0, I)" />
            <BlockMath math="x | z \sim \mathcal{N}(\mu + Wz, \Psi)" />
          </div>
          <div>We can rewrite this as:</div>
          <div className="flex flex-col">
            <BlockMath math="z \sim \mathcal{N}(0, I)" />
            <BlockMath math="\epsilon \sim \mathcal{N}(0, \Psi)" />
            <BlockMath math="x = \mu + Wz + \epsilon" />
          </div>
        </Content>
        <Detour>
          <Content>
            <div>
              For any random variable that follows a normal distribution <InlineMath math="x \sim \mathcal{N}(\mu, \sigma^2)" />, it can be written in terms of <InlineMath math="\epsilon" /> where{" "}
              <InlineMath math="\epsilon \sim \mathcal{N}(0, 1)" />.
              <BlockMath math="x = \mu + \sigma \cdot \epsilon" />
            </div>
          </Content>
        </Detour>
        <Content>
          <div>
            We can derive the mean and covariance of <InlineMath math="x" /> and see that <InlineMath math="x" /> follows the following distribution:
          </div>
          <div>
            <BlockMath math="x \sim \mathcal{N}(\mu, WW^T + \Psi)" />
          </div>
        </Content>
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\mathbb{E}[x] = \mathbb{E}[\mu + Wz + \epsilon]" />
              <BlockMath math="= \mathbb{E}[\mu + Wz + \epsilon]" />
              <BlockMath math="= \mathbb{E}[\mu] + \mathbb{E}[Wz] + \mathbb{E}[\epsilon]" />
              <Info info={<div>Expectation of a constant is the constant itself.</div>}>
                <BlockMath math="= \mu + W \cdot \mathbb{E}[z] + \mathbb{E}[\epsilon]" />
              </Info>
              <Info
                info={
                  <div>
                    Expectations of <InlineMath math="z" /> and <InlineMath math="\epsilon" /> are zero.
                  </div>
                }
              >
                <BlockMath math="= \mu" />
              </Info>
            </div>
          </DerivationContent>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\text{Var}(x) = \mathbb{E} \left[(x - \mathbb{E}[x])(x - \mathbb{E}[x])^T \right]" />
              <BlockMath math="= \mathbb{E}\left[(\mu + Wz + \epsilon - \mu)(\mu + Wz + \epsilon - \mu)^T\right]" />
              <BlockMath math="= \mathbb{E}\left[(Wz + \epsilon)(Wz + \epsilon)^T\right]" />
              <BlockMath math="= \mathbb{E}\left[Wz z^T W^T + Wz \epsilon^T + \epsilon z^T W^T + \epsilon \epsilon^T \right]" />
              <BlockMath math="= W\cdot\mathbb{E}\left[z z^T \right]\cdot W^T + W \cdot \mathbb{E}\left[z \epsilon^T \right] + \mathbb{E}\left[\epsilon z^T \right]\cdot W^T + \mathbb{E}\left[\epsilon \epsilon^T \right]" />
              <Info
                info={
                  <div className="flex flex-col">
                    <div>
                      Since <InlineMath math="\epsilon" /> and <InlineMath math="z" /> are independent.
                    </div>
                    <div>
                      Also, <InlineMath math="\mathbb{E}[z] = 0" /> and <InlineMath math="\mathbb{E}[\epsilon] = 0" />
                    </div>
                    <div>
                      Thus, <InlineMath math="\mathbb{E}[z \epsilon] = \mathbb{E}[z] \cdot \mathbb{E}[\epsilon] = 0" />
                    </div>
                  </div>
                }
              >
                <BlockMath math="= W\cdot\mathbb{E}\left[z z^T \right]\cdot W^T + \mathbb{E}\left[\epsilon \epsilon^T \right]" />
              </Info>
              <Info
                info={
                  <div className="flex flex-col">
                    <BlockMath math="\mathbb{E}[z z^T] = \text{Var}(z) = I" />
                    <BlockMath math="\mathbb{E}[\epsilon \epsilon^T] = \text{Var}(\epsilon) = \Psi" />
                  </div>
                }
              >
                <BlockMath math="= WW^T + \Psi" />
              </Info>
            </div>
          </DerivationContent>
        </Derivation>
        <Content>
          <div>Thus, we can write the log likelihood of our data under this model as:</div>
          <div>
            <BlockMath math="\ell(\mu, W, \Psi) = \log \prod_{i=1}^{n} \frac{1}{(2\pi)^{d/2} |W W^T + \Psi|^{1/2}} \exp \left( -\frac{1}{2} (x^{(i)} - \mu)^T (W W^T + \Psi)^{-1} (x^{(i)} - \mu) \right)" />
          </div>
          <div>
            However, there does not exist any closed form solution for the maximum likelihood estimate of <InlineMath math="\mu, W, \Psi" />. This is because the matrices <InlineMath math="W" /> and{" "}
            <InlineMath math="\Psi" /> are coupled in the likelihood function and therefore, we cannot optimize them separately.
          </div>
          <div>
            Therefore, we need to use the <MyLink href="/notes/machine-learning/em-algorithm">Expectation Maximization</MyLink> algorithm instead.
          </div>
          <div>
            For the <InlineMath math="E" />
            -step, we need to find the estimate for our posterior distribution of <InlineMath math="z" /> given <InlineMath math="x" />. This distribution can be written as:
          </div>
          <div className="flex flex-col">
            <BlockMath math="z|x \sim \mathcal{N}\left(\mu_{z|x}, \, \Sigma_{z|x}\right)" />
            <BlockMath math="\mu_{z|x} = W^T \left( WW^T + \Psi \right)^{-1} \left( x - \mu \right)" />
            <BlockMath math="\Sigma_{z|x} = I - W^T \left( WW^T + \Psi \right)^{-1} W" />
          </div>
        </Content>
        <Derivation>
          <Lemma>
            <div>
              For any two gaussian distributions <InlineMath math="z" /> and <InlineMath math="x" />, the conditional distribution <InlineMath math="z|x" /> is also a gaussian distribution and is
              given by:
            </div>
            <div className="flex flex-col">
              <BlockMath math="z | x \sim \mathcal{N}\left(\mu_{z|x}, \Sigma_{z|x}\right)" />
              <BlockMath math="\mu_{z|x} = \mu_z + \Sigma_{zx} \Sigma_{xx}^{-1} (x - \mu_x)" />
              <BlockMath math="\Sigma_{z|x} = \Sigma_{zz} - \Sigma_{zx} \Sigma_{xx}^{-1} \Sigma_{xz}" />
            </div>
          </Lemma>
          <DerivationContent>
            <div>From our original equations, we can see that:</div>
            <div className="flex flex-col">
              <BlockMath math="\mu_z = 0" />
              <BlockMath math="\Sigma_{zz} = \text{Var}(z) = I" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Later to find the distribution of <InlineMath math="x" />, we saw that:
            </div>
            <div className="flex flex-col">
              <BlockMath math="\mu_x = \mu" />
              <BlockMath math="\Sigma_{xx} = WW^T + \Psi" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Now,</div>
            <div className="flex flex-col">
              <BlockMath math="\Sigma_{zx} = \text{Cov}(z, x) = \mathbb{E} \left[(z - \mathbb{E}[z])(x - \mathbb{E}[x])^T \right]" />
              <Info
                info={
                  <div>
                    <InlineMath math="\mathbb{E}[z] = 0" /> and <InlineMath math="\mathbb{E}[x] = \mu" />
                  </div>
                }
              >
                <BlockMath math="= \mathbb{E} \left[(z - 0)(x - \mu)^T \right]" />
              </Info>
              <Info
                info={
                  <div>
                    <InlineMath math="x = \mu + Wz + \epsilon" />
                  </div>
                }
              >
                <BlockMath math="= \mathbb{E} \left[z(\mu + Wz + \epsilon - \mu)^T \right]" />
              </Info>
              <BlockMath math="= \mathbb{E} \left[z z^T W^T \right] + \mathbb{E} \left[z \epsilon^T \right]" />
              <Info
                info={
                  <div className="flex flex-col">
                    <div>
                      Since <InlineMath math="z" /> and <InlineMath math="\epsilon" /> are independent.
                    </div>
                    <div>
                      Thus, <InlineMath math="\mathbb{E}\left[z \epsilon^T \right] = \mathbb{E}[z] \cdot \mathbb{E}[\epsilon^T] = 0" />.
                    </div>
                  </div>
                }
              >
                <BlockMath math="= \mathbb{E} \left[z z^T \right] \cdot W^T + 0" />
              </Info>
              <Info
                info={
                  <div>
                    <BlockMath math="\mathbb{E}\left[z z^T \right] = \text{Var}(z) = I" />
                  </div>
                }
              >
                <BlockMath math="= W^T" />
              </Info>
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Similarly,</div>
            <div className="flex flex-col">
              <BlockMath math="\Sigma_{xz} = \text{Cov}(x, z) = W" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Putting this all together, we get:</div>
            <div className="flex flex-col">
              <BlockMath math="z|x \sim \mathcal{N}\left(\mu_{z|x}, \, \Sigma_{z|x}\right)" />
              <BlockMath math="\mu_{z|x} = W^T \left( WW^T + \Psi \right)^{-1} \left( x - \mu \right)" />
              <BlockMath math="\Sigma_{z|x} = I - W^T \left( WW^T + \Psi \right)^{-1} W" />
            </div>
          </DerivationContent>
        </Derivation>
        <Content>
          <div>
            Now, the <InlineMath math="E" />
            -step for our EM algorithm is given by:
          </div>
          <div className="flex flex-col">
            <BlockMath math="Q_i(z^{(i)}) = p\left(z^{(i)} | x^{(i)}; \mu, W, \Psi\right)" />
            <BlockMath math="= \frac{1}{(2\pi)^{k/2} |\Sigma_{z^{(i)}|x^{(i)}}|^{1/2}} \exp\left( -\frac{1}{2} \left( z^{(i)} - \mu_{z^{(i)}|x^{(i)}} \right)^T \Sigma_{z^{(i)}|x^{(i)}}^{-1} \left( z^{(i)} - \mu_{z^{(i)}|x^{(i)}} \right) \right)" />
          </div>
        </Content>
        <Content>
          <div>
            In the <InlineMath math="M" />
            -step, we need to maximize our evidence lower bound:
          </div>
          <div>
            <BlockMath math="\text{ELBO}\left(x; Q, \mu, W, \Psi \right) = \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log \frac{p\left(x^{(i)}, z^{(i)}; \mu, W, \Psi\right)}{Q_i(z^{(i)})} \right]" />
          </div>
        </Content>
        <Content>
          <div>
            Maximizing the <InlineMath math="\text{ELBO}" /> with respect to each of the parameters <InlineMath math="\mu, W, \Psi" />, we get the following update equations:
          </div>
          <div className="flex flex-col">
            <BlockMath math="\mu = \frac{1}{n} \sum_{i=1}^n x^{(i)}" />
            <BlockMath math="W = \left( \sum_{i=1}^{n} (x^{(i)} - \mu) \mu_{z^{(i)}|x^{(i)}}^T \right) \left( \sum_{i=1}^{n} \mu_{z^{(i)}|x^{(i)}} \mu_{z^{(i)}|x^{(i)}}^T + \Sigma_{z^{(i)}|x^{(i)}} \right)^{-1}" />
            <BlockMath math="\Psi = \frac{1}{n} \, \sum_{i=1}^{n} \left(\left(x^{(i)} - \mu\right) \left(x^{(i)} - \mu\right)^T - W \mu_{z^{(i)} \mid x^{(i)}} \left(x^{(i)} - \mu\right)^T - \left(x^{(i)} - \mu\right) \mu_{z^{(i)} \mid x^{(i)}}^T W^T \right." />
            <BlockMath math="\left. + \, W \left( \mu_{z^{(i)}|x^{(i)}} \, \mu_{z^{(i)}|x^{(i)}}^T + \Sigma_{z^{(i)}|x^{(i)}} \right) W^T \right)" />
          </div>
        </Content>
        <div className="flex flex-col">
          <Derivation>
            <DerivationContent>
              <div className="flex flex-col">
                <BlockMath math="\text{ELBO}\left(x; Q, \mu, W, \Psi \right) = \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log \frac{p\left(x^{(i)}, z^{(i)}; \mu, W, \Psi\right)}{Q_i(z^{(i)})} \right]" />
                <BlockMath math="= \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log p\left(x^{(i)} \mid z^{(i)}; \mu, W, \Psi\right) + \log p\left(z^{(i)}\right) - \log Q_i\left(z^{(i)}\right) \right] " />
                <Info
                  info={
                    <div className="flex flex-col">
                      <div>Dropping terms that do not depend on our parameters.</div>
                      <div>
                        Note that in the <InlineMath math="M" />
                        -step, <InlineMath math="Q_i(z^{(i)})" /> is just a constant.
                      </div>
                    </div>
                  }
                >
                  <BlockMath math="\approx \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log p\left(x^{(i)} \mid z^{(i)}; \mu, W, \Psi\right) \right] " />
                </Info>
                <BlockMath math="= \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log \left( \frac{1}{(2\pi)^{d/2} |\Psi|^{1/2}} \exp \left( -\frac{1}{2} (x^{(i)} - \mu - W z^{(i)})^T \Psi^{-1} (x^{(i)} - \mu - W z^{(i)}) \right) \right) \right]" />
                <BlockMath math="= \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[ -\frac{1}{2} \log |\Psi| - \frac{n}{2} \log(2\pi) - \frac{1}{2} (x^{(i)} - \mu - W z^{(i)})^T \Psi^{-1} (x^{(i)} - \mu - W z^{(i)}) \right]" />
              </div>
            </DerivationContent>
            <DerivationContent>
              <div>
                Taking the derivative with respect to <InlineMath math="\mu" />, we get:
              </div>
              <div className="flex flex-col">
                <BlockMath math="-\frac{1}{2} \, \nabla_{\mu} \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \left(x^{(i)} - \mu - W z^{(i)}\right)^T \Psi^{-1} \left(x^{(i)} - \mu - W z^{(i)}\right) \right]" />
                <Info
                  info={
                    <div>
                      Ignoring terms that do not depend on <InlineMath math="\mu" />.
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-\nabla_{\mu} \left(\mu^T \Psi^{-1} \left(x^{(i)} - W z^{(i)}\right) \right) + \nabla_{\mu} \left(\mu^T \Psi^{-1} \mu\right) - \nabla_{\mu} \left(\left(x^{(i)} - Wz^{(i)}\right)^T \Psi^{-1} \mu \right) \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <div>
                        All the three terms simplify to a scalar. And for a scalar <InlineMath math="s" />:
                      </div>
                      <BlockMath math="\text{tr}(s) = s" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-\nabla_{\mu} \text{ tr} \left(\mu^T \Psi^{-1} \left(x^{(i)} - W z^{(i)}\right) \right) + \nabla_{\mu} \text{ tr} \left(\mu^T \Psi^{-1} \mu\right) - \nabla_{\mu} \text{ tr} \left(\left(x^{(i)} - Wz^{(i)}\right)^T \Psi^{-1} \mu \right) \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <BlockMath math="\text{tr}(AB) = \text{tr}(BA)" />
                      <BlockMath math="\text{tr}(A^T) = \text{tr}(A)" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-\nabla_{\mu} \text{ tr} \left(\mu^T \Psi^{-1} \left(x^{(i)} - W z^{(i)}\right) \right) + \nabla_{\mu} \text{ tr} \left(\mu^T \Psi^{-1} \mu\right) - \nabla_{\mu} \text{ tr} \left(\mu^{T} \Psi^{-T} \left(x^{(i)} - Wz^{(i)}\right) \right) \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <div>
                        <InlineMath math="\Psi" /> is a symmetric matrix, therefore
                      </div>
                      <BlockMath math="\Psi^{-T} = \Psi^{-1}" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-2\, \nabla_{\mu} \text{ tr} \left(\mu^T \Psi^{-1} \left(x^{(i)} - W z^{(i)}\right) \right) + \nabla_{\mu} \text{ tr} \left(\mu^T \Psi^{-1} \mu\right) \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <div>
                        For a symmetric matrix <InlineMath math="A" />
                      </div>
                      <BlockMath math="\nabla_x \, x^T A x = 2Ax" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-2 \cdot \Psi^{-1} \left(x^{(i)} - W z^{(i)}\right) + 2 \cdot \Psi^{-1} \mu \right]" />
                </Info>
                <BlockMath math="= \frac{1}{2} \, \Psi^{-1} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[\left(x^{(i)} - W z^{(i)}\right) - \mu \right]" />
              </div>
            </DerivationContent>
            <DerivationContent>
              <div>Setting the derivative to zero and simplifying, we get:</div>
              <div className="flex flex-col">
                <BlockMath math="\sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[x^{(i)} - W z^{(i)}\right] = \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i}  \left[\mu\right]" />
                <BlockMath math="\Rightarrow \sum_{i=1}^{n} \left(\mathbb{E}_{z^{(i)} \sim Q_i} \left[x^{(i)} \right] - W \cdot \mathbb{E}_{z^{(i)} \sim Q_i} \left[ z^{(i)}\right]\right) = n \cdot \mu" />
              </div>
            </DerivationContent>
            <DerivationContent>
              <div>
                Note that <InlineMath math="\mu" /> does not affect how each <InlineMath math="z^{(i)}" /> changes for each <InlineMath math="x^{(i)}" />. It simply shifts the mean of the
                distribution. Therefore, we can assume that for a large enough value of <InlineMath math="n" />,{" "}
                <InlineMath math="\mathbb{E}_{z^{(i)} \sim Q_i} \left[z^{(i)}\right] = \mu_{z^{(i)}|x^{(i)}}" /> is equal to the mean of the prior distribution which is <InlineMath math="0" />.
                Therefore, we get:
              </div>
              <div className="flex flex-col">
                <BlockMath math="\Rightarrow \sum_{i=1}^{n} \left(\mathbb{E}_{z^{(i)} \sim Q_i} \left[x^{(i)} \right] - W \cdot 0\right) = n \cdot \mu" />
                <BlockMath math="\Rightarrow \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[x^{(i)} \right] = n \cdot \mu" />
                <Info
                  info={
                    <div className="flex flex-col">
                      <div>
                        Expectation is over <InlineMath math="z^{(i)}" />, therefore:
                      </div>
                      <div>
                        <BlockMath math="\mathbb{E} \left[ x^{(i)} \right] = x^{(i)}" />
                      </div>
                    </div>
                  }
                >
                  <BlockMath math="\Rightarrow \mu = \frac{1}{n} \sum_{i=1}^{n} x^{(i)}" />
                </Info>
              </div>
            </DerivationContent>
          </Derivation>
          <Derivation>
            <DerivationContent>
              <div className="flex flex-col">
                <BlockMath math="\text{ELBO}\left(x; Q, \mu, W, \Psi \right) = \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log \frac{p\left(x^{(i)}, z^{(i)}; \mu, W, \Psi\right)}{Q_i(z^{(i)})} \right]" />
                <Info info={<div>Dropping terms that do not depend on our parameters.</div>}>
                  <BlockMath math="\approx \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[ -\frac{1}{2} \log |\Psi| - \frac{n}{2} \log(2\pi) - \frac{1}{2} (x^{(i)} - \mu - W z^{(i)})^T \Psi^{-1} (x^{(i)} - \mu - W z^{(i)}) \right]" />
                </Info>
              </div>
            </DerivationContent>
            <Lemma>
              <div>We won&apos;t prove this here but for any three matrices, the following lemma holds:</div>
              <div>
                <BlockMath math="\nabla_A \text{ tr}\left(ABA^TC\right) = CAB + C^TAB" />
              </div>
            </Lemma>
            <DerivationContent>
              <div>
                Taking the derivative with respect to <InlineMath math="W" />, we get:
              </div>
              <div className="flex flex-col">
                <BlockMath math="-\frac{1}{2} \, \nabla_{W} \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \left(x^{(i)} - \mu - W z^{(i)}\right)^T \Psi^{-1} \left(x^{(i)} - \mu - W z^{(i)}\right) \right]" />
                <Info
                  info={
                    <div>
                      Ignoring terms that do not depend on <InlineMath math="W" />.
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-\nabla_{\mu} \left(z^{(i)T} W^T \Psi^{-1} \left(x^{(i)} - \mu \right)  \right) + \nabla_{\mu} \left(z^{(i)T} W^T \Psi^{-1} W z^{(i)} \right) - \nabla_{\mu} \left(\left(x^{(i)} - \mu\right)^T \Psi^{-1} W z^{(i)} \right) \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <div>
                        All the three terms simplify to a scalar. And for a scalar <InlineMath math="s" />:
                      </div>
                      <BlockMath math="\text{tr}(s) = s" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-\nabla_{\mu} \text{ tr} \left(z^{(i)T} W^T \Psi^{-1} \left(x^{(i)} - \mu \right)  \right) + \nabla_{\mu} \text{ tr} \left(z^{(i)T} W^T \Psi^{-1} W z^{(i)} \right) - \nabla_{\mu} \text{ tr} \left(\left(x^{(i)} - \mu\right)^T \Psi^{-1} W z^{(i)} \right) \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <BlockMath math="\text{tr}(AB) = \text{tr}(BA)" />
                      <BlockMath math="\text{tr}(A^T) = \text{tr}(A)" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-\nabla_{\mu} \text{ tr} \left(z^{(i)T} W^T \Psi^{-1} \left(x^{(i)} - \mu \right)  \right) + \nabla_{\mu} \text{ tr} \left(z^{(i)T} W^T \Psi^{-1} W z^{(i)} \right) - \nabla_{\mu} \text{ tr} \left(z^{(i)T} W^T \Psi^{-T} \left(x^{(i)} - \mu\right) \right) \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <div>
                        <InlineMath math="\Psi" /> is a symmetric matrix, therefore
                      </div>
                      <BlockMath math="\Psi^{-T} = \Psi^{-1}" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-2 \, \nabla_{\mu} \text{ tr} \left(z^{(i)T} W^T \Psi^{-1} \left(x^{(i)} - \mu \right)  \right) + \nabla_{\mu} \text{ tr} \left(z^{(i)T} W^T \Psi^{-1} W z^{(i)} \right) \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <div>Traces are cyclicly permutable.</div>
                      <BlockMath math="\text{tr}(ABC) = \text{tr}(BCA) = \text{tr}(CAB)" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-2 \, \nabla_{\mu} \text{ tr} \left(W^T \Psi^{-1} \left(x^{(i)} - \mu \right) z^{(i)T} \right) + \nabla_{\mu} \text{ tr} \left(W z^{(i)} z^{(i)T} W^T \Psi^{-1} \right) \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <BlockMath math="\nabla_A \text{ tr}\left(ABA^TC\right) = CAB + C^TAB" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[-2 \, \Psi^{-1} \left(x^{(i)} - \mu \right) z^{(i)T} + \Psi^{-1} W z^{(i)} z^{(i)T} + \Psi^{-T} W z^{(i)} z^{(i)T} \right]" />
                </Info>
                <Info
                  info={
                    <div className="flex flex-col">
                      <div>
                        <InlineMath math="\Psi" /> is a symmetric matrix, therefore
                      </div>
                      <BlockMath math="\Psi^{-T} = \Psi^{-1}" />
                    </div>
                  }
                >
                  <BlockMath math="= \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[\, \Psi^{-1} \left(x^{(i)} - \mu \right) z^{(i)T} - \Psi^{-1} W z^{(i)} z^{(i)T} \right]" />
                </Info>
              </div>
            </DerivationContent>
            <DerivationContent>
              <div>Setting the derivative equal to zero and simplifying, we get:</div>
              <div className="flex flex-col">
                <BlockMath math="\Psi^{-1} \left(\sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[\left(x^{(i)} - \mu \right) z^{(i)T} \right] \right) = \Psi^{-1} W \left(\sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[z^{(i)} z^{(i)T} \right] \right)" />
                <BlockMath math="\Rightarrow W = \left(\sum_{i=1}^{n} \left(x^{(i)} - \mu \right) \mathbb{E}_{z^{(i)} \sim Q_i} \left[z^{(i)T} \right] \right) \left(\sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[z^{(i)} z^{(i)T} \right] \right)^{-1}" />
                <Info
                  info={
                    <div>
                      <BlockMath math="\mathbb{E}(AB) = \mathbb{E}(A) \cdot \mathbb{E}(B) + \text{Cov}(A, B)" />
                    </div>
                  }
                >
                  <BlockMath math="\Rightarrow W = \left(\sum_{i=1}^{n} \left(x^{(i)} - \mu \right) \mathbb{E}_{z^{(i)} \sim Q_i} \left[z^{(i)} \right]^T \right) \left(\sum_{i=1}^{n} \left(\mathbb{E}_{z^{(i)} \sim Q_i}\left[z^{(i)}\right] \cdot \mathbb{E}_{z^{(i)} \sim Q_i}\left[z^{(i)}\right]^T + \text{Cov}_{z^{(i)} \sim Q_i}\left(z^{(i)}, z^{(i)T}\right) \right) \right)^{-1}" />
                </Info>
                <BlockMath math="W = \left( \sum_{i=1}^{n} (x^{(i)} - \mu) \mu_{z^{(i)}|x^{(i)}}^T \right) \left( \sum_{i=1}^{n} \mu_{z^{(i)}|x^{(i)}} \mu_{z^{(i)}|x^{(i)}}^T + \Sigma_{z^{(i)}|x^{(i)}} \right)^{-1}" />
              </div>
            </DerivationContent>
          </Derivation>
          <Derivation>
            <DerivationContent>
              <div className="flex flex-col">
                <BlockMath math="\text{ELBO}\left(x; Q, \mu, W, \Psi \right) = \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log \frac{p\left(x^{(i)}, z^{(i)}; \mu, W, \Psi\right)}{Q_i(z^{(i)})} \right]" />
                <Info info={<div>Dropping terms that do not depend on our parameters.</div>}>
                  <BlockMath math="\approx \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[ -\frac{1}{2} \log |\Psi| - \frac{n}{2} \log(2\pi) - \frac{1}{2} (x^{(i)} - \mu - W z^{(i)})^T \Psi^{-1} (x^{(i)} - \mu - W z^{(i)}) \right]" />
                </Info>
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
              <div>
                Taking the derivative with respect to <InlineMath math="\Psi" />, we get:
              </div>
              <div className="flex flex-col">
                <Info
                  info={
                    <div>
                      Ignoring terms that do not depend on <InlineMath math="W" />.
                    </div>
                  }
                >
                  <BlockMath math="-\frac{1}{2} \, \nabla_{\Psi} \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i} \left[\log |\Psi| + \left(x^{(i)} - \mu - W z^{(i)}\right)^T \Psi^{-1} \left(x^{(i)} - \mu - W z^{(i)}\right) \right]" />
                </Info>
                <Info info={<div>Using Lemma 2</div>}>
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \left(\mathbb{E}_{z^{(i)} \sim Q_i} \left[\frac{1}{|\Psi|} \cdot \nabla_{\Psi} |\Psi| \right] + \mathbb{E}_{z^{(i)} \sim Q_i}\left[-\Psi^{-1} \left(x^{(i)} - \mu - W z^{(i)}\right) \left(x^{(i)} - \mu - W z^{(i)}\right)^T \Psi^{-1} \right] \right)" />
                </Info>
                <Info info={<div>Using Lemma 1</div>}>
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \left(\mathbb{E}_{z^{(i)} \sim Q_i} \left[\frac{1}{|\Psi|} \cdot |\Psi| \cdot \Psi^{-T} \right] + \mathbb{E}_{z^{(i)} \sim Q_i}\left[-\Psi^{-1} \left(x^{(i)} - \mu - W z^{(i)}\right) \left(x^{(i)} - \mu - W z^{(i)}\right)^T \Psi^{-1} \right] \right)" />
                </Info>
                <Info
                  info={
                    <div>
                      <InlineMath math="\Psi^{-1}" /> is a symmetric matrix and therefore <InlineMath math="\Psi^{-T} = \Psi^{-1}" />
                    </div>
                  }
                >
                  <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \left(\mathbb{E}_{z^{(i)} \sim Q_i} \left[\Psi^{-1} \right] + \mathbb{E}_{z^{(i)} \sim Q_i}\left[-\Psi^{-1} \left(x^{(i)} - \mu - W z^{(i)}\right) \left(x^{(i)} - \mu - W z^{(i)}\right)^T \Psi^{-1} \right] \right)" />
                </Info>
                <BlockMath math="= -\frac{1}{2} \, \sum_{i=1}^{n} \left(\Psi^{-1} - \Psi^{-1} \cdot \mathbb{E}_{z^{(i)} \sim Q_i}\left[ \left(x^{(i)} - \mu - W z^{(i)}\right) \left(x^{(i)} - \mu - W z^{(i)}\right)^T \right] \cdot \Psi^{-1} \right)" />
              </div>
            </DerivationContent>
            <DerivationContent>
              <div>Setting the derivative to zero and simplifying, we get:</div>
              <div className="flex flex-col">
                <BlockMath math="\sum_{i=1}^{n} \Psi^{-1} = \Psi^{-1} \cdot \left(\sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i}\left[ \left(x^{(i)} - \mu - W z^{(i)}\right) \left(x^{(i)} - \mu - W z^{(i)}\right)^T \right] \right) \cdot \Psi^{-1}" />
                <BlockMath math="\Rightarrow n\cdot\Psi = \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i}\left[ \left(x^{(i)} - \mu - W z^{(i)}\right) \left(x^{(i)} - \mu - W z^{(i)}\right)^T \right]" />
                <BlockMath math="\Rightarrow \Psi = \frac{1}{n} \, \sum_{i=1}^{n} \mathbb{E}_{z^{(i)} \sim Q_i}\left[ \left(x^{(i)} - \mu\right) \left(x^{(i)} - \mu\right)^T - W z^{(i)} \left(x^{(i)} - \mu\right)^T - \left(x^{(i)} - \mu\right) z^{(i)T} W^T + W z^{(i)} z^{(i)T} W^T \right]" />
                <BlockMath math="\Rightarrow \Psi = \frac{1}{n} \, \sum_{i=1}^{n} \left(\left(x^{(i)} - \mu\right) \left(x^{(i)} - \mu\right)^T - W \mu_{z^{(i)} \mid x^{(i)}} \left(x^{(i)} - \mu\right)^T - \left(x^{(i)} - \mu\right) \mu_{z^{(i)} \mid x^{(i)}}^T W^T \right." />
                <Info
                  info={
                    <div>
                      <BlockMath math="\mathbb{E}(AB) = \mathbb{E}(A) \mathbb{E}(B) + \text{Cov}(A, B)" />
                    </div>
                  }
                >
                  <BlockMath math="\left. + \, W \left(\mathbb{E}_{z^{(i)} \sim Q_i}\left[z^{(i)}\right] \mathbb{E}_{z^{(i)} \sim Q_i}\left[z^{(i)}\right]^T + \text{Cov}_{z^{(i)} \sim Q_i}\left(z^{(i)}, z^{(i)T}\right)\right) W^T \right)" />
                </Info>
                <BlockMath math="\Rightarrow \Psi = \frac{1}{n} \, \sum_{i=1}^{n} \left(\left(x^{(i)} - \mu\right) \left(x^{(i)} - \mu\right)^T - W \mu_{z^{(i)} \mid x^{(i)}} \left(x^{(i)} - \mu\right)^T - \left(x^{(i)} - \mu\right) \mu_{z^{(i)} \mid x^{(i)}}^T W^T \right." />
                <BlockMath math="\left. + \, W \left( \mu_{z^{(i)}|x^{(i)}} \, \mu_{z^{(i)}|x^{(i)}}^T + \Sigma_{z^{(i)}|x^{(i)}} \right) W^T \right)" />
              </div>
            </DerivationContent>
          </Derivation>
        </div>
      </Section>
    </MainWithSidebar>
  );
}