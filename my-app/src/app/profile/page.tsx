"use client";

import React, { useState } from 'react';
import AnimatedZonTitle from '../components/AnimatedZonTitle';
import Sidebar from '../SideMenu';
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';


const Profile: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const handleConnectionChange = (isConnected: boolean) => {
    // Update your app state here
    };

    // TODO: Calls your implemented server route
    const verifyProof = async (proof: ISuccessResult) => {
        throw new Error("TODO: verify proof server route")
    };

    // TODO: Functionality after verifying
    const onSuccess = () => {
        console.log("Success")
    };

    return (
        <div className="flex min-h-screen bg-zinc-900">
            <Sidebar 
            isExpanded={isExpanded} 
            onToggle={() => setIsExpanded(!isExpanded)} 
            />
            <main 
            className={`flex-1 p-8 transition-all duration-500 ease-in-out relative
                ${isExpanded ? 'ml-[260px]' : 'ml-[80px]'}`}
            >
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex-1">
                        <AnimatedZonTitle />
                    </div>
                    <div className="flex-shrink-0 ml-4">
                        <IDKitWidget
                            app_id="app_staging_6c7c56bcb427de01b0c79bb9229b3c6d"
                            action="verifyidentity"
                            // On-chain only accepts Orb verifications
                            verification_level={VerificationLevel.Orb}
                            handleVerify={verifyProof}
                            onSuccess={onSuccess}>
                            {({ open }) => (
                            <button onClick={open}>
                                Verify with World ID
                            </button>
                            )}
                        </IDKitWidget>
                    </div>
                </div>
            </div>
            </main>
        </div>
    );
};
  
export default Profile;  