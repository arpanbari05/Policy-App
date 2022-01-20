export const mobile = "@media (max-width: 768px)";
export const tablet = "@media (min-width: 768px) and (max-width: 1024px)";
export const small = "@media (max-width: 537px)";

// export const fetchQuotes =
//   (companies, { sum_insured, tenure, plan_type, member, basePlanType }) =>
//   async (dispatch, store) => {
//     try {
//       const filters = store().quotePage.filters;
//       const baseplantypes =
//         store().frontendBoot.frontendData.data.baseplantypes;
//       const selectedBasePlanType = baseplantypes.find(
//         (bpt) => bpt.display_name === filters.basePlanType
//       );
//       console.log("base", basePlanType, plan_type);

//       dispatch(setLoadingQuotes(true));
//       console.log(cancelTokens,'ags325t')
//       Object.keys(cancelTokens).forEach((cancelToken) => {
//         cancelTokens[cancelToken].cancel("Cancelled due to new request made");
//       });
//       // let count = 0;
//       const fetchQuote = async ({
//         alias,
//         sum_insured,
//         tenure,
//         member,
//         plan_type,
//         cancelToken,
//       }) => {
//         try {
//           const response = await getQutoes(
//             {
//               alias,
//               sum_insured,
//               tenure,
//               member,
//               plan_type,
//               base_plan_type:
//                 basePlanType || selectedBasePlanType
//                   ? selectedBasePlanType.code
//                   : "base_health",
//             },
//             {
//               cancelToken,
//             }
//           );
//           const cashlessHospitalsCount =
//             response.data?.cashless_hospitals_count;
//           const quoteData = response?.data?.data.map((data) => {
//             return {
//               logo: companies[data.company_alias].logo,
//               cashlessHospitalsCount,
//               ...data,
//             };
//           });
//           // count++;

//           if (quoteData) {

//             quoteData.map((item) => {
//               if (item.product.insurance_type.name === "Health Insurance") {
//                 flag = true;
//               }
//             });
//             if (flag) {
//               dispatch(saveQuotes(quoteData));
//             }
//           }
//           console.log(cancelTokens,'gsad3125')
//           delete cancelTokens[alias];
//           console.log(cancelTokens,'gsad31251325136')
//           if (Object.keys(cancelTokens).length === 0) {
//             dispatch(setLoadingQuotes(false));
//           }
//         } catch (error) {
//           alert(error);
//           console.error(error);
//         }
//       };

//       dispatch(replaceQuotes([]));

//       Object.keys(companies).forEach((alias) => {
//         const cancelTokenSource = axios.CancelToken.source();
//         cancelTokens[alias] = cancelTokenSource;
//         fetchQuote({
//           alias,
//           cancelToken: cancelTokenSource.token,
//           sum_insured,
//           tenure,
//           plan_type,
//           member,
//         });
//       });
//     } catch (error) {}
//   };
