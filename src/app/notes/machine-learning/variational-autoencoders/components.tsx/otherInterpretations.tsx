import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Lemma from "~/app/notes/_components/lemma";
import Section from "~/app/notes/_components/section";

export default function OtherInterpretations() {
  return (
    <Section heading="Other Interpretation">
      <Content>
        <div>
          There is a different, much simpler way to derive variational autoencoders. Instead of maximizing the <InlineMath math="\text{ELBO}" /> with <InlineMath math="\theta" />, we can maximize the
          following instead:
        </div>
      </Content>
    </Section>
  );
}
