import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentXP: number;
    xpToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProvidaerProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProvidaerProps) {
    const [level, setLevel] = useState(1);
    const [currentXP, setCurrentXP] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const xpToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) return;

        const { amount } = activeChallenge;

        let finalXP = currentXP + amount;

        if (finalXP >= xpToNextLevel) {
            finalXP = finalXP - xpToNextLevel;
            levelUp();
        }

        setCurrentXP(finalXP);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                levelUp,
                currentXP,
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                xpToNextLevel,
                completeChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}
