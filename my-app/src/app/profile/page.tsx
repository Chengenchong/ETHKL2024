"use client";

import React, { useState } from 'react';
import AnimatedZonTitle from '../components/AnimatedZonTitle';
import Sidebar from '../SideMenu';
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';


const Profile: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    //const [verificationResult, setVerificationResult] = useState<string | null>(null);

    const verifyProof = async (proof: ISuccessResult) => {
        try {
            const response = await fetch(
                '/api/verify',
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(proof),
            });

            if (response.ok) {
                const result = await response.json();
                return result.success;
            } else {
                const errorData = await response.json();
                throw new Error(`Error Code ${errorData.detail}`);
            }
        } catch (error) {
            console.error('Verification error:', error);
            return false;
        }
      };

    // TODO: Functionality after verifying
    const onSuccess = (result: ISuccessResult) => {
        // This is where you should perform frontend actions once a user has been verified
        window.alert(
            `Successfully verified with World ID!
        Your nullifier hash is: ` + result.nullifier_hash
        )
    };

    return (
        <div className="min-h-screen flex text-white"
            style={{
            background: 'linear-gradient(to bottom, #2c007d 0%, #000000 20%, #000000 70%)'
        }}>
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
                            app_id="app_staging_9e80fad4da09d777c63031d1ff8c6e30"
                            action="verifyidentity"
                            verification_level={VerificationLevel.Device}
                            handleVerify={verifyProof}
                            onSuccess={onSuccess}>
                            {({ open }) => (
                            <button
                                onClick={open}
                            >
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