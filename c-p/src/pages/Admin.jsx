import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';

const Admin = () => {
  const [submissions, setSubmissions] = useState([
    { id: 1, name: "Alice Smith", email: "alice@univ.edu", title: "Quantum Computing Optimization", status: "Submitted", track: "Advanced Computing" },
    { id: 2, name: "Bob Johnson", email: "bob@tech.com", title: "Blockchain Security in IoT", status: "Reviewed", track: "Networking & Security" },
    { id: 3, name: "Carol White", email: "carol@research.org", title: "NLP for Low Resource Languages", status: "Accepted", track: "AI & Data Science" },
    { id: 4, name: "David Brown", email: "david@corp.edu", title: "5G Spectrum Management", status: "Submitted", track: "Communication Tech" },
    { id: 5, name: "Eva Green", email: "eva@inst.net", title: "Deep Learning for Medical Imaging", status: "Accepted", track: "AI & Data Science" }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return '#3b82f6';
      case 'Reviewed': return '#f59e0b';
      case 'Accepted': return '#10b981';
      default: return '#64748b';
    }
  };

  return (
    <div className="page" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="admin-header" style={{ background: 'var(--gradient-section)', padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <SectionTitle 
            title="Admin Dashboard" 
            subtitle="View and manage all conference paper submissions" 
          />
        </div>
      </section>

      <section className="admin-content" style={{ padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <div className="submissions-table-container" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--gray-900)', color: 'white' }}>
                  <th style={{ padding: '1rem' }}>ID</th>
                  <th style={{ padding: '1rem' }}>Author</th>
                  <th style={{ padding: '1rem' }}>Paper Title</th>
                  <th style={{ padding: '1rem' }}>Track</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                    <td style={{ padding: '1rem' }}>{sub.id}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600' }}>{sub.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{sub.email}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>{sub.title}</td>
                    <td style={{ padding: '1rem' }}>{sub.track}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        backgroundColor: getStatusColor(sub.status), 
                        color: 'white', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '0.75rem',
                        fontWeight: '700'
                      }}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
