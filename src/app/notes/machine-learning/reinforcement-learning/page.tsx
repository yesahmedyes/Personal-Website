import { BlockMath, InlineMath } from "react-katex";

import Main from "../../_components/main";
import Section from "../../_components/section";
import Algorithm from "../../_components/algorithm";

export default function Page() {
  return (
    <Main>
      <Section heading="Introduction" title="Reinforcement Learning">
        <div>
          A Markov Decision Process (MDP) is a mathematical framework used to model decision-making in situations where outcomes are uncertain. It is formulated using a tuple{" "}
          <InlineMath math="(S, A, P_{sa}, γ, R)" />, where:
        </div>
        <div className="list-disc list-inside">
          <li>
            <InlineMath math="S" /> is the set of states.
          </li>
          <li>
            <InlineMath math="A" /> is the set of actions.
          </li>
          <li>
            <InlineMath math="P_{sa}" /> are the state transition probabilities.
          </li>
          <li>
            <InlineMath math="γ" /> is the discount factor.
          </li>
          <li>
            <InlineMath math="R" /> is the reward function.
          </li>
        </div>
        <div>
          Rewards are usually written as functions of states and actions, i.e. <InlineMath math="R(s, a)" /> or simply just states, i.e. <InlineMath math="R(s)" />.
        </div>
        <div>Our goal is to find actions that maximize the expected sum of discounted rewards.</div>
        <div>
          <BlockMath math="\mathbb{E}\left[R(s_0) + γR(s_1) + γ^2R(s_2) + ...\right]" />
        </div>
        <div>
          A policy is any function <InlineMath math="π : S → A" /> that maps from states to actions. A value function <InlineMath math="V^{\pi}" /> is defined as the expected return starting from
          state <InlineMath math="s" /> and following policy <InlineMath math="π" />.
        </div>
        <div>
          <BlockMath math="V^{\pi}(s) = \mathbb{E}\left[R(s_0) + γR(s_1) + γ^2R(s_2) + ...\right | s_0 = s, π]" />
        </div>
        <div>We can write the value function recursively as the Bellman equation:</div>
        <div className="flex flex-col">
          <BlockMath math="V^{\pi}(s) = R(s) + \gamma \sum_{s' \in S} P_{sπ(s)}(s') \cdot \mathbb{E}\left[R(s_1) + γR(s_2) + ...\right | s_1 = s', π]" />
          <BlockMath math="= R(s) + \gamma \sum_{s' \in S}P_{sπ(s)}(s') \cdot V^{\pi}(s')" />
        </div>
        <div>
          Note that <InlineMath math="P_{sπ(s)}(s')" /> is the probability of landing on state <InlineMath math="s'" /> from state <InlineMath math="s" /> if we take the action{" "}
          <InlineMath math="π(s)" />.
        </div>
        <div>
          The optimal value function <InlineMath math="V^*(s)" /> is the maximum value function over all policies:
        </div>
        <div>
          <BlockMath math="V^*(s) = \max_{π} V^{\pi}(s)" />
        </div>
        <div>The Bellman equation for the optimal value function is:</div>
        <div>
          <BlockMath math="V^*(s) = R(s) + \max_{a \in A} \left(\gamma \sum_{s' \in S} P_{sa}(s') V^*(s') \right)" />
        </div>
        <div>
          The optimal policy <InlineMath math="π^*" /> is the one that maximizes the value function:
        </div>
        <div>
          <BlockMath math="π^*(s) = \arg\max_{a \in A} \left(\sum_{s' \in S} P_{sa}(s') V^*(s') \right)" />
        </div>
        <div>Finding the optimal policy is equivalent to finding the optimal value function. And there are two algorithms that can do this: Value Iteration and Policy Iteration.</div>

        <Algorithm>
          <BlockMath math="\textbf{Value Iteration}" />
          <BlockMath math="\text{For each state } s, \text{ initialize } V(s) = 0" />
          <BlockMath math="\text{Repeat until convergence \{}" />
          <BlockMath math="\hspace{2em} \text{For each state } s, \text{ set } \text{\{}" />
          <BlockMath math="\hspace{4em} V(s) \leftarrow R(s) + \max_{a \in A} \left(\gamma \sum_{s' \in S} P_{sa}(s') V(s') \right)" />
          <BlockMath math="\hspace{2em} \text{\}}" />
          <BlockMath math="\text{\}}" />
        </Algorithm>
        <Algorithm>
          <BlockMath math="\textbf{Policy Iteration}" />
          <BlockMath math="\text{Initialize } π \text{ randomly}" />
          <BlockMath math="\text{Repeat until convergence \{}" />
          <BlockMath math="\hspace{2em} \text{Let } V = V^{\pi} \hspace{8em} \Rightarrow \textit{typically by a linear system solver}" />
          <BlockMath math="\hspace{2em} \text{For each state } s, \text{ set } \text{\{}" />
          <BlockMath math="\hspace{4em} π(s) \leftarrow \arg\max_{a \in A} \left(\sum_{s' \in S} P_{sa}(s') V(s') \right)" />
          <BlockMath math="\hspace{2em} \text{\}}" />
          <BlockMath math="\text{\}}" />
        </Algorithm>

        <div>
          For small MDPs, Policy iteration converges faster. However, for large MDPs, solving for <InlineMath math="V^{\pi}" /> in each step of policy iteration involves solving a large system of
          linear equations, which is computationally expensive.
        </div>
        <div>
          Usually, we do not know the state transition probabilities <InlineMath math="P_{sa}" /> before hand. Instead, they can be estimated by repeatedly running the agent on the MDP under policy{" "}
          <InlineMath math="π" /> and using the following formula:
        </div>
        <div>
          <BlockMath math="P_{sa}(s') = \frac{\text{\# of times we took action } a \text{ in state } s \text{ and ended up in state } s'}{\text{\# of times we took action } a \text{ in state } s}" />
        </div>
      </Section>
      <Section heading="Value Function Approximation">
        <div>
          One way to deal with continuous state spaces in MDPs is to descretize the state space. If we have <InlineMath math="d" /> dimensions and we discretize each dimension with{" "}
          <InlineMath math="k" /> values, then we have <InlineMath math="k^d" /> states. As we increase <InlineMath math="k" />, the number of states grows exponentially.
        </div>
        <div>To deal with this, we can use function approximation.</div>
        <div>
          One way to do this is using a model-based approach. We use a simulator to execute <InlineMath math="n" /> trials, each for <InlineMath math="T" /> time steps.
        </div>
        <div>
          <BlockMath math="s_0^{(1)} \xrightarrow{a_0^{(1)}} s_1^{(1)} \xrightarrow{a_1^{(1)}} s_2^{(1)} \xrightarrow{a_2^{(1)}} \cdots \xrightarrow{a_{T-1}^{(1)}} s_T^{(1)}" />
          <BlockMath math="s_0^{(2)} \xrightarrow{a_0^{(2)}} s_1^{(2)} \xrightarrow{a_1^{(2)}} s_2^{(2)} \xrightarrow{a_2^{(2)}} \cdots \xrightarrow{a_{T-1}^{(2)}} s_T^{(2)}" />
          <BlockMath math="\vdots" />
          <BlockMath math="s_0^{(n)} \xrightarrow{a_0^{(n)}} s_1^{(n)} \xrightarrow{a_1^{(n)}} s_2^{(n)} \xrightarrow{a_2^{(n)}} \cdots \xrightarrow{a_{T-1}^{(n)}} s_T^{(n)}" />
        </div>
        <div>
          We can then use these to learn a linear model to predict <InlineMath math="s_{t+1}" /> as a function of <InlineMath math="s_t" /> and <InlineMath math="a_t" />:
        </div>
        <div>
          <BlockMath math="s_{t+1} = A s_t + B a_t" />
        </div>
        <div>
          We can then minimize the squared error over all trials using gradient descent to find <InlineMath math="A" /> and <InlineMath math="B" />:
        </div>
        <div>
          <BlockMath math="\arg \min_{A, B} \, \sum_{i=1}^n \sum_{t=0}^{T-1} \left(s_{t+1}^{(i)} - \left(A s_t^{(i)} + B a_t^{(i)}\right) \right)^2" />
        </div>
        <div>However, this is a deterministic model. Most real world systems are stochastic. So we can modify the model to be stochastic by adding a noise term:</div>
        <div className="flex flex-col">
          <BlockMath math="s_{t+1} = A s_t + B a_t + \epsilon" />
          <BlockMath math="\epsilon \sim \mathcal{N}(0, \Sigma)" />
        </div>
        <div>Now, if we assume that the our state space is continous but our action space is small and discrete, we can use the Fitted value iteration algorithm.</div>
        <div>
          <BlockMath math="s_{t+1} - (A s_t + B a_t) = \epsilon" />
        </div>
        <div>
          Since <InlineMath math="\epsilon" /> is normally distributed, the term <InlineMath math="s_{t+1} - (A s_t + B a_t)" /> is also normally distributed. We can then write:
        </div>
        <div>
          <BlockMath math="s_{t+1} \sim \mathcal{N}\left(A s_t + B a_t, \Sigma\right)" />
        </div>
        <div>Our state transition function can now be written as:</div>
        <div>
          <BlockMath math="P_{sa}(s') = \mathcal{N}\left(A s + B a, \, \Sigma\right)" />
        </div>
        <div>Moreover, our value iteration update rule for the continuous case can be written as:</div>
        <div>
          <BlockMath math="V(s) \leftarrow R(s) + \gamma \cdot \max_{a \in A} \left(\int_{s'} P_{sa}(s') V(s') \, ds' \right)" />
        </div>
        <div>
          However, since out states <InlineMath math="s" /> are continuous, we have to approximate the value function <InlineMath math="V(s)" /> as well. We do so by finding a linear or non-linear
          mapping from states to the value function:
        </div>
        <div>
          <BlockMath math="V(s) = \theta^T \phi(s)" />
        </div>
        <div>
          We also can not directly update our <InlineMath math="V(s)" /> from the value iteration update rule. Instead, we have to update our <InlineMath math="\theta" /> parameters.
        </div>
        <div>We do this by minimizing the squared error:</div>
        <div className="flex flex-col">
          <BlockMath math="\arg \min_{\theta} \sum_{i=1}^n \left(y^{(i)} - \theta^T \phi(s^{(i)})\right)^2" />
          <BlockMath math="y^{(i)} = R(s^{(i)}) + \gamma \cdot \max_{a \in A} \left(\int_{s'} P_{sa}(s') V(s') \, ds' \right)" />
        </div>

        <Algorithm>
          <BlockMath math="\text{Randomly sample } n \text{ states}" />
          <BlockMath math="\text{Initialize } \theta \text{ to } 0" />
          <BlockMath math="\text{Repeat until convergence \{}" />
          <BlockMath math="\hspace{2em} \text{For } i = 1 \text{ to } n \text{ \{}" />
          <BlockMath math="\hspace{4em} \text{For each action } a \in A \text{ \{}" />
          <BlockMath math="\hspace{6em} \text{Sample } s_1', s_2', \ldots, s_k' \sim P_{s^{(i)}a}(s')" />
          <BlockMath math="\hspace{6em} \text{Set } q(a) \leftarrow R(s^{(i)}) + \gamma \cdot \frac{1}{k} \cdot \sum_{j=1}^k V(s_j')" />
          <BlockMath math="\hspace{4em} \text{\}}" />
          <BlockMath math="\hspace{4em} y^{(i)} \leftarrow \max_{a} q(a)" />
          <BlockMath math="\hspace{2em} \text{\}}" />
          <BlockMath math="\hspace{2em} \theta \leftarrow \arg \min_{\theta} \sum_{i=1}^n \left(y^{(i)} - \theta^T \phi(s^{(i)})\right)^2" />
          <BlockMath math="\text{\}}" />
        </Algorithm>
      </Section>
    </Main>
  );
}
