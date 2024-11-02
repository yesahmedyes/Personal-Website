import { BlockMath, InlineMath } from "react-katex";
import Content from "../../_components/content";
import Main from "../../_components/main";
import Section from "../../_components/section";
import Derivation, { DerivationContent } from "../../_components/derivation";
import Algorithm from "../../_components/algorithm";

export default function Page() {
  return (
    <Main>
      <Section heading="Introduction" title="Reinforcement Learning">
        <Content>
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
        </Content>
        <Algorithm>
          <BlockMath math="\textbf{Value Iteration}" />
          <BlockMath math="\text{For each state } s, \text{ initialize } V(s) = 0" />
          <BlockMath math="\text{Repeat until convergence \{}" />
          <BlockMath math="\hspace{2em} \text{For each state } s, \text{ set } \text{\{}" />
          <BlockMath math="\hspace{4em} V(s) \leftarrow R(s) + \max_{a \in A} \left(\gamma \sum_{s' \in S} P_{sa}(s') V^*(s') \right)" />
          <BlockMath math="\hspace{2em} \text{\}}" />
          <BlockMath math="\text{\}}" />
        </Algorithm>
        <Algorithm>
          <BlockMath math="\textbf{Policy Iteration}" />
          <BlockMath math="\text{Initialize } π \text{ randomly}" />
          <BlockMath math="\text{Repeat until convergence \{}" />
          <BlockMath math="\hspace{2em} \text{Let } V = V^{\pi} \hspace{8em} \Rightarrow \textit{typically by a linear system solver}" />
          <BlockMath math="\hspace{2em} \text{For each state } s, \text{ set } \text{\{}" />
          <BlockMath math="\hspace{4em} π(s) \leftarrow \arg\max_{a \in A} \left(\sum_{s' \in S} P_{sa}(s') V^*(s') \right)" />
          <BlockMath math="\hspace{2em} \text{\}}" />
          <BlockMath math="\text{\}}" />
        </Algorithm>
        <Content>
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
        </Content>
      </Section>
      <Section heading="Value Function Approximation">
        <Content>
          <div></div>
        </Content>
      </Section>
    </Main>
  );
}
