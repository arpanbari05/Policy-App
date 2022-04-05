import { useParams } from "react-router-dom";
import {
  useGetEnquiriesQuery,
  useUpdateGroupsMutation,
} from "../../../../api/api";

function useUpdateFilters() {
  const [updateGroup, query] = useUpdateGroupsMutation();

  const { groupCode } = useParams();

  let {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  const currentGroup = groups.find(group => group.id === parseInt(groupCode));

  const previousFilters = currentGroup.extras;

  const reduxGroup = JSON.parse(localStorage.getItem("groups"));

  function updateFilters(filters) {
    updateGroup({
      groupCode,
      extras: previousFilters ? { ...previousFilters, ...filters } : filters,
      plan_type: filters.plantype ? filters.plantype.code : undefined,
    });
    groups = reduxGroup.map(group => {
      const reduxGroupMatch = reduxGroup?.find(reGrp => {
        return reGrp?.members?.some(mem => group?.members?.includes(mem));
      });
      if (reduxGroupMatch) {
        return {
          ...group,
          extras: previousFilters
            ? { ...previousFilters, ...filters }
            : filters,
          plan_type:
            filters?.plantype?.code || reduxGroupMatch?.extras?.plan_type,
        };
      }
    });
    localStorage.setItem("groups", JSON.stringify(groups));
  }

  function resetFilters() {
    updateGroup({ groupCode, extras: null });
    groups = reduxGroup.map(group => {
      const reduxGroupMatch = reduxGroup?.find(reGrp => {
        return reGrp?.members?.some(mem => group?.members?.includes(mem));
      });
      if (reduxGroupMatch) {
        return {
          ...group,
          extras: null,
          plan_type: group?.plan_type === "M" ? "F" : group?.plan_type,
        };
      }
    });
    localStorage.setItem("groups", JSON.stringify(groups));
  }

  return { updateFilters, resetFilters, query };
}

export default useUpdateFilters;
