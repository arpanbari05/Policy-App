import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useQuoteCard({ item }) {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const quotesForCompare = useSelector(
        ({ quotePage }) => quotePage.quotesForCompare,
    );


    const companies = useSelector(
        ({ frontendBoot }) => frontendBoot.frontendData.data,
    );

    const [activeCover, setActiveCover] = useState(0);
    const [mergedQuotes, setMergedQuotes] = useState([]);

    const [checked, setChecked] = useState(
        quotesForCompare.includes(
            `${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`,
        )
            ? true
            : false,
    );

    useEffect(() => {
        // code to merge plans with same id but different covers.
        if (item) {
            let newQuote = [];
            for (var i = 0; i < item.length; i++) {
                let exist = false;
                for (var k = 0; k < item.length; k++) {
                    if (item[i]?.product.name == newQuote[k]?.product.name) {
                        exist = true;
                    }
                }

                if (!exist) {
                    const tempQuote = {
                        product: { id: item[i].product.id, name: item[i].product.name },
                        sum_insured: [],
                        premium: [],
                        total_premium: [],
                        mandatory_riders: [],
                        tenure: [],
                        tax_amount: [],
                        company_alias: item[i].company_alias,
                        logo: item[i].logo,
                        cashlessHospitalsCount: [],
                        features: [],
                    };
                    for (var j = 0; j < item.length; j++) {

                        if (item[i].product.id === item[j].product.id) {
                            tempQuote.sum_insured.push(item[j].sum_insured);
                            tempQuote.total_premium.push(item[j].total_premium);
                            tempQuote.premium.push(item[j].premium);
                            tempQuote.mandatory_riders.push(item[j].mandatory_riders);
                            tempQuote.tenure.push(item[j].tenure);
                            tempQuote.tax_amount.push(item[j].tax_amount);
                            tempQuote.cashlessHospitalsCount.push(
                                item[j].cashlessHospitalsCount,
                            );
                            tempQuote.features.push(item[j].features);
                        }
                    }
                    newQuote.push(tempQuote);
                }
            }

            setMergedQuotes([...newQuote]);
        }
    }, [item]);

    useEffect(() => {
        if (
            quotesForCompare.includes(
                `${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`,
            )
        ) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [quotesForCompare, checked, activeCover]);

    useEffect(() => {
        setActiveCover(0);
    }, [mergedQuotes]);

    return {
        dispatch,
        show,
        setShow,
        mergedQuotes,
        checked,
        setChecked,

        activeCover,
        setActiveCover,
        quotesForCompare,
    };
}

export default useQuoteCard;
