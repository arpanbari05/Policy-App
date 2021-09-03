import HttpClient from "../../api/httpClient";
const getQutoes = (
    {
        alias,
        sum_insured,
        tenure,
        member,
        plan_type,
        base_plan_type = "base_health",
    },
    headers,
) => {
    return HttpClient(
        `companies/${alias}/quotes?sum_insured_range=${sum_insured}&tenure=${tenure}&plan_type=${plan_type}&group=${member}&base_plan_type=${base_plan_type}`,
        {
            method: "GET",
            ...headers,
        },
    );
};
export { getQutoes }