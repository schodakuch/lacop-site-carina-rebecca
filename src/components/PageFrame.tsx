"use client";

// Wraps every page's content, offsetting it from the desktop side-rail so
// layouts don't have to duplicate the `ml-[220px]` everywhere.

export default function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:ml-[220px]">
      <div className="px-5 md:px-10 max-w-[1100px] pt-20 md:pt-14 pb-20 md:pb-28">
        {children}
      </div>
    </div>
  );
}
