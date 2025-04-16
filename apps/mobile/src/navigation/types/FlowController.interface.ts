export interface FlowController {
  start: () => void;
  dispose?: () => void;
}
