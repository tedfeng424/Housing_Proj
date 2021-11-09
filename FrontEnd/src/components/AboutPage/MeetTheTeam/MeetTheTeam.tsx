import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './MeetTheTeam.module.scss';
import MemberInfoCard from './MemberInfoCard/MemberInfoCard';
import memberCards from './TeamMemberInfo';

const MeetTheTeam: FunctionComponent = () => (
  <div className={styles.cardsListContainer}>
    <div className="justify-content-center align-content-center mb-3">
      <h3 className={styles.cardsListTitle}>Meet the team!</h3>
    </div>
    <div className="d-flex justify-content-center">
      <div className={styles.cardsList}>
        {memberCards.map((oneData) => (
          <MemberInfoCard {...oneData} />
        ))}
      </div>
    </div>
  </div>
);

export default MeetTheTeam;
