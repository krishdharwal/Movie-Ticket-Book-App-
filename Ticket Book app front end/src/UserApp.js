import React, { useState, useEffect } from 'react';

const UserApp = () => {
  const [serviceStatus, setServiceStatus] = useState('');
  const [formData, setFormData] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });
  const [loading, setLoading] = useState(false);

  // Define the base URL for your API
  const API_BASE_URL = 'http://localhost:9093';

  useEffect(() => {
    checkServiceStatus();
  }, []);

  const checkServiceStatus = async () => {
    try {
      console.log('Checking service status...');
      const response = await fetch(`${API_BASE_URL}/public/up`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Status response:', response);
      const status = await response.text();
      console.log('Status text:', status);
      
      setServiceStatus(status);
    } catch (error) {
      console.error('Error checking status:', error);
      setServiceStatus('Service unavailable');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting user data:', formData);
      
      const response = await fetch(`${API_BASE_URL}/public/user`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Submit response:', response);

      if (response.ok) {
        setSubmitStatus({
          show: true,
          success: true,
          message: 'User created successfully!'
        });
        // Reset form
        setFormData({});
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(`Failed to create user: ${errorData}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        show: true,
        success: false,
        message: `Failed to create user: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '15px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    disabledButton: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    statusText: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    alert: {
      padding: '10px',
      marginTop: '10px',
      borderRadius: '4px',
    },
    successAlert: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb',
    },
    errorAlert: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
    },
    debugInfo: {
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '4px',
    }
  };

  return (
    <div style={styles.container}>
      {/* Service Status */}
      <div style={styles.card}>
        <h2 style={styles.title}>Service Status</h2>
        <div style={styles.statusText}>
          <span style={{ 
            color: serviceStatus.includes('up') ? '#28a745' : '#dc3545',
            fontSize: '24px'
          }}>
            {serviceStatus.includes('up') ? '✓' : '⚠'}
          </span>
          <span>{serviceStatus || 'Checking status...'}</span>
        </div>
      </div>

      {/* User Creation Form */}
      <div style={styles.card}>
        <h2 style={styles.title}>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ''}
            onChange={handleInputChange}
            style={styles.input}
        
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password || ''}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(loading ? styles.disabledButton : {})
            }}
            disabled={loading}
          >
            {loading ? 'Creating User...' : 'Create User'}
          </button>
        </form>

        {submitStatus.show && (
          <div style={{
            ...styles.alert,
            ...(submitStatus.success ? styles.successAlert : styles.errorAlert)
          }}>
            {submitStatus.message}
          </div>
        )}
      </div>

      {/* Debug Information */}
      <div style={styles.debugInfo}>
        <h3>Debug Information</h3>
        <p>API Base URL: {API_BASE_URL}</p>
        <p>Service Status: {serviceStatus}</p>
        <p>Form Data: {JSON.stringify(formData, null, 2)}</p>
      </div>
    </div>
  );
};

export default UserApp;