import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/heronsousa.png" alt="Heron Rodrigues" />

            <div>
                <strong>Heron Rodrigues</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level 1
                </p>
            </div>
        </div>
    );
}