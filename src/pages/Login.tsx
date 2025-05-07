import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonButton, IonItem, IonLabel, IonInput, IonText,
  IonGrid, IonRow, IonCol, IonIcon
} from '@ionic/react';
import { mailOutline, lockClosedOutline, logInOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import supabase from '../utils/supabaseClient';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        alert(error.message);
        return;
      }

      history.push('/home');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <IonPage style={{ background: 'linear-gradient(135deg, #f6f9ff 0%, #eef2ff 100%)' }}>
      <IonHeader collapse="fade" className="ion-no-border">
        <IonToolbar style={{ '--background': 'transparent' }}>
          <IonTitle
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--ion-color-primary)',
              textAlign: 'center',
              padding: '1rem 0'
            }}>
            Capstone Expenses
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        scrollY={false}
        style={{
          display: 'flex',
          alignItems: 'center',
          '--background': 'transparent'
        }}
      >
        <IonGrid fixed style={{ padding: '16px' }}>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 128, 0.08)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <IonText color="primary">
                    <h1 style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      color: 'var(--ion-color-dark)'
                    }}>
                      Welcome Back
                    </h1>
                  </IonText>
                  <p style={{
                    color: 'var(--ion-color-medium)',
                    fontSize: '1rem',
                    margin: '0'
                  }}>
                    Sign in to manage your expenses
                  </p>
                </div>

                <form onSubmit={handleLogin} style={{ marginTop: '1.5rem' }}>
                  {/* Email Field */}
                  <IonItem
                    lines="none"
                    style={{
                      borderRadius: '12px',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      marginBottom: '1rem',
                      paddingInline: '12px',
                      '--highlight-background': 'transparent',
                      '--inner-padding-end': '0px'
                    }}
                  >
                    <IonIcon
                      icon={mailOutline}
                      slot="start"
                      style={{
                        color: '#64748b',
                        fontSize: '1.2rem'
                      }}
                    />
                    <IonInput
                      placeholder="Email Address"
                      type="email"
                      required
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                      style={{
                        '--padding-start': '12px',
                        '--background': 'transparent',
                        fontSize: '1rem',
                        border: 'none',
                      }}
                    />
                  </IonItem>

                  {/* Password Field */}
                  <IonItem
                    lines="none"
                    style={{
                      borderRadius: '12px',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      marginBottom: '1rem',
                      paddingInline: '12px',
                      '--highlight-background': 'transparent',
                      '--inner-padding-end': '0px'
                    }}
                  >
                    <IonIcon
                      icon={lockClosedOutline}
                      slot="start"
                      style={{
                        color: '#64748b',
                        fontSize: '1.2rem'
                      }}
                    />
                    <IonInput
                      placeholder="Password"
                      type="password"
                      required
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                      style={{
                        '--padding-start': '12px',
                        '--background': 'transparent',
                        fontSize: '1rem',
                        border: 'none',
                      }}
                    />
                  </IonItem>

                  <IonButton
                    type="submit"
                    expand="block"
                    shape="round"
                    style={{
                      '--border-radius': '12px',
                      '--box-shadow': 'none',
                      '--padding-top': '1.25rem',
                      '--padding-bottom': '1.25rem',
                      marginTop: '1.5rem',
                      fontWeight: 600,
                      height: '50px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <IonIcon icon={logInOutline} slot="start" />
                    LOGIN
                  </IonButton>
                </form>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2rem'
                }}>
                  <p style={{
                    color: 'var(--ion-color-medium)',
                    margin: '0',
                    fontSize: '0.95rem'
                  }}>
                    Don't have an account?
                  </p>
                  <IonButton
                    fill="clear"
                    size="small"
                    onClick={() => history.push('/register')}
                    style={{
                      '--color': 'var(--ion-color-primary)',
                      '--color-activated': 'var(--ion-color-primary-shade)',
                      fontWeight: 600,
                      marginLeft: '0.5rem'
                    }}
                  >
                    CREATE ACCOUNT
                  </IonButton>
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;