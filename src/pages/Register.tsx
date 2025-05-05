import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const history = useHistory();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Capstone Expenses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <IonText color="primary">
            <h1 className="ion-text-center">Create Account</h1>
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
            
            <IonButton expand="block" type="submit" className="ion-margin-top">
              Register
            </IonButton>
          </form>
          
          <IonButton 
            expand="block" 
            fill="clear" 
            onClick={() => history.push('/login')}
            className="ion-margin-top"
          >
            Already have an account? Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;