import { BlockMath, InlineMath } from "react-katex";
import Algorithm from "~/app/notes/_components/algorithm";
import Derivation from "~/app/notes/_components/derivation";
import Info from "~/app/notes/_components/info";
import Section from "~/app/notes/_components/section";

export default function AdaBoost() {
  return (
    <Section heading="AdaBoost">
      <div>AdaBoost is a boosting algorithm that is used for classification tasks.</div>
      <div>
        We assume that <InlineMath math="y^{(i)} \in \{-1, 1\}" /> and <InlineMath math="h(x) \in \{-1, 1\}" />.
      </div>
      <div>We also use an exponential loss function:</div>
      <div>
        <BlockMath math="\ell(H) = e^{-y^{(i)} \cdot H(x^{(i)})}" />
      </div>
      <div>The gradient of this loss function is given by:</div>
      <div>
        <BlockMath math="\frac{\partial \ell}{\partial H(x^{(i)})} = -y^{(i)} \cdot e^{-y^{(i)} \cdot H(x^{(i)})}" />
      </div>
      <div>
        Using this gradient, we can see that the best classifier <InlineMath math="h_t" /> is the one that minimizes the loss function can be written as a weighted misclassification error:
      </div>
      <div className="flex flex-col">
        <BlockMath math="h_{t+1} = \arg \min_{h \in \mathcal{H}} \left( \sum_{i=1}^{n} \mathbb{1}\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} \right)" />
        <BlockMath math="w^{(i)} = \frac{\exp\left(-y^{(i)} \cdot H_t(x^{(i)})\right)}{\sum_{j=1}^{n} \exp\left(-y^{(j)} \cdot H_t(x^{(j)})\right)}" />
      </div>
      <div>
        We can further divide our weights <InlineMath math="w^{(i)}" /> in terms of unnormalized weights <InlineMath math="\hat{w}^{(i)}" /> and a normalization constant <InlineMath math="z" />.
      </div>
      <div className="flex flex-col">
        <BlockMath math="w^{(i)} = \frac{1}{z} \cdot \hat{w}^{(i)}" />
        <BlockMath math="\hat{w}^{(i)} = e^{-y^{(i)} \cdot H_t(x^{(i)})}" />
        <BlockMath math="z = \sum_{j=1}^{n} e^{-y^{(j)} \cdot H_t(x^{(j)})}" />
      </div>

      <Derivation>
        <div className="flex flex-col">
          <BlockMath math="h_{t+1} = \arg \min_{h \in \mathcal{H}} \left( \sum_{i=1}^{n} \frac{\partial \ell}{\partial H(x^{(i)})} \cdot h(x^{(i)}) \right)" />
          <BlockMath math="= \arg \min_{h \in \mathcal{H}} \left(- \sum_{i=1}^{n} y^{(i)} \cdot e^{-y^{(i)} \cdot H(x^{(i)})} \cdot h(x^{(i)}) \right)" />
          <Info
            info={
              <div>
                <BlockMath math="\sum_{j=1}^{n} e^{-y^{(j)} \cdot H(x^{(j)})}" /> is a constant with respect to <InlineMath math="h" /> and does not depend on <InlineMath math="i" />.
              </div>
            }
          >
            <BlockMath math="= \arg \min_{h \in \mathcal{H}} \left(- \sum_{i=1}^{n} y^{(i)} h(x^{(i)}) \cdot \frac{\exp\left(-y^{(i)} \cdot H(x^{(i)})\right)}{\sum_{j=1}^{n} \exp\left(-y^{(j)} \cdot H(x^{(j)})\right)} \right)" />
          </Info>
        </div>

        <div>Now if we let define a new weight for each data point as:</div>
        <div>
          <BlockMath math="w^{(i)} = \frac{\exp\left(-y^{(i)} \cdot H(x^{(i)})\right)}{\sum_{j=1}^{n} \exp\left(-y^{(j)} \cdot H(x^{(j)})\right)}" />
        </div>
        <div>Then we can rewrite our minimization problem as:</div>
        <div className="flex flex-col">
          <BlockMath math="\arg \min_{h \in \mathcal{H}} \left(- \sum_{i=1}^{n} y^{(i)} h(x^{(i)}) \cdot w^{(i)} \right)" />
          <BlockMath math="= \arg \min_{h \in \mathcal{H}} \left(\sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} - \sum_{i=1}^{n} 1\left\{y^{(i)} = h(x^{(i)})\right\} \cdot w^{(i)} \right)" />
        </div>

        <div>
          Now since <InlineMath math="\sum_{i=1}^{n} w^{(i)} = 1" />, therefore:
        </div>
        <div>
          <BlockMath math="\sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} + \sum_{i=1}^{n} 1\left\{y^{(i)} = h(x^{(i)})\right\} \cdot w^{(i)} = 1" />
        </div>
        <div>
          <div>Then we can rewrite our minimization problem as:</div>
          <div className="flex flex-col">
            <BlockMath math="= \arg \min_{h \in \mathcal{H}} \left(\sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} + \sum_{i=1}^{n} 1\left\{y^{(i)} = h(x^{(i)})\right\} \cdot w^{(i)} - 1 \right)" />
            <BlockMath math="= \arg \min_{h \in \mathcal{H}} \left(2 \cdot \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} \right)" />
            <BlockMath math="= \arg \min_{h \in \mathcal{H}} \left(\sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} \right)" />
          </div>
        </div>
      </Derivation>

      <div>
        In AdaBoost, we can also find the optimal step size by minimizing the loss function with respect to <InlineMath math="\alpha" />.
      </div>
      <div>
        <BlockMath math="\alpha = \arg \min_{\alpha} \ell(H_t + \alpha h)" />
      </div>
      <div>Doing so, we find a closed form solution for the optimal step size in terms of the weighted classification error.</div>
      <div className="flex flex-col">
        <BlockMath math="\alpha = \frac{1}{2} \ln\left(\frac{1 - \epsilon}{\epsilon}\right)" />
        <BlockMath math="\epsilon = \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)}" />
      </div>

      <Derivation>
        <div className="flex flex-col">
          <BlockMath math="\alpha = \arg \min_{\alpha} \ell(H_t + \alpha h)" />
          <BlockMath math="\alpha = \arg \min_{\alpha} \left( \sum_{i=1}^{n} e^{-y^{(i)} \left(H_t(x^{(i)}) + \alpha h(x^{(i)})\right)} \right)" />
        </div>

        <div>
          Taking derivative with respect to <InlineMath math="\alpha" /> and setting it to zero, we get:
        </div>
        <div className="flex flex-col">
          <BlockMath math="- \sum_{i=1}^{n} y^{(i)} \cdot h(x^{(i)}) \cdot e^{-y^{(i)} \left(H_t(x^{(i)}) + \alpha h(x^{(i)})\right)} = 0" />
          <BlockMath math="- \sum_{i=1}^{n} y^{(i)} \cdot h(x^{(i)}) \cdot e^{-y^{(i)} H_t(x^{(i)})} \cdot e^{-y^{(i)} \alpha h(x^{(i)})} = 0" />
          <Info
            info={
              <div className="flex flex-col">
                <div>
                  When <InlineMath math="y^{(i)}" /> is equal to <InlineMath math="h(x^{(i)})" />
                </div>
                <div>
                  <BlockMath math="y^{(i)} \cdot h(x^{(i)}) = 1" />
                </div>
                <div>
                  When <InlineMath math="y^{(i)}" /> is not equal to <InlineMath math="h(x^{(i)})" />
                </div>
                <div>
                  <BlockMath math="y^{(i)} \cdot h(x^{(i)}) = -1" />
                </div>
              </div>
            }
          >
            <BlockMath math="\sum_{i=1}^{n} 1\left\{y^{(i)} = h(x^{(i)})\right\} \cdot e^{-y^{(i)} H_t(x^{(i)})} \cdot e^{-\alpha} - \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot e^{-y^{(i)} H_t(x^{(i)})} \cdot e^{\alpha} = 0" />
          </Info>
          <Info
            info={
              <div>
                After dividing both sides by <InlineMath math="\sum_{j=1}^{n} e^{-y^{(j)} H_t(x^{(j)})}" />
              </div>
            }
          >
            <BlockMath math="\sum_{i=1}^{n} 1\left\{y^{(i)} = h(x^{(i)})\right\} \cdot w^{(i)} \cdot e^{-\alpha} - \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} \cdot e^{\alpha} = 0" />
          </Info>
          <BlockMath math="\frac{e^{\alpha}}{e^{-\alpha}} = \frac{\sum_{i=1}^{n} 1\left\{y^{(i)} = h(x^{(i)})\right\} \cdot w^{(i)} }{\sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} }" />
          <Info
            info={
              <div>
                <BlockMath math="\sum_{i:y \neq h(x)} w^{(i)} + \sum_{i:y = h(x)} w^{(i)} = 1" />
              </div>
            }
          >
            <BlockMath math="e^{2\alpha} = \frac{1 - \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} }{\sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} }" />
          </Info>
        </div>

        <div>Letting</div>
        <div>
          <BlockMath math="\epsilon = \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)}" />
        </div>
        <div>We get,</div>
        <div className="flex flex-col">
          <BlockMath math="e^{2\alpha} = \frac{1 - \epsilon}{\epsilon}" />
          <BlockMath math="2\alpha \ln e = \ln\left(\frac{1 - \epsilon}{\epsilon}\right)" />
          <BlockMath math="\alpha = \frac{1}{2} \ln\left(\frac{1 - \epsilon}{\epsilon}\right)" />
        </div>
      </Derivation>

      <div>After taking each step, we need to recompute our weights and renormalize them so that they sum to one.</div>
      <div>The update rules for the unnormalized weights and normalization constant are given by:</div>
      <div className="flex flex-col">
        <BlockMath math="\hat{w}^{(i)} \leftarrow \hat{w}^{(i)} \cdot e^{-\alpha y^{(i)} h(x^{(i)})}" />
        <BlockMath math="z \leftarrow z * 2 \sqrt{\epsilon(1 - \epsilon)}" />
      </div>
      <div>Putting these together, we get the following update rule for the normalized weights:</div>
      <div>
        <BlockMath math="w^{(i)} \leftarrow w^{(i)} \cdot \frac{e^{-\alpha y^{(i)} h(x^{(i)})}}{2 \sqrt{\epsilon(1 - \epsilon)}}" />
      </div>

      <Derivation>
        <div>The updated unnormalized weights are given by:</div>
        <div>
          <BlockMath math="e^{-\left(H_{t}(x^{(i)}) + \alpha h(x^{(i)})\right)y^{(i)}}" />
          <BlockMath math="= e^{-\alpha y^{(i)} h(x^{(i)})} \cdot e^{-y^{(i)} H_t(x^{(i)})}" />
          <BlockMath math="= \hat{w}^{(i)} \cdot e^{-\alpha y^{(i)} h(x^{(i)})}" />
        </div>
        <div>Therefore,</div>
        <div>
          <BlockMath math="\hat{w}^{(i)} \leftarrow \hat{w}^{(i)} \cdot e^{-\alpha y^{(i)} h(x^{(i)})}" />
        </div>

        <div>Using this, the updated normalization constant can be written as:</div>
        <div>
          <BlockMath math="\sum_{i=1}^{n} \hat{w}^{(i)} \cdot e^{-\alpha y^{(i)} h(x^{(i)})}" />
          <Info
            info={
              <div className="flex flex-col">
                <div>
                  When <InlineMath math="y^{(i)}" /> is equal to <InlineMath math="h(x^{(i)})" />
                </div>
                <div>
                  <BlockMath math="y^{(i)} \cdot h(x^{(i)}) = 1" />
                </div>
                <div>
                  When <InlineMath math="y^{(i)}" /> is not equal to <InlineMath math="h(x^{(i)})" />
                </div>
                <div>
                  <BlockMath math="y^{(i)} \cdot h(x^{(i)}) = -1" />
                </div>
              </div>
            }
          >
            <BlockMath math="= \sum_{i=1}^{n} 1\left\{y^{(i)} = h(x^{(i)})\right\} \cdot \hat{w}^{(i)} \cdot e^{-\alpha} + \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot \hat{w}^{(i)} \cdot e^{\alpha}" />
          </Info>
          <BlockMath math="= \left(e^{-\alpha} \cdot \sum_{i=1}^{n} 1\left\{y^{(i)} = h(x^{(i)})\right\} \cdot \frac{\hat{w}^{(i)}}{z} + e^{\alpha} \cdot \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot \frac{\hat{w}^{(i)}}{z}\right) \cdot z" />
          <BlockMath math="= \left(e^{-\alpha} \cdot \sum_{i=1}^{n} 1\left\{y^{(i)} = h(x^{(i)})\right\} \cdot w^{(i)} + e^{\alpha} \cdot \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)}\right) \cdot z" />
          <Info
            info={
              <div>
                <BlockMath math="\sum_{i:y \neq h(x)} w^{(i)} + \sum_{i:y = h(x)} w^{(i)} = 1" />
              </div>
            }
          >
            <BlockMath math="= \left(e^{-\alpha} \cdot \left(1 - \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} \right) + e^{\alpha} \cdot \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)}\right) \cdot z" />
          </Info>
        </div>

        <div>Since,</div>
        <div>
          <BlockMath math="\epsilon = \sum_{i=1}^{n} 1\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)}" />
        </div>
        <div>Also since,</div>
        <div>
          <BlockMath math="\alpha = \frac{1}{2} \ln\left(\frac{1 - \epsilon}{\epsilon}\right)" />
        </div>
        <div>We can write the updated normalization constant as:</div>
        <div className="flex flex-col">
          <BlockMath math="\left[\exp\left(-\frac{1}{2} \ln\left(\frac{1 - \epsilon}{\epsilon}\right)\right) \cdot \left(1 - \epsilon \right) + \exp\left(-\frac{1}{2} \ln\left(\frac{1 - \epsilon}{\epsilon}\right)\right) \cdot \epsilon \right] \cdot z" />
          <Info
            info={
              <div>
                <BlockMath math="e^{k \ln a} = a^k" />
              </div>
            }
          >
            <BlockMath math="= \left[\sqrt{\frac{\epsilon}{1 - \epsilon}} \cdot \left(1 - \epsilon \right) + \sqrt{\frac{1 - \epsilon}{\epsilon}} \cdot \epsilon \right] \cdot z" />
          </Info>
          <BlockMath math="= \left[\sqrt{\frac{\epsilon}{1 - \epsilon} \left(1 - \epsilon \right)^2} + \sqrt{\frac{1 - \epsilon}{\epsilon} \cdot \epsilon^2} \right] \cdot z" />
          <BlockMath math="= z \cdot 2 \sqrt{\epsilon(1 - \epsilon)}" />
        </div>
        <div>Therefore,</div>
        <div>
          <BlockMath math="z \leftarrow z \cdot 2 \sqrt{\epsilon(1 - \epsilon)}" />
        </div>
      </Derivation>

      <div>
        Note that when <InlineMath math="\epsilon = \frac{1}{2}" />, that means that our weighted misclassification error is equal to <InlineMath math="50\%" />. This means that our new classifier{" "}
        <InlineMath math="h_{t+1}" /> is no better than random guessing. Therefore, we only want to add a new classifier to our current ensemble if <InlineMath math="\epsilon < \frac{1}{2}" />.
      </div>

      <Algorithm>
        <BlockMath math="\text{For each } i, \text{ let }w^{(i)} \leftarrow \frac{1}{n}" />
        <BlockMath math="\text{Repeat } \{" />
        <BlockMath math="\hspace{2em} h \leftarrow \arg \min_{h \in \mathcal{H}} \, \sum_{i=1}^n 1\left\{y^{(i)} \neq h(x^{(i)}) \right\} \cdot w^{(i)}" />
        <BlockMath math="\hspace{2em} \epsilon \leftarrow \sum_{i=1}^n 1\left\{y^{(i)} \neq h(x^{(i)}) \right\} \cdot w^{(i)}" />
        <BlockMath math="\hspace{2em} \text{if } \left(\epsilon < 0.5 \right) \text{ then } \{" />
        <BlockMath math="\hspace{4em} \alpha \leftarrow \frac{1}{2} \ln\left(\frac{1 - \epsilon}{\epsilon}\right)" />
        <BlockMath math="\hspace{4em} H \leftarrow H + \alpha \cdot h" />
        <BlockMath math="\hspace{4em} \text{For each } i, \text{ let }w^{(i)} \leftarrow w^{(i)} \cdot \frac{e^{-\alpha y^{(i)} h_{t+1}(x^{(i)})}}{2 \sqrt{\epsilon(1 - \epsilon)}}" />
        <BlockMath math="\hspace{2em} \}" />
        <BlockMath math="\hspace{2em} \text{else } \{" />
        <BlockMath math="\hspace{4em} \text{return } H" />
        <BlockMath math="\hspace{2em} \}" />
        <BlockMath math="\text{\}}" />
      </Algorithm>
    </Section>
  );
}
