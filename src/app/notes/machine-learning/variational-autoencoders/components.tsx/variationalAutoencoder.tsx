import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";
import MyLink from "~/app/notes/_components/myLink";
import Section from "~/app/notes/_components/section";

export default function VariationalAutoencoder() {
  return (
    <Section title="Variational Autoencoders">
      <Content>
        <div>
          Let <InlineMath math="z" /> be a latent variable such that, <InlineMath math="z \sim \mathcal{N}(0, I)" />, and let <InlineMath math="\theta" /> be the collections of weights of a neural
          network <InlineMath math="g(z ; \theta)" /> that maps <InlineMath math="z \in R^k" /> to <InlineMath math="R^d" />.
        </div>
        <div>
          Also, let <InlineMath math="x" /> given <InlineMath math="z" /> follow a normal distribution <InlineMath math="x | z \sim \mathcal{N}\left(g(z ; \theta), \sigma^2 I \right)" />. We can find
          this distribution using an <MyLink href="em-algorithms">Expectation Maximization Algorithm</MyLink>.
        </div>
        <div>
          Note that for <MyLink href="gaussian-mixture-models">Gaussian Mixture Models</MyLink>, the optimal choice of <InlineMath math="Q(z) = p(z | x; \theta)" /> and we found it using Bayes&apos;
          rule. We were able to do so because <InlineMath math="z" /> was discrete and could take only <InlineMath math="k" /> values.
        </div>
        <div>
          However, for more complex models like the Variational Autoencoder, <InlineMath math="z" /> is continous. Therefore, it is intractable to compute <InlineMath math="p(z | x; \theta)" />{" "}
          explicitly. Instead, we will try to find an approximation of <InlineMath math="p(z | x; \theta)" />.
        </div>
        <div>
          Also note that we wanted to find <InlineMath math="Q(z) = p(z | x; \theta)" /> so that our <InlineMath math="\text{ELBO}" /> would be tight with <InlineMath math="\log p(x; \theta)" />.
        </div>
        <div>
          Since,
          <BlockMath math="\text{ELBO}(x; Q, \theta) = \log p(x ; \theta) - D_{KL}(Q \parallel p_{z | x})" />
        </div>
        <div>
          Therefore,
          <BlockMath math="\log p(x ; \theta) = \text{ELBO}(x; Q, \theta) + D_{KL}(Q \parallel p_{z | x})" />
        </div>
        <div>
          From this we can see that if we choose a <InlineMath math="Q(z)" /> such that it maximizes our <InlineMath math="\text{ELBO}" /> for a given value of <InlineMath math="\theta" />, then our
          KL-divergence is minimized.
        </div>
        <div>
          From this, we can find an approximate value for <InlineMath math="p(z | x; \theta)" /> by choosing a <InlineMath math="Q" /> from our family of distributions{" "}
          <InlineMath math="\mathcal{Q}" />:
        </div>
        <div>
          <BlockMath math="p(z | x; \theta) \approx \argmax_{Q \in \mathcal{Q}} \left( \max_{\theta} \text{ELBO}(x; Q, \theta) \right)" />
        </div>
        <div>
          We make a mean field assumption that assumes that <InlineMath math="Q(z)" /> gives a distribution with independent coordinates which means that we can decompose <InlineMath math="Q(z)" />{" "}
          into <InlineMath math="Q^1(z_1) \ldots Q^k(z_k)" />.
        </div>
        <div>
          Finally, we assume that <InlineMath math="Q" /> is a normal distribution where the mean and variance come from the neural networks <InlineMath math="q(x; \phi)" /> and{" "}
          <InlineMath math="v(x; \psi)" /> respectively. We set the covariance matrix to be a diagonal to enforce our mean field assumption. We can write this as:
        </div>
        <div>
          <BlockMath math="Q_i(z^{(i)}) = \mathcal{N}\left(q(x^{(i)}; \phi), \, \text{diag}(v(x^{(i)}; \psi))^2 \right)" />
        </div>
        <div>
          We use this <InlineMath math="Q_i(z^{(i)})" /> to find our <InlineMath math="\text{ELBO}" /> for the <InlineMath math="M" /> step.
        </div>
        <div>
          <BlockMath math="\text{ELBO}(x; \phi, \psi, \theta) = \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log \frac{p(x^{(i)} z^{(i)}; \theta)}{Q_i(z^{(i)})} \right]" />
        </div>
        <div>
          Note that we no longer need the <InlineMath math="E" /> step because we are directly using our <InlineMath math="Q_i(z^{(i)})" />. Therefore, instead of alternating maximization, we can use
          gradient ascent.
        </div>
        <div className="flex flex-col">
          <BlockMath math="\theta := \theta + \eta \, \nabla_{\theta} \, \text{ELBO}\left(x^{(i)}; \, \phi, \psi, \theta \right)" />
          <BlockMath math="\phi := \phi + \eta \, \nabla_{\phi} \, \text{ELBO}\left(x^{(i)}; \,\phi, \psi, \theta \right)" />
          <BlockMath math="\psi := \psi + \eta \, \nabla_{\psi} \, \text{ELBO}\left(x^{(i)}; \,\phi, \psi, \theta \right)" />
        </div>
        <div>
          Taking the derivative of our <InlineMath math="\text{ELBO}" /> with respect to <InlineMath math="\theta" />, we get:
        </div>
        <div>
          <BlockMath math="\nabla_{\theta} \, \text{ELBO}\left(x^{(i)}; \, \phi, \psi, \theta \right) = \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \nabla_{\theta} \, \log p(x^{(i)} \mid z^{(i)}; \theta) \right]" />
        </div>
        <div>
          Similarly, taking the derivative of our <InlineMath math="\text{ELBO}" /> with respect to <InlineMath math="\phi" /> and <InlineMath math="\psi" />, we get:
        </div>
        <div className="flex flex-col">
          <BlockMath math="\nabla_{\phi} \, \text{ELBO}\left(x^{(i)}; \, \phi, \psi, \theta \right) = \sum_{i=1}^n \mathbb{E}_{\xi^{(i)} \sim \mathcal{N}(0, 1)} \left[\nabla_{\phi} \log p \left(x^{(i)} \mid \hat{z}^{(i)}; \theta \right) + \nabla_{\phi} \log p \left(\hat{z}^{(i)}; \theta \right) - \nabla_{\phi} \log Q_i \left(\hat{z}^{(i)} \right) \right]" />
          <BlockMath math="\nabla_{\psi} \, \text{ELBO}\left(x^{(i)}; \, \phi, \psi, \theta \right) = \sum_{i=1}^n \mathbb{E}_{\xi^{(i)} \sim \mathcal{N}(0, 1)} \left[\nabla_{\psi} \log p \left(x^{(i)} \mid \hat{z}^{(i)}; \theta \right) + \nabla_{\psi} \log p \left(\hat{z}^{(i)}; \theta \right) - \nabla_{\psi} \log Q_i \left(\hat{z}^{(i)} \right) \right]" />
        </div>
        <div>
          where <InlineMath math="\hat{z}^{(i)}" /> is just the reparameterized version of <InlineMath math="z^{(i)}" /> and{" "}
          <InlineMath math="\hat{z}^{(i)} = q(x^{(i)}; \, \phi) + v(x^{(i)}; \, \psi) \odot \xi^{(i)}" />
        </div>
        <div>
          We can find all three derivatives by backpropagating through their respective neural networks. <InlineMath math="p(x^{(i)} \mid z^{(i)}; \theta)" /> depends on the decoder neural network{" "}
          <InlineMath math="g(z^{(i)} ; \theta)" />. And <InlineMath math="Q_i(z^{(i)})" /> depends on the encoder neural networks <InlineMath math="q(x^{(i)}; \phi)" /> and{" "}
          <InlineMath math="v(x^{(i)}; \psi)" />.
        </div>
        <div>
          Ofcourse, since we still have an expectancy, we will have to take multiple samples of <InlineMath math="z^{(i)}" /> in case of <InlineMath math="\theta" />, and{" "}
          <InlineMath math="\xi^{(i)}" /> in case of <InlineMath math="\psi" /> and <InlineMath math="\phi" /> and then take an average over the derivatives.
        </div>
      </Content>

      <div className="flex flex-col">
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\nabla_{\theta} \, \text{ELBO}\left(x^{(i)}; \, \phi, \psi, \theta \right) = \nabla_{\theta} \, \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log \frac{p(x^{(i)}, z^{(i)}; \theta)}{Q_i(z^{(i)})} \right]" />
              <BlockMath math="= \nabla_{\theta} \, \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log p(x^{(i)} | z^{(i)}; \theta) + \log p(z^{(i)}; \theta) - \log Q_i(z^{(i)}) \right]" />
              <BlockMath math="= \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \nabla_{\theta} \, \log p(x^{(i)} | z^{(i)}; \theta) + \nabla_{\theta} \, \log p(z^{(i)}; \theta) - \nabla_{\theta} \, \log Q_i(z^{(i)}) \right]" />
              <Info
                info={
                  <div>
                    The other terms are not dependent on <InlineMath math="\theta" />
                  </div>
                }
              >
                <BlockMath math="= \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \nabla_{\theta} \, \log p(x^{(i)} | z^{(i)}; \theta) \right]" />
              </Info>
            </div>
          </DerivationContent>
        </Derivation>

        <Derivation>
          <Lemma>
            <div>
              For any random variable that follows a normal distribution <InlineMath math="x \sim \mathcal{N}(\mu, \sigma^2)" />, it can be written in terms of <InlineMath math="\xi" /> where{" "}
              <InlineMath math="\xi \sim \mathcal{N}(0, 1)" />.
              <BlockMath math="x = \mu + \sigma \cdot \xi" />
            </div>
          </Lemma>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\nabla_{\phi} \, \text{ELBO}\left(x^{(i)}; \, \phi, \psi, \theta \right) = \nabla_{\phi} \, \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log \frac{p(x^{(i)}, z^{(i)}; \theta)}{Q_i(z^{(i)})} \right]" />
              <BlockMath math="= \nabla_{\phi} \, \sum_{i=1}^n \mathbb{E}_{z^{(i)} \sim Q_i} \left[ \log p(x^{(i)} \mid z^{(i)}; \theta) + \log p(z^{(i)}; \theta) - \log Q_i(z^{(i)}) \right]" />
            </div>
            <div>
              However, since <InlineMath math="Q_i" /> depends on <InlineMath math="\phi" />, therefore{" "}
              <InlineMath math="\nabla_{\phi} \, \mathbb{E}_{z^{(i)} \sim Q_i} [f(\phi)] \neq \mathbb{E}_{z^{(i)} \sim Q_i} [\nabla_{\phi} \, f(\phi)]" />. Therefore, since{" "}
              <InlineMath math="z^{(i)} \sim Q_i" /> and <InlineMath math="Q_i(z^{(i)}) = \mathcal{N}\left(q(x^{(i)}; \, \phi), \text{ diag}(v(x^{(i)}; \, \psi))^2 \right)" />, we can write{" "}
              <InlineMath math="z^{(i)}" /> as:
            </div>
            <div>
              <BlockMath math="z^{(i)} = q(x^{(i)}; \, \phi) + v(x^{(i)}; \, \psi) \odot \xi^{(i)}" />
            </div>
            <div>
              For convenience, i will use <InlineMath math="\hat{z}^{(i)}" /> as the reparameterized <InlineMath math="z^{(i)}" />. But ofcourse, <InlineMath math="\hat{z}^{(i)} = z^{(i)}" />. Now
              plugging <InlineMath math="\hat{z}^{(i)}" /> into the equation, we get:
            </div>
            <div className="flex flex-col">
              <BlockMath math="\nabla_{\phi} \text{ELBO}\left(x^{(i)}; \, \phi, \psi, \theta \right) = \nabla_{\phi} \, \sum_{i=1}^n \mathbb{E}_{\xi^{(i)} \sim \mathcal{N}(0, 1)} \, \left[\log p \left(x^{(i)} \mid \hat{z}^{(i)}; \theta \right) + \log p \left(\hat{z}^{(i)}; \theta \right) - \log Q_i \left(\hat{z}^{(i)} \right) \right]" />
              <BlockMath math="= \sum_{i=1}^n \mathbb{E}_{\xi^{(i)} \sim \mathcal{N}(0, 1)} \left[\nabla_{\phi} \log p \left(x^{(i)} \mid \hat{z}^{(i)}; \theta \right) + \nabla_{\phi} \log p \left(\hat{z}^{(i)}; \theta \right) - \nabla_{\phi} \log Q_i \left(\hat{z}^{(i)} \right) \right]" />
            </div>
            <div>
              The solution for the derivate of <InlineMath math="\text{ELBO}\left(x^{(i)}; \, \phi, \psi, \theta \right)" /> with respect to <InlineMath math="\psi" /> is similar.
            </div>
          </DerivationContent>
        </Derivation>
      </div>
    </Section>
  );
}
