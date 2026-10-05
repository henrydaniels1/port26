'use client';

/**
 * Renders an inline `<script>` that runs synchronously while the browser parses
 * the HTML — before the first paint. This is the pattern Next.js recommends for
 * avoiding a flash of the wrong theme pre-hydration.
 *
 * On the server it is emitted as `text/javascript` so the browser executes it.
 * On the client it is re-rendered as `text/plain`, which keeps the SSR HTML
 * intact while avoiding React's dev-mode warning about script tags being
 * "never executed when rendering on the client". `suppressHydrationWarning`
 * tolerates the server/client `type` swap.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
