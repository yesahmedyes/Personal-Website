"use client";

import { useEffect } from "react";

interface MathJaxProviderProps {
  children: React.ReactNode;
}

export default function MathJaxProvider({ children }: MathJaxProviderProps) {
  const useMathJax = () => {
    useEffect(() => {
      const configScript = document.createElement("script");
      configScript.type = "text/javascript";
      configScript.textContent = `
        window.MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['\\[', '\\]'], ['$$', '$$']]
          },
          svg: {
            fontCache: 'global'
          },
          loader: {
            load: ['input/tex', 'output/svg']
          }
        };
      `;

      const script = document.createElement("script");
      script.id = "MathJax-script";
      script.async = true;
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-svg.js";

      document.head.appendChild(configScript);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(configScript);
        document.head.removeChild(script);
      };
    }, []);
  };

  useMathJax();

  return <>{children}</>;
}
