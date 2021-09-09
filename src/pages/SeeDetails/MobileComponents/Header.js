import React from 'react'
import styled from 'styled-components'

import { Link } from "react-router-dom";
function Header() {
    return (
        <StyledHeader>
            <Link to="/quotes" className="first-container">
                <i class="flaticon-back" />
                <span> See Details</span>
            </Link>

        </StyledHeader>


    )
}

const StyledHeader = styled.div`
	display: flex;
	height: 57px;
    & a{
        margin-left: 10px;
        color: #fff;
    }
   
	background:#0d6efd;
	align-items: center;
	justify-content: space-between;`

export default Header
