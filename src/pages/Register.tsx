import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton,
  IonText,
  IonImg
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const history = useHistory();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary mock registration - just navigate to app
    history.push('/app/dashboard');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Capstone Expenses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ 
          maxWidth: '400px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}>
          <IonImg 
            src="/assets/icon/icon.png" 
            style={{ width: '150px', margin: '0 auto 30px' }}
            alt="App Logo"
          />
          
          <IonText color="primary">
            <h1 className="ion-text-center" style={{ marginBottom: '30px' }}>Create Account</h1>
          </IonText>
          
          <form onSubmit={handleRegister}>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput type="text" required />
            </IonItem>
            
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" required />
            </IonItem>
            
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" required />
            </IonItem>
            
            <IonItem>
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput type="password" required />
            </IonItem>
            
            <IonButton 
              expand="block" 
              type="submit" 
              className="ion-margin-top"
              style={{ marginTop: '30px' }}
            >
              Register
            </IonButton>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <IonText color="medium">
              <p>Already have an account?</p>
            </IonText>
            <IonButton 
              fill="clear" 
              onClick={() => history.push('/login')}
            >
              Login
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;