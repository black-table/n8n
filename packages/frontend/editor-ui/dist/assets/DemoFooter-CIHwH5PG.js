import { L as LogsPanel } from "./LogsPanel-D9r5AcQH.js";
import { d as defineComponent, p as useSettingsStore, Q as useWorkflowsStore, q as computed, e as createBlock, f as createCommentVNode, m as unref, g as openBlock } from "./index-DZ6VpjNj.js";
import "./useClearExecutionButtonVisible-Dwc1_eG9.js";
import "./useCanvasOperations-u8oSDa_u.js";
import "./RunData-b0RE2JWc.js";
import "./FileSaver.min-bgn7Q9Gt.js";
import "./useExecutionHelpers-DqwMonFW.js";
import "./dateFormatter-BPfJSa6q.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DemoFooter",
  setup(__props) {
    const { isNewLogsEnabled } = useSettingsStore();
    const workflowsStore = useWorkflowsStore();
    const hasExecutionData = computed(() => workflowsStore.workflowExecutionData);
    return (_ctx, _cache) => {
      return unref(isNewLogsEnabled) && hasExecutionData.value ? (openBlock(), createBlock(LogsPanel, {
        key: 0,
        "is-read-only": true
      })) : createCommentVNode("", true);
    };
  }
});
export {
  _sfc_main as default
};
