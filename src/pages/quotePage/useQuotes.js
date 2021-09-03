import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuotes, setShouldFetchQuotes } from './quote.slice';

function useQuotes() {
    const dispatch = useDispatch();
    const companies = useSelector(
        ({ frontendBoot }) => frontendBoot.frontendData.data,
    );

    const {
        quotes,
        shouldFetchQuotes,
    } = useSelector(state => state.quotePage);
    const { cover, tenure, plan_type } = useSelector(
        ({ frontendBoot }) => frontendBoot.frontendData.data.defaultfilters,
    );

    const { data } = useSelector(({ frontendBoot }) => frontendBoot.frontendData);
    const { memberGroups, proposerDetails } = useSelector(
        ({ greetingPage }) => greetingPage,
    );
    const { selectedGroup, filters } = useSelector(({ quotePage }) => quotePage);
    console.log("company", companies, "cover", cover, "tenure", tenure, "members", memberGroups, "proposerDetails", proposerDetails);
    //   const findCode = (fitlerName, fitlerValue) => {
    //     let code;
    //     data[fitlerName].forEach(data => {
    //       if (data.display_name === fitlerValue) {
    //         code = data.code;
    //       }
    //     });
    //     return code;
    //   };
    useEffect(() => {
        if (shouldFetchQuotes) {



            dispatch(
                fetchQuotes(companies?.companies, {
                    sum_insured: cover,
                    tenure,
                    member: selectedGroup,
                    plan_type:
                        memberGroups[selectedGroup].length === 1
                            ? "I"
                            : proposerDetails.plan_type
                                ? proposerDetails.plan_type === "M"
                                    ? "M"
                                    : "F"
                                : "F",
                }),
            );
        }

        dispatch(setShouldFetchQuotes(false));
    }, []);
    return {
        quotes,
    }
}

export default useQuotes
