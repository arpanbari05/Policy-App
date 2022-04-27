import { useParams } from "react-router-dom";
import {
  useGetEnquiriesQuery,
  useUpdateGroupsMutation,
} from "../../../../api/api";
import useFilters from "./useFilters";

function useUpdateFilters() {
  const [updateGroup, query] = useUpdateGroupsMutation();
  const { getSelectedFilter } = useFilters();

  const { groupCode } = useParams();

  const {
    data: {
      data: { groups: enqGroups },
    },
  } = useGetEnquiriesQuery();

  let groups = localStorage.getItem("groups")
    ? JSON.parse(localStorage.getItem("groups"))
    : enqGroups;

  const currentGroup = groups?.find(group => group?.id === parseInt(groupCode));

  const previousFilters = currentGroup?.extras;

  const reduxGroup = JSON.parse(localStorage.getItem("groups"));

  function updateFilters(filters) {
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
    updateGroup({
      groupCode,
      extras: {
        sum_insured:
          filters?.cover?.code ||
          previousFilters?.cover?.code ||
          getSelectedFilter("cover")?.code,
        tenure:
          filters?.tenure?.code ||
          previousFilters?.tenure?.code ||
          getSelectedFilter("tenure")?.code,
      },
      plan_type: filters?.plantype?.code || getSelectedFilter("plantype")?.code,
    });
    localStorage.setItem("groups", JSON.stringify(groups));
  }

  function resetFilters() {
    groups = reduxGroup.map(group => {
      const reduxGroupMatch = reduxGroup?.find(reGrp => {
        return reGrp?.members?.some(mem => group?.members?.includes(mem));
      });
      if (reduxGroupMatch) {
        return {
          ...group,
          extras: {
            sum_insured: "300001-500000",
            tenure: "1",
          },
          plan_type:
            group?.members?.length === 1
              ? "I"
              : localStorage.getItem("default_filters")
              ? JSON.parse(localStorage.getItem("default_filters"))?.plan_type
              : "F",
        };
      }
    });
    updateGroup({
      groupCode,
      extras: {
        sum_insured: "300001-500000",
        tenure: "1",
      },
      plan_type: localStorage.getItem("default_filters")
        ? JSON.parse(localStorage.getItem("default_filters"))?.plan_type
        : "F",
    });
    localStorage.setItem("groups", JSON.stringify(groups));
  }

  return { updateFilters, resetFilters, query };
}

export default useUpdateFilters;
