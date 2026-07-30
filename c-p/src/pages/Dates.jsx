import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Timeline from '../components/Timeline';

const Dates = () => {
  const dates = [
    { date: "Oct 15, 2025", title: "Paper Submission Opens", description: "Start submitting your research papers through the portal." },
    { date: "Jan 10, 2026", title: "Early Bird Submission", description: "Submit before Jan 10 for prioritized review." },
    { date: "Jan 30, 2026", title: "Final Submission Deadline", description: "All research papers must be submitted by midnight UTC." },
    { date: "Mar 15, 2026", title: "Acceptance Notification", description: "Authors will be notified of their paper status via email." },
    { date: "Apr 20, 2026", title: "Camera-Ready Deadline", description: "Last day to submit revised final papers." },
    { date: "May 1, 2026", title: "Early Bird Registration", description: "Special discounts for registrations before May 1." },
    { date: "July 1, 2026", title: "Registration Closes", description: "Final registration deadline for all participants." },
    { date: "July 15-17, 2026", title: "Conference Dates", description: "Main conference technical sessions and gala dinner." }
  ];

  return (
    <div className="page" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="dates-header" style={{ background: 'var(--gradient-section)', padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <SectionTitle 
            title="Important Dates" 
            subtitle="Please mark your calendar with these key deadlines" 
          />
        </div>
      </section>

      <section className="dates-content" style={{ padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <Timeline dates={dates} />
        </div>
      </section>
    </div>
  );
};

export default Dates;
