import styled from 'styled-components';
export const CardsTable = () => {
    const cards = [
        { id: 1, title: 'Table test 1', author: 'Aliaksandr ', isPublic: true, category: 'category1', like: 15 },
        { id: 2, title: 'Private Inventory', author: 'JD', isPublic: false, category: 'category', like: 20},
    ];
    return (
        <Grid>
            {cards.map(item => (

                <Card key={item.id}>
                    <Author>
                        <AuthorAvatar></AuthorAvatar>
                        <AuthorName>{item.author}</AuthorName>
                    </Author>
                    <Title>{item.title}</Title>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "end"}}>
                        <Badge $isPublic={item.isPublic}>
                            {item.isPublic ? 'Public' : 'Private'}
                        </Badge>
                        <Category>{item.category}</Category>
                        <Like>like {item.like}</Like>
                    </div>
                </Card>
            ))}
        </Grid>
    );
};

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, max(80vw));
    justify-content: center;
    gap: 20px;
    padding: 20px 0;
`;

const Card = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    background: ${props => props.theme.surface};
    border: 1px solid ${props => props.theme.border};
    border-radius: 12px;
    padding: 25px;
    transition: transform 0.2s ease;
    cursor: pointer;

    &:hover {
        border-color: ${props => props.theme.primary};
        transform: translateY(-4px);
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