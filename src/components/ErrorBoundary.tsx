import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] p-8 text-center text-white">
          <div className="max-w-xl chic-glass chic-border p-12 rounded-[40px] shadow-2xl">
            <h1 className="text-3xl chic-heading mb-4">System Anomaly Detected</h1>
            <p className="chic-text-muted mb-8 text-lg">{this.state.error?.message || "An unexpected runtime error has occurred in the protocol."}</p>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-8 text-left overflow-auto max-h-40">
              <code className="text-xs text-red-400 font-mono italic">
                {this.state.error?.stack}
              </code>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-white text-zinc-950 font-black px-10 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95 uppercase tracking-widest text-xs"
            >
              Restart Protocol
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
