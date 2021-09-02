import React from 'react'
import QuoteCard from './components/QuoteCard'
import { MenuWrapper, SortByButton, TextLabel } from './Quote.style'

function QuotePage() {
    return (
        <div>

            <div className="container">
                <div className="col-md-12 d-flex">
                    <div className="col-md-8" style={{ padding: "0px 5px" }}>

                        <div className=" d-flex justify-content-between align-items-center">
                            <TextLabel> Showing Family Floater Plan</TextLabel>
                            <SortByButton>
                                Sort By: relevance
                            </SortByButton>
                        </div>
                        <QuoteCard />
                    </div>
                    <div className="col-md-4" style={{ padding: "0px 5px" }}>
                        <div className="d-flex justify-content-between align-items-center ">
                            <TextLabel>All Premium Plans are GST Inclusive</TextLabel>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default QuotePage
