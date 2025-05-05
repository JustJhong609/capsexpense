import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonButton, IonItem, IonLabel, IonInput, IonText,
  IonGrid, IonRow, IonCol
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const history = useHistory();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
    history.push('/home');
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
              }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <IonText color="primary">
                    <h1 style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      color: 'var(--ion-color-dark)'
                    }}>
                      Create Account
                    </h1>
                  </IonText>
                  <p style={{
                    color: 'var(--ion-color-medium)',
                    fontSize: '1rem',
                    margin: '0'
                  }}>
                    Fill in the details to register
                  </p>
                </div>

                <form onSubmit={handleRegister}>
                  {/* Name Field */}
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
                    <IonInput
                      placeholder="Name"
                      type="text"
                      required
                      style={{
                        '--padding-start': '0',
                        '--background': 'transparent',
                        fontSize: '1rem',
                        border: 'none',
                      }}
                    />
                  </IonItem>

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
                    <IonInput
                      placeholder="Email Address"
                      type="email"
                      required
                      style={{
                        '--padding-start': '0',
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
                    <IonInput
                      placeholder="Password"
                      type="password"
                      required
                      style={{
                        '--padding-start': '0',
                        '--background': 'transparent',
                        fontSize: '1rem',
                        border: 'none',
                      }}
                    />
                  </IonItem>

                  {/* Confirm Password Field */}
                  <IonItem
                    lines="none"
                    style={{
                      borderRadius: '12px',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      marginBottom: '1.5rem',
                      paddingInline: '12px',
                      '--highlight-background': 'transparent',
                      '--inner-padding-end': '0px'
                    }}
                  >
                    <IonInput
                      placeholder="Confirm Password"
                      type="password"
                      required
                      style={{
                        '--padding-start': '0',
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
                      fontWeight: 600,
                      height: '50px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    REGISTER
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
                    Already have an account?
                  </p>
                  <IonButton
                    fill="clear"
                    size="small"
                    onClick={() => history.push('/login')}
                    style={{
                      '--color': 'var(--ion-color-primary)',
                      '--color-activated': 'var(--ion-color-primary-shade)',
                      fontWeight: 600,
                      marginLeft: '0.5rem'
                    }}
                  >
                    LOGIN
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

export default Register;
