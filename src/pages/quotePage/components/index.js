import { ScreenTopLoader } from "../../../components";
import { useGetQuotes } from "../../../customHooks";

export function QuotesLoader() {
  const { isLoading, loadingPercentage } = useGetQuotes();

  return <ScreenTopLoader show={isLoading} progress={loadingPercentage} />;
}
