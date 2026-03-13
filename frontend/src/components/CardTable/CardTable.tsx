import type {Table} from "../../hooks/useTables.ts";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

interface Props {
    table: Table;
    isSelected: boolean;
    onToggle: (id: string) => void;
}

export const CardTable = ({table, isSelected, onToggle}: Props) => {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => navigate(`/table/${table.id}`)}
            $isSelected={isSelected}
        >
            <CheckboxWrapper onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(table.id)}
                />
            </CheckboxWrapper>

            <Author>
                <AuthorAvatar />
                <AuthorName>{table.author}</AuthorName>
            </Author>
            <Title>{table.title}</Title>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "end"}}>
                <Badge $isPublic={table.isPublished}>{table.isPublished ? 'Public' : 'Private'}</Badge>
                <Category>{table.category}</Category>
                <Like>like {table.like}</Like>
            </div>
        </Card>
    );
};


const Card = styled.div<{ $isSelected: boolean }>`
    display: grid;
    grid-template-columns:auto 1fr 4fr 1fr;
    align-items: center;
    background: ${props => props.theme.surface};
    border: 2px solid ${props =>
        props.$isSelected ? props.theme.primary : props.theme.border
    };
    border-radius: 12px;
    padding: 25px;
    transition: transform 0.2s ease;
    cursor: pointer;

    &:hover {
        border-color: ${props => props.theme.primary};
    }
`;

const Author = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const AuthorAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.theme.body};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.border};
    font-size: 12px;
    font-weight: bold;
`;

const AuthorName = styled.div`
    font-size: 0.9rem;
    color: ${props => props.theme.text};
    opacity: 0.7;
`

const Title = styled.h3`
    text-align: center;
    font-size: 1.2rem;
    color: ${props => props.theme.text};
    margin: 0;
`;

const Badge = styled.span<{ $isPublic: boolean }>`
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: bold;
    background: ${props => props.$isPublic ? props.theme.primary + '20' : props.theme.secondary + '20'};
    color: ${props => props.$isPublic ? props.theme.primary : props.theme.secondary};
    border: 1px solid ${props => props.$isPublic ? props.theme.primary : props.theme.secondary};
`;

const Category = styled.p`
    margin: 0;
    font-size: 0.9rem;
    color: ${props => props.theme.text};
    opacity: 0.7;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Like = styled.p`
    font-size: 0.9rem;
    color: ${props => props.theme.text};
    opacity: 0.7;
    margin: 0;
`
const CheckboxWrapper = styled.div`
    padding-right: 15px;
    display: flex;
    align-items: center;
    
    input {
        width: 20px;
        height: 20px;
        cursor: pointer;
        accent-color: ${props => props.theme.primary + '30'};
    }
`;