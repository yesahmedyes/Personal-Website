declare module "aos" {
  function init(options?: AosInitOptions): void;
  function refresh(): void;
  function refreshHard(): void;

  interface AosInitOptions {
    delay?: number;
    duration?: number;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?:
      | "top-bottom"
      | "top-center"
      | "top-top"
      | "center-bottom"
      | "center-center"
      | "center-top"
      | "bottom-bottom"
      | "bottom-center"
      | "bottom-top";
  }
}
