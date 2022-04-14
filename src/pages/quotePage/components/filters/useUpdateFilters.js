import { useParams } from "react-router-dom";
import {
  useGetEnquiriesQuery,
  useUpdateGroupsMutation,
} from "../../../../api/api";

function useUpdateFilters() {
  const [updateGroup, query] = useUpdateGroupsMutation();

  const { groupCode } = useParams();

  const {
    data: {
      data: { groups: enqGroups },
    },
  } = useGetEnquiriesQuery();

  let groups = localStorage.getItem("groups")
    ? JSON.parse(localStorage.getItem("groups"))
    : enqGroups;

  const currentGroup = groups?.find(group => group.id === parseInt(groupCode));

  const previousFilters = currentGroup.extras;

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
      extras: {},
      plan_type: filters?.plantype?.code,
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
          extras: null,
          plan_type: localStorage.getItem("default_filters")
            ? JSON.parse(localStorage.getItem("default_filters"))?.plan_type
            : "F",
        };
      }
    });
    updateGroup({
      groupCode,
      extras: null,
      plan_type: localStorage.getItem("default_filters")
        ? JSON.parse(localStorage.getItem("default_filters"))?.plan_type
        : "F",
    });
    localStorage.setItem("groups", JSON.stringify(groups));
  }

  return { updateFilters, resetFilters, query };
}

export default useUpdateFilters;
