"use client";

import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { type ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

interface MainProps {
  children: React.ReactNode;
}

export default function Main(props: MainProps) {
  const { children } = props;

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [sectionIds, setSectionIds] = useState<string[]>([]);
  const sectionRefs = useRef<React.RefObject<HTMLParagraphElement>[]>([]);

  useEffect(() => {
    const childrenCount = React.Children.count(children);

    sectionRefs.current = sectionRefs.current.slice(0, childrenCount);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref.current && ref.current instanceof Element) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref.current && ref.current instanceof Element) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [children]);

  useEffect(() => {
    const ids = React.Children.map(children, (child) => {
      if (React.isValidElement<{ id: string }>(child)) {
        return child.props.id;
      }
    });

    setSectionIds(ids!);
  }, [children]);

  const childrenWithRefs = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (!sectionRefs.current[index]) {
        sectionRefs.current[index] = React.createRef();
      }

      return React.cloneElement(child as ReactElement, {
        ref: sectionRefs.current[index],
        key: index,
      });
    }
  });

  function scrollToSection(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="flex flex-col h-full w-full justify-center bg-bgLessDark">
      <div className="flex h-full w-full flex-row justify-center transition-all duration-300">
        <div className="flex flex-col fixed right-10 top-10 gap-2">
          {sectionIds.length > 0 &&
            sectionIds.map((id) => (
              <div
                onClick={() => {
                  setActiveSection(id);
                  scrollToSection(id);
                }}
                className={`cursor-pointer bg-white w-[16px] h-[2px] opacity-30 rounded-full ${activeSection === id && "opacity-100"}`}
                key={id}
              ></div>
            ))}
        </div>
        <div className={`transition-all duration-300 flex min-h-full place-self-center w-11/12 2xl:w-10/12 flex-col place-items-center overflow-y-auto gap-16 pt-20 pb-32 overflow-x-hidden`}>
          {childrenWithRefs}
        </div>
      </div>
    </div>
  );
}
