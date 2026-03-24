import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLogto } from '@logto/react';
import api from '../api/axios';

export const SalesforceModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { isAuthenticated, fetchUserInfo, getAccessToken } = useLogto();

    useEffect(() => {
        if (isAuthenticated && isOpen) {
            fetchUserInfo().then(userInfo => {
                setFormData(prev => ({
                    ...prev,
                    firstName: userInfo?.name?.split(' ')[0] || '',
                    lastName: userInfo?.name?.split(' ').slice(1).join(' ') || '',
                    email: userInfo?.email || '',
                }));
            });
        }
    }, [isAuthenticated, fetchUserInfo, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCES);
            
            await api.post('/api/salesforce/sync', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Successfully synced to Salesforce CRM!');
            setIsOpen(false);
            setFormData({ firstName: '', lastName: '', email: '', company: '', phone: '' });
        } catch (error: any) {
            console.error('Failed to sync', error);
            const msg = error.response?.data?.error || 'Failed to sync with Salesforce.';
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <>
            <SyncButton onClick={() => setIsOpen(true)}>
                Sync CRM
            </SyncButton>

            {isOpen && (
                <Overlay>
                    <Modal>
                        <Header>
                            <h3>Salesforce Sync</h3>
                            <CloseButton onClick={() => setIsOpen(false)}>&times;</CloseButton>
                        </Header>
                        <Form onSubmit={handleSubmit}>
                            <p style={{fontSize: '14px', color: '#666', margin: 0}}>
                                Create an Account and Contact in our Salesforce CRM.
                            </p>
                            
                            <Row>
                                <Label>
                                    First Name
                                    <Input 
                                        name="firstName" 
                                        value={formData.firstName} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Label>
                                <Label>
                                    Last Name
                                    <Input 
                                        name="lastName" 
                                        value={formData.lastName} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Label>
                            </Row>

                            <Label>
                                Email
                                <Input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </Label>

                            <Label>
                                Company
                                <Input 
                                    name="company" 
                                    value={formData.company} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Your Organization Name"
                                />
                            </Label>

                            <Label>
                                Phone
                                <Input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    placeholder="+1 234 567 890"
                                />
                            </Label>

                            <Footer>
                                <Button type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                                <PrimaryButton type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Syncing...' : 'Sync Data'}
                                </PrimaryButton>
                            </Footer>
                        </Form>
                    </Modal>
                </Overlay>
            )}
        </>
    );
};

const SyncButton = styled.button`
    position: fixed;
    bottom: 90px;
    right: 30px;
    background-color: ${props => props.theme.secondary || '#28a745'};
    color: white;
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    z-index: 10000;
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
    z-index: 10001;
`;

const Modal = styled.div`
    background: ${props => props.theme.surface || 'white'};
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 450px;
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

const Row = styled.div`
    display: flex;
    gap: 10px;
    > * { flex: 1; }
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
    background-color: ${props => props.theme.secondary || '#28a745'};
    color: white;
    border: none;

    &:hover {
        opacity: 0.9;
        background: ${props => props.theme.secondary || '#218838'};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
