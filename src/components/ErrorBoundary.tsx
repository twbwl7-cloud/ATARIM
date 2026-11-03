"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: () => void;
  className?: string;
};

type State = { hasError: boolean };

/**
 * Catch render crashes from heavy clients (Three.js, complex motion)
 * so the rest of the page keeps working.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error.message, info.componentStack);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback;
      return (
        <div
          className={
            this.props.className ??
            "flex min-h-[8rem] items-center justify-center px-4 text-center text-sm font-light text-ink-faint"
          }
          role="status"
        >
          התצוגה הוחלפה במצב בטוח — האתר ממשיך לפעול כרגיל.
        </div>
      );
    }
    return this.props.children;
  }
}
