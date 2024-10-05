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

    const verifyProof = async (proof: ISuccessResult) => {
        console.log('proof', proof);
        const response = await fetch(
          'https://developer.worldcoin.org/api/v1/verify/app_staging_129259332fd6f93d4fabaadcc5e4ff9d',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...proof, action: "test"}),
          }
        );
        if (response.ok) {
          const { verified } = await response.json();
          return verified;
        } else {
          const { code, detail } = await response.json();
          throw new Error(`Error Code ${code}: ${detail}`);
        }
      };

    // TODO: Functionality after verifying
    const onSuccess = (result: ISuccessResult) => {
        console.log("Success")
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