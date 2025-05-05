import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonButtons,
} from '@ionic/react';
import { useHistory, } from 'react-router-dom';
import { menuController } from '@ionic/core';


const Home: React.FC = () => {
  const history = useHistory();

  const handleLogout = async () => {
    await menuController.close(); // Close the side menu
    // Optionally clear any auth state here
    history.push('/login');
  };
  

  return (
    <>
      {/* Side Menu */}
      <IonMenu side="start" menuId="mainMenu" contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button onClick={handleLogout}>
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Main Page */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton menu="mainMenu" />
            </IonButtons>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2 className="ion-text-primary">Welcome to Capstone Expenses</h2>
          <p>Here's a quick overview of your finances.</p>
          <ul>
            <li>Total Expenses This Month: ₱0.00</li>
            <li>Remaining Budget: ₱0.00</li>
            <li>Top Categories: N/A</li>
          </ul>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
