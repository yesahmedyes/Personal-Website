import { BlockMath, InlineMath } from "react-katex";
import Derivation from "~/app/notes/_components/derivation";
import Info from "~/app/notes/_components/info";
import Section from "~/app/notes/_components/section";

export default function LogisticRegression() {
  return (
    <Section heading="Logistic Regression" title="Classification">
      <div>
        The classification problem is different from the regression problem in that <InlineMath math="y" /> takes a discrete value (a category label) rather than a continuous value.
      </div>
      <div>
        Therefore, for logistic regression, we will choose our <InlineMath math="h_{\theta}(x)" /> to be a sigmoid function that squishes any real number to a value between 0 and 1.
      </div>
      <div>
        <BlockMath math="h_{\theta}(x) = g(\theta^T x) = \frac{1}{1 + e^{-\theta^T x}}" />
      </div>
      <div>Let&apos;s us assume that:</div>
      <div className="flex flex-col">
        <BlockMath math="p(y=1 ; x, \theta) = h_{\theta}(x)" />
        <BlockMath math="p(y=0 ; x, \theta) = 1 - h_{\theta}(x)" />
      </div>
      <div>Now this can be rewritten as:</div>
      <div>
        <BlockMath math="p(y \mid x, \theta) = (h_{\theta}(x))^y (1 - h_{\theta}(x))^{1 - y}" />
      </div>
      <div>Now, the log-likelihood can be written as:</div>
      <div className="flex flex-col">
        <BlockMath math="\ell(\theta) = \log \, \prod_{i=1}^n \, p(y^{(i)} \mid x^{(i)}, \theta)" />
        <BlockMath math="= \sum_{i=1}^n \, \log \, p(y^{(i)} \mid x^{(i)}, \theta)" />
        <BlockMath math="= \sum_{i=1}^n \, \log \, \left[\left(h_{\theta}(x^{(i)})\right)^{y^{(i)}} \left(1 - h_{\theta}(x^{(i)})\right)^{1 - y^{(i)}} \right]" />
      </div>
      <div>
        Taking it&apos;s derivative with respect to <InlineMath math="\theta" />, we get:
      </div>
      <div>
        <BlockMath math="\frac{\partial}{\partial \theta_j} \, \ell(\theta) = \sum_{i=1}^n \left(y^{(i)} - h_{\theta}(x^{(i)}) \right) x_j^{(i)}" />
      </div>
      <div>And so our gradient descent update rule to maximize the log-likelihood becomes:</div>
      <div>
        <BlockMath math="\theta_j \leftarrow \theta_j + \alpha \left(y^{(i)} - h_{\theta}(x^{(i)}) \right) x_j^{(i)}" />
      </div>

      <div className="flex flex-col">
        <Derivation>
          <div>
            For a sigmoid function, <BlockMath math="g(z) = \frac{1}{1 + e^{-z}}" />
          </div>
          <div>It&apos;s derivative is given by:</div>
          <div className="flex flex-col">
            <BlockMath math="\frac{d}{dz} \, g(z) = \frac{d}{dz} \, \frac{1}{1 + e^{-z}}" />
            <BlockMath math="= \frac{d}{dz} \, \left(1 + e^{-z} \right)^{-1}" />
            <BlockMath math="= -1 \left(1 + e^{-z} \right)^{-2} \left(-e^{-z} \right)" />
            <BlockMath math="= \frac{1}{\left(1 + e^{-z} \right)} \frac{e^{-z}}{\left(1 + e^{-z} \right)}" />
            <BlockMath math="= \frac{1}{\left(1 + e^{-z} \right)} \left( 1 - \frac{1}{\left(1 + e^{-z} \right)} \right)" />
            <BlockMath math="= g(z) \left( 1 - g(z) \right)" />
          </div>
        </Derivation>
        <Derivation>
          <div className="flex flex-col">
            <BlockMath math="\frac{\partial}{\partial \theta_j} \, \ell(\theta) = \frac{\partial}{\partial \theta_j} \sum_{i=1}^n \, \log \, \left[\left(h_{\theta}(x^{(i)})\right)^{y^{(i)}} \left(1 - h_{\theta}(x^{(i)})\right)^{1 - y^{(i)}} \right]" />
            <BlockMath math="= \frac{\partial}{\partial \theta_j}\sum_{i=1}^n \left( y^{(i)} \cdot \log h_{\theta}(x^{(i)}) + (1 - y^{(i)}) \cdot \log(1 - h_{\theta}(x^{(i)}) \right)" />
            <BlockMath math="= \frac{\partial}{\partial \theta_j} \sum_{i=1}^n \left(y^{(i)} \cdot \log  g(\theta^T x^{(i)} ) + (1 - y^{(i)}) \cdot \log (1 - g(\theta^T x^{(i)}) ) \right)" />
            <BlockMath math="= \sum_{i=1}^n \left( \left[\frac{y^{(i)}}{g(\theta^T x^{(i)})}  - \frac{1 - y^{(i)}}{1 - g(\theta^T x^{(i)})} \right] \cdot \frac{\partial}{\partial \theta_j} \left[g(\theta^T x^{(i)}) \right] \right)" />
            <Info
              info={
                <div>
                  <BlockMath math="\frac{a}{b} - \frac{1-a}{1-b} = \frac{a-b}{b(1-b)}" />{" "}
                </div>
              }
            >
              <BlockMath math="= \sum_{i=1}^n \left( \left[\frac{y^{(i)} - g(\theta^T x^{(i)})}{g(\theta^T x^{(i)}) \cdot \left(1 - g(\theta^T x^{(i)}) \right)} \right] \cdot \frac{\partial}{\partial \theta_j} \left[g(\theta^T x^{(i)}) \right] \right)" />
            </Info>
            <Info
              info={
                <div>
                  <BlockMath math="g'(z) = g(z) \left( 1 - g(z) \right)" />
                </div>
              }
            >
              <BlockMath math="= \sum_{i=1}^n \left( \left[\frac{y^{(i)} - g(\theta^T x^{(i)})}{g(\theta^T x^{(i)}) \cdot \left(1 - g(\theta^T x^{(i)}) \right)} \right] \cdot g(\theta^T x^{(i)}) \cdot \left(1 - g(\theta^T x^{(i)}) \right) \cdot \frac{\partial}{\partial \theta_j} \left[\theta^T x^{(i)} \right] \right)" />
            </Info>
            <BlockMath math="= \sum_{i=1}^n \left(y^{(i)} - g(\theta^T x^{(i)}) \right) \cdot x_j^{(i)}" />
            <BlockMath math="= \sum_{i=1}^n \left(y^{(i)} - h_{\theta}(x^{(i)}) \right) \cdot x_j^{(i)}" />
          </div>
        </Derivation>
      </div>

      <div>
        Also, note that maximizing the log-likelihood is equivalent to minimizing the logistic loss where <InlineMath math="t = \theta^T x" />
      </div>
      <div>
        <BlockMath math="\arg \min_{\theta} \ell_{logistic}(t, y) = \arg \max_{\theta} \ell(\theta)" />
      </div>

      <Derivation>
        <div className="flex flex-col">
          <BlockMath math="\arg \min_{\theta} \ell_{logistic}(t, y)" />
          <BlockMath math="= \arg \min_{\theta} \left[ y \log \left(1 + e^{-t} \right) + (1 - y) \log \left(1 + e^{t} \right) \right]" />
          <Info
            info={
              <div>
                <BlockMath math="- \log a = \log \left(\frac{1}{a} \right)" />
              </div>
            }
          >
            <BlockMath math="= \arg \max_{\theta} \left[ y \log \left(\frac{1}{1 + e^{-t}} \right) + (1 - y) \log \left(\frac{1}{1 + e^{t}} \right) \right]" />
          </Info>
          <BlockMath math="= \arg \max_{\theta} \left[ y \log \left(\frac{1}{1 + e^{-\theta^T x}} \right) + (1 - y) \log \left(\frac{1}{1 + e^{\theta^T x}} \right) \right]" />
          <BlockMath math="= \arg \max_{\theta} \left[ y \log \left(\frac{1}{1 + e^{-\theta^T x}} \right) + (1 - y) \log \left(\frac{1}{1 + e^{\theta^T x}} \right) \right]" />
          <BlockMath math="= \arg \max_{\theta} \left[ y \log \left(\frac{1}{1 + e^{-\theta^T x}} \right) + (1 - y) \log \left(1 - \frac{1}{1 + e^{-\theta^T x}} \right) \right]" />
          <BlockMath math="= \arg \max_{\theta} \ell(\theta)" />
        </div>
      </Derivation>
    </Section>
  );
}
