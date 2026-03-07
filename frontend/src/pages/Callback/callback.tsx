import { useHandleSignInCallback } from '@logto/react';

export const Callback = () => {
    const { isLoading } = useHandleSignInCallback(() => {
        window.location.assign('/');
    });

    if (isLoading) return <div></div>;
    return null;
};