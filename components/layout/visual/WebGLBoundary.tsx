"use client";
import { Component, type ReactNode } from "react";

// Decorative rendering must never take the page's content down with it.
export default class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
