import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './MemberInfoCard.module.scss';
import Card from 'react-bootstrap/Card';
import { contactIcons } from '@icons';
import { Link, FilledImage, Body1, Body2, Caption } from '@basics';
import cn from 'classnames';

export interface MemberInfoCardProps {
  name: string;
  imgSrc: string;
  title: string;
  quote: string | { number: number; length: string };
  website?: string;
  email?: string;
  linkedIn?: string;
}

const MemberInfoCard: FunctionComponent<MemberInfoCardProps> = ({
  name,
  imgSrc,
  title,
  quote,
  website,
  email,
  linkedIn,
}) => {
  const firstName: string = name.split(' ')[0];
  let team: string = title.toLowerCase();
  if (team === 'designer') team = 'design';

  const infoCol = (
    <div className={styles.firstCol}>
      <div className={styles.information}>
        <Row>
          <FilledImage src={imgSrc} alt="Image" className={styles.picture} />

          <Col className={styles.nameInfo}>
            <div className={styles.name}>
              <Body1>{name}</Body1>
            </div>

            <div className={styles.title}>
              <Caption>{title}</Caption>
            </div>
          </Col>
        </Row>
        <div className={styles.caption}>
          {typeof quote === 'string' ? (
            <Body2>"{quote}"</Body2>
          ) : (
            <Body2>
              {firstName} has been on the {team} team for {quote.number}{' '}
              {quote.length} long
            </Body2>
          )}
        </div>
      </div>
    </div>
  );

  const teamColor = cn({
    [styles.design]: team === 'design',
    [styles.engineer]: team === 'engineer' || team === 'developer',
    [styles.business]: team === 'business',
  });

  const contactCol = (
    <div className={teamColor}>
      <div className={styles.secondCol}>
        {website && (
          <Link href={website}>
            <contactIcons.internetGlobeWhite />
          </Link>
        )}
        {email && (
          <Link href={email}>
            <contactIcons.emailWhite />
          </Link>
        )}
        {linkedIn && (
          <Link href={linkedIn}>
            <contactIcons.linkedInLogo />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <Card className={styles.card}>
      <Card.Body className="p-0 d-flex">
        {infoCol}
        {contactCol}
      </Card.Body>
    </Card>
  );
};

export default MemberInfoCard;
