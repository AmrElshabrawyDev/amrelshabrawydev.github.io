"use client";

import React from "react";
import type { Components } from "react-markdown";

/**
 * Custom components for ReactMarkdown to handle specific rendering needs.
 * Typography and spacing are handled globally via the .markdown-body class in globals.css
 * to ensure consistency between Markdown and Raw HTML content.
 */
export const markdownComponents: Components = {
  // Simple paragraph wrapper to ensure compatibility
  p: ({ ...props }) => <p {...props} />,

  // Code blocks with custom styling
  code: ({
    className,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"code">) => {
    const isInline = !className?.includes("language-");
    return isInline ? (
      <code
        className="bg-primary-500/10 text-primary-400 px-1.5 py-0.5 rounded text-sm"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className="block bg-bg-base p-4 rounded-lg overflow-x-auto text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Links with external attributes and theme colors
  a: ({ ...props }) => (
    <a
      className="text-primary-400 hover:text-primary-300 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  // Responsive images with rounded corners
  img: ({ ...props }) => (
    <img className="rounded-lg max-w-full h-auto" alt="" {...props} />
  ),
};
