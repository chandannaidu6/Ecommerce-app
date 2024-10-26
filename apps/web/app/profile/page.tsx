'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';

const ProfilePage: React.FC = () => {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="container mx-auto p-6">
                <p>Please sign in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-6">
                {session.user?.image && (
                    <img
                        src={session.user.image}
                        alt={session.user.name || 'Profile Image'}
                        className="w-24 h-24 rounded-full"
                    />
                )}
                <div>
                    <p className="text-lg font-semibold">{session.user?.name}</p>
                    <p className="text-gray-600">{session.user?.email}</p>
                </div>
            </div>
            <button
                className="bg-red-500 text-white px-6 py-2 rounded mt-6 hover:bg-red-600"
                onClick={() => signOut()}
            >
                Sign Out
            </button>
        </div>
    );
};

export default ProfilePage;
