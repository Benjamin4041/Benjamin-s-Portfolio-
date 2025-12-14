import React from "react";
import AnimatedCopy from './AnimatedCopy/AnimatedCopy';

export default function Review({ qoute, person, role }) {
  return (
    <div className="flex lg:flex-row flex-col w-full lg:items-end gap-6">
      <AnimatedCopy
        key={qoute}
        className="mb-7 not-italic font-normal lg:text-5xl text-sm leading-6 lg:flex-1 lg:max-w-[60ch]"
      >
        {qoute}
      </AnimatedCopy>
      <AnimatedCopy
        key={person}
        className="lg:self-end not-italic font-normal lg:text-xl text-sm lg:flex-shrink-0 lg:text-right"
      >
        {person}
        <br />
        <span className="block pt-2 text-nowrap">{role}</span>
      </AnimatedCopy>
    </div>
  );
}
