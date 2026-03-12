import {CardsBar} from "../../layout/cardsBar/CardsBar.tsx";
import {CardsTable} from "../../layout/cardsTable/CardsTable.tsx";
import styled from "styled-components";
import {AdminButton} from "../../layout/adminButton/AdminButton.tsx";
import {useLogto} from "@logto/react";
import {useUserData} from "../../hooks/user-data.ts";

export const HomePage = () => {
    const {isAuthenticated} = useLogto();
    const { userId, userScopes } = useUserData();
    console.log(isAuthenticated);
    console.log(userScopes);
    console.log(userId);

    return (
        <Wrapper>
            <ButtonWrapper>
                {isAuthenticated && <AdminButton />}
                {isAuthenticated && <CardsBar />}
            </ButtonWrapper>
            <CardsTable />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 100%;
    padding: 1rem 2rem;`
