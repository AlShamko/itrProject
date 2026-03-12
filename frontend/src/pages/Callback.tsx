import { useHandleSignInCallback } from '@logto/react';
import { useNavigate } from 'react-router-dom';

export const Callback = () => {
    const navigate = useNavigate();

    const { isLoading } = useHandleSignInCallback(() => {
        navigate('/');
    });

    if (isLoading) return <div>Redirecting...</div>;
    return null;
};