import { GetServerSideProps } from 'next';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
    level: number;
    currentXP: number;
    challengesCompleted: number;
}

export default function Home(props: HomeProps) {
    return (
        
        <ChallengesProvider 
            level={props.level}
            currentXP={props.currentXP}
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                <ExperienceBar />

                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <Countdown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { level, currentXP, challengesCompleted } = ctx.req.cookies;

    return {
        props: {
            level: Number(level),
            currentXP: Number(currentXP),
            challengesCompleted: Number(challengesCompleted),
        }
    }
};