import styled from "styled-components";
import LogoImg from "../../assets/img/logo.webp"

export const Logo = () => {
    return (
        <StyledLogo src={LogoImg} alt="logo"/>
    );
};

const StyledLogo = styled.img`
    height: 40px;
    width: auto;
    display: block;
`