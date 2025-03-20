import { BlockMath, InlineMath } from "react-katex";

import Section from "~/app/notes/_components/section";

export default function Limitations() {
  return (
    <Section heading="Limitations">
      <div>There are certain scenarios where Independent Component Analysis (ICA) might not work well:</div>
      <div className="flex flex-col list-disc pl-2 gap-2">
        <li>
          If our unmixing matrix <InlineMath math="W" /> is multiplied by a permutation matrix <InlineMath math="P" />, there is no way for us to know about it. In this case we won&apos;t be able to
          know which signal was from which source.
          <BlockMath math="W \rightarrow PW" />
        </li>
        <li>
          If a row in the unmixing matrix <InlineMath math="W" /> is scaled by a constant <InlineMath math="\alpha" />, this will just result in the corresponding source being scaled by{" "}
          <InlineMath math="1/\alpha" />. There is no way for us to know if scaling has occurred. Therefore, we won&apos;t be able to retrieve the true amplitude of our signal.
        </li>
        <li>
          If the data <InlineMath math="x" /> follows a gaussian distribution, then our sources <InlineMath math="s" /> will also follow a gaussian distribution. And gaussian distributions are
          symmetric in nature. Therefore, if our unmixing matrix <InlineMath math="W" /> is multiplied by a rotation or reflection matrix <InlineMath math="R" />, there is no way for us to know about
          it.
          <BlockMath math="W \rightarrow RW" />
        </li>
      </div>
      <div>Moreover, we have assumed that our data points are independent and identically distributed. This is however, not true for time-series data.</div>
      <div>Despite all these limitations, ICA still works very well given enough data.</div>
    </Section>
  );
}
