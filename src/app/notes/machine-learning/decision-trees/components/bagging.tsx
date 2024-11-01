import { BlockMath, InlineMath } from "react-katex";
import Algorithm from "~/app/notes/_components/algorithm";
import Content from "~/app/notes/_components/content";
import MyLink from "~/app/notes/_components/myLink";
import Section from "~/app/notes/_components/section";

export default function Bagging() {
  return (
    <Section heading="Bagging">
      <Content>
        <div>
          From <MyLink href="/notes/machine-learning/learning-theory">Bias-Variance Tradeoff</MyLink>, we know that the Mean Squared Error (MSE) between the best possible classifier and our classifier
          can be broken down.
        </div>
        <div>
          <BlockMath math="\mathbb{E} \left[ (y - h_s(x))^2 \right] = \sigma^2 + \underbrace{\left( h^*(x) - h_{\text{avg}}(x) \right)^2}_{\text{bias}^2} + \underbrace{\mathbb{E}\left[\left(h_{avg}(x) - h_{s}(x)\right)^2 \right]}_{\text{variance}}" />
        </div>
        <div>The variance term indicates how much the model&apos;s predictions would change if it were trained on a different dataset.</div>
        <div>
          If we let <InlineMath math="D_i" /> be the <InlineMath math="i" />
          th dataset, then for <InlineMath math="n" /> datasets, we can define the average model as the ensemble average:
        </div>
        <div>
          <BlockMath math="\hat{h}(x) = \frac{1}{n} \sum_{j=1}^{n} h_{D_i}(x)" />
        </div>
        <div>
          As <InlineMath math="n \to \infty" />, according to the Law of Large Numbers, our average model <InlineMath math="\hat{h}(x)" /> will converge to <InlineMath math="h_{avg}(x)" />.{" "}
        </div>
        <div>
          This means that if we have infinite datasets and we train our classifiers on each data set and then take an average, we can reduce the variance to <InlineMath math="0" />.
        </div>
        <div>
          However, we do not have infinite datasets, we only have one. Therefore, we use Bootstraping instead. We sample <InlineMath math="n" /> datasets with replacement from our original dataset{" "}
          <InlineMath math="D" />.{" "}
        </div>
        <div>
          Note that doing this means that our datasets are not independent and identically distributed and according to the Law of Large Numbers is no longer guaranteed. In practice, however, doing
          this still helps us reduce the variance to some extent.
        </div>
      </Content>
      <Content>
        <div>Next, to find the unbiased estimate of the test error, we need to find the out-of-bag (OOB) error.</div>
        <div>
          Let <InlineMath math="S_i" /> be the set of all sampled data sets that do not contain the <InlineMath math="i" />
          th example. Then our prediction for the <InlineMath math="i" />
          th example is given by:
        </div>
        <div>
          <BlockMath math="\tilde{h}_i(x) = \frac{1}{|S_i|} \sum_{j \in S_i} h_{j}(x)" />
        </div>
        <div>Then the out-of-bag error is given by:</div>
        <div>
          <BlockMath math="\epsilon_{\text{oob}} = \frac{1}{n} \sum_{i=1}^{|D|} \, loss\left(\tilde{h}_i(x^{(i)}), \, y^{(i)}\right)" />
        </div>
      </Content>
      <Content>
        <div>
          Random Forest is an example of Bagging. In Random Forest, each decision tree is trained on a bootstrapped sample of the data, and only a random subset of <InlineMath math="k" /> features are
          considered for splitting at each node. Each tree is grown to its full depth, and then an ensemble average is used to make predictions.
        </div>
        <div>
          Usually <InlineMath math="k = \sqrt{d}" /> where <InlineMath math="d" /> is the total number of features in each example.
        </div>
      </Content>
      <Algorithm>
        <BlockMath math="\text{For } t = 1 \text{ to } T \text{ \{}" />
        <BlockMath math="\hspace{2em} \text{Bootstrap a sample } D_i \in D" />
        <BlockMath math="\hspace{2em} \text{Train a decision tree } h_{D_i}(x) \text{ \{}" />
        <BlockMath math="\hspace{4em} \text{At each node, randomly select } k \text{ features}" />
        <BlockMath math="\hspace{4em} \text{Choose best split among } k \text{ features based on impurity}" />
        <BlockMath math="\hspace{4em} \text{Repeat until no impurity reduction possible}" />
        <BlockMath math="\hspace{2em} \text{\}}" />
        <BlockMath math="\text{\}}" />
      </Algorithm>
    </Section>
  );
}
