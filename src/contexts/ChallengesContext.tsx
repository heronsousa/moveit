import { createContext, ReactNode, useState } from 'react';

interface ChallengesContextData {
    level: number;
    currentXP: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
}

interface ChallengesProvidaerProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProvidaerProps) {
    const [level, setLevel] = useState(0);
    const [currentXP, setCurrentXP] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        console.log('New challenge')
    }

    return (
        <ChallengesContext.Provider
            value={{ level, levelUp, currentXP, challengesCompleted, startNewChallenge }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}
