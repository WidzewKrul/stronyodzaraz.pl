import type { WykonaneItem } from "@/lib/wykonane-content";
import {
  getBrowserMock,
  getDashboardMock,
  getFlowMock,
  getSplitMock,
} from "@/lib/wykonane-content";
import BrowserMock from "./BrowserMock";
import DashboardMock from "./DashboardMock";
import FlowMock from "./FlowMock";
import SplitMock from "./SplitMock";

type Props = { item: Pick<WykonaneItem, "mockVariant" | "mockRef">; compact?: boolean };

export default function ShowcaseMock({ item, compact }: Props) {
  if (item.mockVariant === "browser") {
    const data = getBrowserMock(item.mockRef);
    if (!data) return null;
    return <BrowserMock data={data} compact={compact} />;
  }
  if (item.mockVariant === "dashboard") {
    const data = getDashboardMock(item.mockRef);
    if (!data) return null;
    return <DashboardMock data={data} compact={compact} />;
  }
  if (item.mockVariant === "flow") {
    const data = getFlowMock(item.mockRef);
    if (!data) return null;
    return <FlowMock data={data} compact={compact} />;
  }
  if (item.mockVariant === "split") {
    const data = getSplitMock(item.mockRef);
    if (!data) return null;
    return <SplitMock data={data} compact={compact} />;
  }
  return null;
}
