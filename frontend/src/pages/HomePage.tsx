import {CardsBar} from "../components/CardsBar/CardsBar.tsx";
import {CardsList} from "../components/CardsList/CardsList.tsx";
import styled from "styled-components";
import {useLogto} from "@logto/react";
import {useUserData} from "../hooks/user-data.ts";
import {useTables} from "../hooks/useTables.ts";

export const HomePage = () => {
    const {tables, addTable} = useTables();
    const {isAuthenticated} = useLogto();
    const {userId, userScopes} = useUserData();
    console.log(isAuthenticated);
    console.log(userScopes);
    console.log(userId);

    return (
        <Wrapper>
            {isAuthenticated && <ButtonWrapper>
                <CardsBar onAddTable={addTable} />
            </ButtonWrapper>}
            <CardsList table={tables} />
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
