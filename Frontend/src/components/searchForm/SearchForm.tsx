import styled from "styled-components";
import {Search} from 'lucide-react';

// interface SearchFormProps {
//     setSearchQuery: (value: string) => void;
//     searchQuery: string;
// }


export const SearchForm = () => {
    // const {
    //     searchQuery,
    //     setSearchQuery
    // } = props;
    return (
        <StyledForm
            onSubmit={e => e.preventDefault()}
        >
            <SearchIconWrapper size={18} />
            <SearchInput
                placeholder="Search"
                // value={searchQuery}
                // onInput={(event) => setSearchQuery(event.currentTarget.value)}
            />
        </StyledForm>
    );
};


const StyledForm = styled.form`
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
    max-width: 400px;
    margin: 0 20px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 8px 12px 8px 35px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    color: ${props => props.theme.text};
    background: ${props => props.theme.surface};

    &::placeholder {
        color: #999;
    }
`;

const SearchIconWrapper = styled(Search)`
    position: absolute;
    left: 10px;
    color: ${props => props.theme.text};
    opacity: 0.5;
`;