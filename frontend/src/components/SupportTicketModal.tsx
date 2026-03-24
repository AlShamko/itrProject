import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useLogto } from '@logto/react';
import api from '../api/axios';
import { useTables } from '../hooks/useTables';

const PRIORITY_OPTIONS = ['High', 'Average', 'Low'];

export const SupportTicketModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState('');
    const [priority, setPriority] = useState('Average');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userName, setUserName] = useState<string>('Anonymous');

    const location = useLocation();
    const { isAuthenticated, fetchUserInfo } = useLogto();
    const { tables } = useTables();

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserInfo().then(userInfo => {
                if (userInfo?.name) setUserName(userInfo.name);
                else if (userInfo?.email) setUserName(userInfo.email);
                else if (userInfo?.sub) setUserName(userInfo.sub);
            }).catch(() => setUserName('Anonymous'));
        } else {
            setUserName('Anonymous');
        }
    }, [isAuthenticated, fetchUserInfo]);

    const getInventoryTitle = () => {
        const path = location.pathname;
        const match = path.match(/\/table\/([^/]+)/);
        if (match && match[1]) {
            const tableId = match[1];
            const table = tables.find(t => t.id === tableId);
            if (table) return table.title;
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const inventoryTitle = getInventoryTitle();

        try {
            await api.post('/api/support', {
                summary,
                priority,
                reportedBy: userName,
                inventory: inventoryTitle,
                link: window.location.href
            });
            alert('Support ticket created successfully!');
            setIsOpen(false);
            setSummary('');
            setPriority('Average');
        } catch (error: any) {
            console.error('Failed to create ticket', error);
            const msg = error.response?.data?.error || 'Failed to create support ticket. Please try again.';
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <FloatingButton onClick={() => setIsOpen(true)}>
                Help
            </FloatingButton>

            {isOpen && (
                <Overlay>
                    <Modal>
                        <Header>
                            <h3>Create Support Ticket</h3>
                            <CloseButton onClick={() => setIsOpen(false)}>&times;</CloseButton>
                        </Header>
                        <Form onSubmit={handleSubmit}>
                            <Label>
                                Reported By:
                                <Input disabled value={userName} />
                            </Label>
                            
                            <Label>
                                Page Link:
                                <Input disabled value={window.location.href} />
                            </Label>

                            {getInventoryTitle() && (
                                <Label>
                                    Inventory:
                                    <Input disabled value={getInventoryTitle() || ''} />
                                </Label>
                            )}

                            <Label>
                                Priority:
                                <Select value={priority} onChange={e => setPriority(e.target.value)}>
                                    {PRIORITY_OPTIONS.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </Select>
                            </Label>

                            <Label>
                                Summary:
                                <TextArea 
                                    required 
                                    value={summary} 
                                    onChange={e => setSummary(e.target.value)} 
                                    placeholder="Describe your issue..."
                                />
                            </Label>

                            <Footer>
                                <Button type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                                <PrimaryButton type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Submit Ticket'}
                                </PrimaryButton>
                            </Footer>
                        </Form>
                    </Modal>
                </Overlay>
            )}
        </>
    );
};

const FloatingButton = styled.button`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: ${props => props.theme.primary || '#007bff'};
    color: white;
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    z-index: 9999;
    font-family: inherit;

    &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
`;

const Modal = styled.div`
    background: ${props => props.theme.surface || 'white'};
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    color: ${props => props.theme.text || 'black'};
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h3 { margin: 0; }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.theme.text || 'black'};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 14px;
    font-weight: 500;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid ${props => props.theme.border || '#ccc'};
    border-radius: 4px;
    background: ${props => props.theme.surface || '#f9f9f9'};
    color: ${props => props.theme.text || 'black'};
`;

const Select = styled.select`
    padding: 8px;
    border: 1px solid ${props => props.theme.border || '#ccc'};
    border-radius: 4px;
    background: ${props => props.theme.surface || 'white'};
    color: ${props => props.theme.text || 'black'};
`;

const TextArea = styled.textarea`
    padding: 8px;
    border: 1px solid ${props => props.theme.border || '#ccc'};
    border-radius: 4px;
    min-height: 100px;
    resize: vertical;
    background: ${props => props.theme.surface || 'white'};
    color: ${props => props.theme.text || 'black'};
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
`;

const Button = styled.button`
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.border || '#ccc'};
    background: transparent;
    color: ${props => props.theme.text || 'black'};
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: rgba(0,0,0,0.05);
    }
`;

const PrimaryButton = styled(Button)`
    background-color: ${props => props.theme.primary || '#007bff'};
    color: white;
    border: none;

    &:hover {
        opacity: 0.9;
        background: ${props => props.theme.primary || '#007bff'};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
