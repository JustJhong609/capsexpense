import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Add your logout logic here
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Capstone Expenses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome to Capstone Expenses</h1>
        <p>This is your expense tracking application.</p>
        <IonButton expand="block" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;