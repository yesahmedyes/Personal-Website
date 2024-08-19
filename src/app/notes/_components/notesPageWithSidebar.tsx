"use client";

import React, { type ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

interface NotesPageWithSidebarProps {
  heading: string;
  children: React.ReactNode;
}

export default function NotesPageWithSidebar(props: NotesPageWithSidebarProps) {
  const { heading, children } = props;

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
      { threshold: 0.3 },
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

  return (
    <div className="flex h-screen w-full justify-center bg-gradient-to-b from-bgDark to-bgDarkShade">
      <div className="flex h-screen w-full flex-row overflow-y-auto">
        <div className="no-scrollbar flex h-full w-3/12 flex-col gap-4 overflow-y-auto bg-componentDark px-8 py-12 font-light text-white text-opacity-95">
          {sectionIds.map((id) => (
            <div
              className={`cursor-pointer hover:text-orange-500 ${activeSection === id && "text-orange-400"}`}
              key={id}
            >
              {id}
            </div>
          ))}
        </div>
        <div className="flex h-full w-9/12 flex-col place-items-center overflow-y-auto py-12 text-opacity-95">
          <div className="flex w-10/12 flex-col gap-6 rounded-sm bg-white p-16">
            <div className="w-full pb-2 text-center font-serif text-3xl font-medium">
              {heading}
            </div>
            {childrenWithRefs}
          </div>
        </div>
      </div>
    </div>
  );
}
