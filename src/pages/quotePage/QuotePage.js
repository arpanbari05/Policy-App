import React from 'react'
import { MenuWrapper } from './Quote.style';
import UpperModifier from "./components/UpperModifier";
import LowerModifier from "./components/LowerModifier"

function QuotePage() {
    return (
        <div>
            <UpperModifier/>
            <LowerModifier />
        </div>
    )
}

export default QuotePage
