import { useParams } from "react-router-dom";
import {
  useGetEnquiriesQuery,
  useUpdateGroupsMutation,
} from "../../../../api/api";

function useUpdateFilters() {
  const [updateGroup, ...query] = useUpdateGroupsMutation();

  const { groupCode } = useParams();

  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  const currentGroup = groups.find(group => group.id === parseInt(groupCode));

  const previousFilters = currentGroup.extras;

  function updateFilters(filters) {
    updateGroup({
      groupCode,
      extras: previousFilters ? { ...previousFilters, ...filters } : filters,
      plan_type: filters.plantype ? filters.plantype.code : undefined,
    });
  }

  function resetFilters() {
    updateGroup({ groupCode, extras: null });
  }

  return { updateFilters, resetFilters, ...query };
}

export default useUpdateFilters;
