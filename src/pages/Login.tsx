import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here
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
            <h1 className="ion-text-center">Welcome Back</h1>
          </IonText>
          
          <form onSubmit={handleLogin}>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" required />
            </IonItem>
            
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" required />
            </IonItem>
            
            <IonButton expand="block" type="submit" className="ion-margin-top">
              Login
            </IonButton>
          </form>
          
          <IonButton 
            expand="block" 
            fill="clear" 
            onClick={() => history.push('/register')}
            className="ion-margin-top"
          >
            Don't have an account? Register
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;