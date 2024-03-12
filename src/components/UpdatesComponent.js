import React from 'react';
import { updates } from '../../docs/01-Get Started/_updates';
import styles from './UpdatesComponent.module.css';

export default function UpdatesComponent() {
  return (
    <div>
      {updates.map((update, index) => (
        <div key={index} className={styles.versions}>
          <h2>Version: {update.version} { index === 0 ? "(latest)" :  ""}</h2>
          <p>Release date: {update.releaseDate}</p>
          <blockquote>{update.description}</blockquote>
          <details className={styles.details}>
            <summary className={styles.summary}>See full changelog of v{update.version}</summary>
            <div className={styles.detailsOpen}>
              <details>
                <summary className={styles.detailsOpenSummary}>Features</summary>
                <ul>
                  {update.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </details>
              <details>
                <summary className={styles.detailsOpenSummary}>Fixes</summary>
                <ul>
                  {update.fixes.map((fix, fixIndex) => (
                    <li key={fixIndex}>{fix}</li>
                  ))}
                </ul>
              </details>
              <details>
                <summary className={styles.detailsOpenSummary}>Integrations</summary>
                <ul>
                  {update.integrations.map((integration, integrationIndex) => (
                    <li key={integrationIndex}>{integration}</li>
                  ))}
                </ul>
              </details>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
